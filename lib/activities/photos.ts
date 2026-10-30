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
  'the-night-the-lights-went-out': [{ id: 'photo-1611416457332-946853cc75d6', page: 'x7clQSWhlfE' }, { id: 'photo-1528351655744-27cc30462816', page: 'KY6NHtBWJB8' }, { id: 'photo-1569619405872-2b522a707131', page: 'OfkVLqlDkNE' }],
  'plan-b-travel-club': [{ id: 'photo-1622967024058-afd7efe8a095', page: 'HUzWmnr6Suw' }, { id: 'photo-1663712403806-3b179940202d', page: 'M28dR8eOrOc' }, { id: 'photo-1706711625046-93890d38c630', page: 'hhTfOpE_6uw' }],
  'unwritten-office-rules': [{ id: 'photo-1594235046256-90e5572fd5f9', page: '6182SnH84II' }, { id: 'photo-1640878407886-2654ba5fd86b', page: 'arWChZcEpec' }, { id: 'photo-1527168027773-0cc890c4f42e', page: 'kvIAk3J_A1c' }],
  'must-have-been-the-cat': [{ id: 'photo-1769425249126-8b5bc5202cc8', page: 'RIwL2g-LdK4' }, { id: 'photo-1773047747721-f75d546d7290', page: 'pCwb5OuObls' }, { id: 'photo-1771354959667-96360bf59eab', page: 'NfyeP5Bcvd8' }],
  'life-before-the-tap': [{ id: 'photo-1777223287961-d4984e38c575', page: 'RJeKDohKu9M' }, { id: 'photo-1684556707134-2981ee31de27', page: 'Q1KJomEl70c' }, { id: 'photo-1558009250-d3d2229fdf28', page: '4v9Kk01mEbY' }],
  'the-regret-receipt': [{ id: 'photo-1763958470434-bf7f5065cc3b', page: 'dtkbdE4YKj8' }, { id: 'photo-1540221652346-e5dd6b50f3e7', page: 'ojZ4wJNUM5w' }, { id: 'photo-1769355104335-acef3aa4c9b6', page: 'RVP3wAw9gJY' }],
  'unwritten-rules-of-the-table': [{ id: 'photo-1599458252573-56ae36120de1', page: '5JwBbnyZzfc' }, { id: 'photo-1630527152680-500b5453fb04', page: 'yLfsEMVbOWA' }, { id: 'photo-1538333581680-29dd4752ddf2', page: 'PK1pzUGQSjc' }],
  'museum-of-abandoned-hobbies': [{ id: 'photo-1556900264-05294925fe6d', page: 'SeTKOPDmgNE' }, { id: 'photo-1584992236310-6edddc08acff', page: 'ahMCpXdUjv0' }, { id: 'photo-1658303135227-fcdfb0dab396', page: 'XbcfTH69aAc' }],
  'the-parcel-with-no-name': [{ id: 'photo-1782405183299-f177ddb3f437', page: '_My6Tbu09ks' }, { id: 'photo-1593809668690-cfe16e9bb3bb', page: '7Q2grGZxbds' }, { id: 'photo-1632849369576-06cb097fe68f', page: 'LvDY2D-FmAA' }],
  'side-effects-included': [{ id: 'photo-1507494924047-60b8ee826ca9', page: '1NTFSnV-KLs' }, { id: 'photo-1711610378090-779a7881a789', page: 'B3P7x5DRt_M' }, { id: 'photo-1531776691428-a0096d20137c', page: 'my6gx6s_Fr8' }],
  'side-quests-for-real-life': [{ id: 'photo-1614179924047-e1ab49a0a0cf', page: 'mHm1ASYNC0I' }, { id: 'photo-1608924066819-930edc42986a', page: '51Ms-0PbCHo' }, { id: 'photo-1586101578985-966e743aabfb', page: 'CUh69eo3MyU' }],
  'fair-play-helpdesk': [{ id: 'photo-1779062553594-7c84878a9266', page: '_f7aNucnTuU' }, { id: 'photo-1620429408060-423d98bf9092', page: 'N8f9tlmnfc4' }, { id: 'photo-1762655769373-0b4e074b38dd', page: '4t09k3tBZi8' }],
  'lucky-socks-and-loud-crowds': [{ id: 'photo-1657208431551-cbf415b8ef26', page: 'QOajY0MNp8Y' }, { id: 'photo-1779449607117-7a587c3c7534', page: 'LH1xqHQPI1A' }, { id: 'photo-1615486364462-ef6363adbc18', page: 'YHmZBuNCLvQ' }],
  'food-truck-summer': [{ id: 'photo-1565123409695-7b5ef63a2efb', page: 'geeZzrAXyMQ' }, { id: 'photo-1783440609420-fb31bd38c25d', page: '4MwNm_Q_8yU' }, { id: 'photo-1518013431117-eb1465fa5752', page: '8YBHgP0WrEo' }],
};
// Фото переносимо в наше сховище Supabase (бакет activity-photos, публічний): 1600 і 640 px.
// Фото вже в Supabase. Нові фото: додай id сюди, запусти /api/admin/mirror-photos, тоді вони підтягнуться.
export const MIRRORED = true;
const SB = 'https://tdnfxrlucrafijwgmxmb.supabase.co/storage/v1/object/public/activity-photos';
export const isPhotoId = (x: string) => /^photo-[\w-]+$/.test(x);
export const unsplashUrl = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${Math.round(w * 9 / 16)}&q=72&fm=jpg`;
export const photoUrl = (id: string, w = 1600) => (MIRRORED ? `${SB}/${id}-${w <= 800 ? 640 : 1600}.jpg` : unsplashUrl(id, w <= 800 ? 640 : 1600));
// Сторінки фото для слайдів «що на картинці» (кредит автору): id фото -> id сторінки на unsplash.com
export const PIC_PAGES: Record<string, string> = {
  'photo-1725785218870-b41365703511': 'SiqTD-YeKxY',
  'photo-1787755285035-3e6360fdcafc': 'WQhZgpA0ni0',
  'photo-1764705448662-f74992067ff7': 'ALXFeWIoxvw',
  'photo-1683581589510-8e526b6dca89': 'Ch53bKxmnf4',
  'photo-1500067803284-4304564c8655': '5v69Vl62NCM',
  'photo-1503423571797-2d2bb372094a': 'ULh0i2txBCY',
  'photo-1772553570761-14e18089a30c': 'f92Zcp9pxGM',
  'photo-1517870662726-c1d98ee36250': '1Ib8243cU8Q',
  'photo-1546930578-cc98d751a337': '6AcOCKPhkXo',
  'photo-1453828423292-392a660a502f': '7sPg5OLfExc',
  'photo-1707985287164-c84627ad6eba': '2pqPojBNq0Y',
  'photo-1567401893414-76b7b1e5a7a5': 'OYYE4g-I5ZQ',
  'photo-1790554255560-44ca54b1a505': 'p5pvyLKcH24',
  'photo-1529940316268-e245e031bcd1': 'b2XXbQbiox8',
  'photo-1781460846863-433b91bd93fb': 'ChXKPHornJQ',
  'photo-1719693431130-fcb5d4563981': 'nWsBD-MmC38',
  'photo-1782405183431-893f08e24b1a': 'HSxsGeMLlO4',
  'photo-1700636535623-bd662419833a': '6PyI95X8a9s',
  'photo-1570129476815-ba368ac77013': 'onnJOfF-okU',
  'photo-1758873263520-1f77729ad5b8': 'Po6upO2VQig',
  'photo-1611078489935-0cb964de46d6': 'SqLyNHbsLKQ',
  'photo-1644333612222-9acc8d5f2b8c': 'UQFDKOyG5E0',
  'photo-1678443316613-dbc3261c8b50': 'mQtYaHs0LZU',
  'photo-1584895738330-2e2cae9e8355': 'XrUMqFG2_cQ',
  'photo-1740906793388-8204990ae6ff': 'SRxFtCQevGM',
  'photo-1647429261408-d91c4cc06dfd': 'hiJygLtJXuA',
  'photo-1766985611720-4e85143db30b': 'O5Vd1kSHHQ4',
  'photo-1777837678473-1f9fa17eff9f': 'oEAEBxUTzJI',
};
