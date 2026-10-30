// Фото-фони активностей з Unsplash (ліцензія Unsplash: безкоштовно, комерційно, без обов'язкового підпису).
// Для кожної активності: [обкладинка, слайди з питаннями й фразами, слайди із завданнями]. page: сторінка фото на unsplash.com для кредиту.
export type Photo = { id: string; page: string };
export const PHOTOS: Record<string, [Photo, Photo, Photo]> = {
  'murly-magic-pet-school': [{ id: 'photo-1638255402906-e838358069ab', page: 'pxu2yxCTbTU' }, { id: 'photo-1516750105099-4b8a83e217ee', page: 'fEK4jvgnApg' }, { id: 'photo-1733451660286-f30ae3a8d765', page: 'CFGhfvULLME' }],
  'freeze-whats-happening': [{ id: 'photo-1545558014-8692077e9b5c', page: 'gDiRwIYAMA8' }, { id: 'photo-1631510390389-c1e4fb20ff31', page: 'Kh4tedFdHz4' }, { id: 'photo-1575783970733-1aaedde1db74', page: 'E0BmfKjeQrw' }],
  'secret-sticker-guess': [{ id: 'photo-1759990639053-80b6c7acb10b', page: 'CD6Cfi_AHyk' }, { id: 'photo-1535227798054-e4373ef3795a', page: 'oWN1tKuUpJI' }, { id: 'photo-1655087751207-1020c89f7eee', page: 'u5ynCIRu8wE' }],
  'my-tiny-planet': [{ id: 'photo-1701014159143-09482059f571', page: '_75VdeLT3BI' }, { id: 'photo-1444080748397-f442aa95c3e5', page: 'Jztmx9yqjBw' }, { id: 'photo-1710270578658-847a60efb10c', page: 'YvNVxz5oLDg' }],
  'the-great-school-ranking': [{ id: 'photo-1580582932707-520aed937b7b', page: 'PDRFeeDniCk' }, { id: 'photo-1504275107627-0c2ba7a43dba', page: 'VLaKsTkmVhk' }, { id: 'photo-1718306155883-3f0bc8fbf881', page: 'b28quyxFrI0' }],
  'canteen-makeover': [{ id: 'photo-1552058461-dc1828d58bf6', page: 'bzbWIxsN3iQ' }, { id: 'photo-1656414270935-1dbf52b3bbca', page: 's4dOKRp86Ko' }, { id: 'photo-1571757392712-7c1052de7ce5', page: '5djt8Pkqdc4' }],
  'plans-and-crystal-balls': [{ id: 'photo-1621508654686-809f23efdabc', page: 'TeLjs2pL5fA' }, { id: 'photo-1613419380964-ad761bb26611', page: 'HIKcSp6F3gg' }, { id: 'photo-1565006109626-caf5649510cb', page: 'TmD3rqOlOAY' }],
  'fridge-detective': [{ id: 'photo-1737363625082-8bbbb821286e', page: 'XIMl4Crm1GQ' }, { id: 'photo-1725905507743-30f903ebbf2c', page: 'haJdK-oucKg' }, { id: 'photo-1737363625921-dd9e02b4c067', page: 'vFV1w9FDZtw' }],
  'small-firsts-passport': [{ id: 'photo-1581553672347-95d9444c0d2c', page: 'QMU1z6ReS5A' }, { id: 'photo-1549897411-b06572cdf806', page: 'jVvtCCycgcQ' }, { id: 'photo-1524661135-423995f22d0b', page: 'l68Z6eF2peA' }],
  'group-chat-court': [{ id: 'photo-1526038335545-4b96864eaee7', page: 'Q0ksjWR55Jc' }, { id: 'photo-1662974770404-468fd9660389', page: 'pnK6Q-QTHM4' }, { id: 'photo-1593115057322-e94b77572f20', page: 'veNb0DDegzE' }],
  'tiny-fixes-happy-street': [{ id: 'photo-1764827681013-3458b093edd5', page: 'zo0a9Xbhwks' }, { id: 'photo-1785293130705-1c8cff002821', page: 'JpjVVNtfXl4' }, { id: 'photo-1573493380834-bcfa84766e2e', page: 'V4Q9cqeashY' }],
  'strangest-job-offer': [{ id: 'photo-1765371512336-99c2b1c6975f', page: 'j32x9RlFUkg' }, { id: 'photo-1512649408904-c0a00fb810da', page: 'l5b_Jd8Ttfg' }, { id: 'photo-1484788984921-03950022c9ef', page: 'j4uuKnN43_M' }],
  'the-annoyance-lab': [{ id: 'photo-1723074832961-397744da2380', page: 'rI_PQgrh9f8' }, { id: 'photo-1671040690726-b78261eff126', page: '2Qlj2Gaft7w' }, { id: 'photo-1453928582365-b6ad33cbcf64', page: 'aOC7TSLb1o8' }],
};
export const photoUrl = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${Math.round(w * 9 / 16)}&q=72`;
