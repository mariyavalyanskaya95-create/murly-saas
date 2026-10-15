// Перенесення анімацій Universal Animation Library (Quaternius, CC0) на скелет героїв KayKit.
// Скелети різні, тому кожен кадр рахуємо у світових координатах:
// поворот кістки героя = (поворот кістки джерела зараз) * (поворот у спокої)^-1 * (поворот кістки героя у спокої).
import * as THREE from 'three';

// three.js прибирає крапки з назв кісток при завантаженні (upperarm.l -> upperarml)
const keyOf = (n: string) => n.replace(/[.:/\[\]\s]/g, '');
// кістка героя KayKit -> кістка UAL
const MAP0: Record<string, string> = {
  hips: 'pelvis', spine: 'spine_01', chest: 'spine_03', head: 'Head',
  'upperarm.l': 'upperarm_l', 'lowerarm.l': 'lowerarm_l', 'wrist.l': 'hand_l',
  'upperarm.r': 'upperarm_r', 'lowerarm.r': 'lowerarm_r', 'wrist.r': 'hand_r',
  'upperleg.l': 'thigh_l', 'lowerleg.l': 'calf_l', 'foot.l': 'foot_l', 'toes.l': 'ball_l',
  'upperleg.r': 'thigh_r', 'lowerleg.r': 'calf_r', 'foot.r': 'foot_r', 'toes.r': 'ball_r',
};
const MAP: Record<string, string> = Object.fromEntries(Object.entries(MAP0).map(([k, v]) => [keyOf(k), v]));

type Rest = { q: THREE.Quaternion; p: THREE.Vector3 };
const worldRest = (root: THREE.Object3D) => {
  root.updateMatrixWorld(true);
  const inv = root.matrixWorld.clone().invert();
  const out = new Map<string, Rest>();
  root.traverse((o) => {
    const m = inv.clone().multiply(o.matrixWorld);
    const p = new THREE.Vector3(), q = new THREE.Quaternion(), s = new THREE.Vector3();
    m.decompose(p, q, s);
    out.set(o.name, { q, p });
  });
  return out;
};

// напрямок «вперед» персонажа: від середини стегон до носків
const facing = (rest: Map<string, Rest>, foot: [string, string], toe: [string, string]) => {
  const f = rest.get(foot[0])!.p.clone().add(rest.get(foot[1])!.p).multiplyScalar(0.5);
  const t = rest.get(toe[0])!.p.clone().add(rest.get(toe[1])!.p).multiplyScalar(0.5);
  const d = t.sub(f); d.y = 0; return Math.atan2(d.x, d.z);
};


/**
 * src: сцена з UAL (скелет у позі спокою), clips: її анімації.
 * hero: свіжа (не масштабована) сцена героя KayKit.
 * Повертає кліпи з треками для кісток героя.
 */
export function retargetClips(src: THREE.Object3D, clips: THREE.AnimationClip[], hero: THREE.Object3D, fps = 30): THREE.AnimationClip[] {
  const srcRest = worldRest(src);
  const heroRest = worldRest(hero);
  // обидва персонажі мають дивитися в один бік
  const yaw = facing(heroRest, ['footl', 'footr'], ['toesl', 'toesr']) - facing(srcRest, ['foot_l', 'foot_r'], ['ball_l', 'ball_r']);
  const F = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw), Fi = F.clone().invert();
  // масштаб руху стегон: висота стегон героя / висота стегон джерела
  const ratio = heroRest.get('hips')!.p.y / Math.max(0.01, srcRest.get('pelvis')!.p.y);

  const bones: THREE.Object3D[] = [];
  hero.traverse((o) => { if ((o as THREE.Bone).isBone) bones.push(o); });
  const byName = new Map<string, THREE.Object3D>(); src.traverse((o) => byName.set(o.name, o));
  const heroInv = new THREE.Matrix4();

  const out: THREE.AnimationClip[] = [];
  for (const clip of clips) {
    const mixer = new THREE.AnimationMixer(src);
    const act = mixer.clipAction(clip); act.play();
    const n = Math.max(2, Math.round(clip.duration * fps) + 1);
    const times: number[] = [];
    const rot = new Map<string, number[]>(); const pos: number[] = [];
    for (let i = 0; i < n; i++) {
      const t = (i / (n - 1)) * clip.duration;
      mixer.setTime(t); src.updateMatrixWorld(true);
      const srcInv = src.matrixWorld.clone().invert();
      times.push(t);
      // світові повороти героя в цьому кадрі, зверху вниз по ієрархії
      const world = new Map<THREE.Object3D, THREE.Quaternion>();
      heroInv.copy(hero.matrixWorld).invert();
      for (const b of bones) {
        const parent = b.parent!;
        const pw = world.get(parent) ?? (() => { const q = new THREE.Quaternion(); new THREE.Matrix4().copy(heroInv).multiply(parent.matrixWorld).decompose(new THREE.Vector3(), q, new THREE.Vector3()); return q; })();
        const srcName = MAP[keyOf(b.name)];
        let wq: THREE.Quaternion;
        if (srcName && byName.has(srcName)) {
          const so = byName.get(srcName)!;
          const sq = new THREE.Quaternion(); new THREE.Matrix4().copy(srcInv).multiply(so.matrixWorld).decompose(new THREE.Vector3(), sq, new THREE.Vector3());
          const delta = sq.multiply(srcRest.get(srcName)!.q.clone().invert());
          wq = F.clone().multiply(delta).multiply(Fi).multiply(heroRest.get(b.name)!.q);
        } else {
          wq = pw.clone().multiply(b.quaternion); // кістка без пари: як у спокої відносно батька
        }
        world.set(b, wq);
        const local = pw.clone().invert().multiply(wq);
        const arr = rot.get(b.name) ?? []; arr.push(local.x, local.y, local.z, local.w); rot.set(b.name, arr);
        if (keyOf(b.name) === 'hips') {
          const sp = new THREE.Vector3(); new THREE.Matrix4().copy(srcInv).multiply(byName.get('pelvis')!.matrixWorld).decompose(sp, new THREE.Quaternion(), new THREE.Vector3());
          const d = sp.sub(srcRest.get('pelvis')!.p).multiplyScalar(ratio).applyQuaternion(F);
          d.x = 0; d.z = 0; // по підлозі героя рухає гра, а не анімація
          const restLocal = b.position.clone();
          const parentQ = pw.clone().invert();
          const ld = d.applyQuaternion(parentQ);
          pos.push(restLocal.x + ld.x, restLocal.y + ld.y, restLocal.z + ld.z);
        }
      }
    }
    mixer.stopAllAction(); mixer.uncacheRoot(src);
    const tracks: THREE.KeyframeTrack[] = [];
    rot.forEach((v, name) => { if (MAP[keyOf(name)]) tracks.push(new THREE.QuaternionKeyframeTrack(`${name}.quaternion`, times, v)); });
    if (pos.length) tracks.push(new THREE.VectorKeyframeTrack(`${bones.find((b) => keyOf(b.name) === 'hips')!.name}.position`, times, pos));
    out.push(new THREE.AnimationClip(clip.name, clip.duration, tracks));
  }
  return out;
}
