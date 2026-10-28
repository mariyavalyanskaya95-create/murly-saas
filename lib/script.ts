// Сценарій аудіювання: «Anna: Hi!» → репліка зі спікером; рядок без двокрапки читає диктор
type Line = { who: string; text: string };

// «Anna: Hi!» → репліка зі спікером; рядок без двокрапки читає диктор
export function parseScript(script: string): Line[] {
  return script.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => {
    const m = l.match(/^([A-Z][\w .'()-]{0,24}):\s*(.+)$/);
    return m ? { who: m[1].trim(), text: m[2].trim() } : { who: '', text: l };
  });
}

