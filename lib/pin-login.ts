// Вхід учня за номером телефону і простим PIN (без пошти і SMS, безкоштовно).
// PIN навмисно видно вчителю й учню, щоб можна було підказати, якщо дитина забула.
export const normPhone = (raw: string) => {
  let d = String(raw || '').replace(/\D/g, '');
  if (d.length === 10 && d.startsWith('0')) d = `38${d}`; // 0XX XXX XX XX → 380...
  if (d.length === 9) d = `380${d}`;
  return d;
};
export const validPhone = (d: string) => d.length >= 10 && d.length <= 15;
export const validPin = (p: string) => /^[a-z0-9]{4,8}$/i.test(p);
export const randomPin = () => String(1000 + Math.floor(Math.random() * 9000));
export const fmtPhone = (d: string) => (d.startsWith('380') && d.length === 12 ? `+380 ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}` : `+${d}`);
