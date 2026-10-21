// Аватар користувача: котик зі спрайту (avatar = "st-cat-cool|#B9DBE9"), фото з Clerk або перша літера.
import Kit from './Kit';

export const AVATAR_KITS = ['st-cat-cool', 'st-cat-blep', 'st-cat-heart', 'st-cat-coffee', 'st-cat-box', 'st-cat-loaf', 'st-cat-please', 'st-cat-shock', 'st-cat-nightcap', 'st-girl-bow', 'st-boy-cap', 'st-boy-backpack'];
export const AVATAR_BG = ['#D0F834', '#B9DBE9', '#F2B544', '#F6B5A3', '#FFFFFF', '#C9B8F2'];

export default function Avatar({ avatar, image, name, className = '' }: { avatar?: string | null; image?: string | null; name?: string; className?: string }) {
  const [kit, bg] = (avatar || '').split('|');
  if (kit && /^st-[a-z-]+$/.test(kit)) {
    return <span className={`t-avatar u-ava ${className}`} style={{ background: bg || '#D0F834' }}><Kit id={kit} className="u-ava__kit" /></span>;
  }
  if (image) return <span className={`t-avatar u-ava ${className}`}><img src={image} alt="" className="u-ava__img" /></span>;
  return <span className={`t-avatar ${className}`}>{(name || '?').slice(0, 1).toUpperCase()}</span>;
}
