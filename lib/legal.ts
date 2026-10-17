// УВАГА: це чернетки юридичних документів Murly (оферта, політика конфіденційності,
// повернення коштів). Перед запуском оплати їх має перевірити юрист.
// Реквізити підставляються з lib/legal-config.ts через fill().
// Основна мова документів українська. Російська й англійська версії інформаційні.
import type { T } from './i18n';
import { LEGAL } from './legal-config';

export type LegalSection = { title: T; paras: T[] };
export type LegalDocId = 'offer' | 'privacy' | 'refund';
export type LegalDoc = { id: LegalDocId; href: string; title: T; description: T; sections: LegalSection[] };

// Підставляє реквізити замість {fop}, {taxId}, {address}, {email}, {phone}, {provider}
export function fill(text: string): string {
  return text
    .replace(/\{fop\}/g, LEGAL.fopName)
    .replace(/\{taxId\}/g, LEGAL.taxId)
    .replace(/\{address\}/g, LEGAL.address)
    .replace(/\{email\}/g, LEGAL.email)
    .replace(/\{phone\}/g, LEGAL.phone)
    .replace(/\{provider\}/g, LEGAL.provider);
}

// Рядок про переважну силу української версії (показується на всіх трьох сторінках)
export const UK_PREVAILS: T = {
  uk: 'Документ опубліковано українською, російською та англійською мовами. У разі розбіжностей переважну силу має українська версія.',
  ru: 'Документ опубликован на украинском, русском и английском языках. В случае расхождений преимущественную силу имеет украинская версия.',
  en: 'This document is published in Ukrainian, Russian and English. In case of any discrepancy, the Ukrainian version prevails.',
};

// Плашка, поки LEGAL.ready === false
export const DRAFT_NOTE: T = {
  uk: 'Документ готується до запуску оплати. Реквізити ФОП з’являться тут після реєстрації.',
  ru: 'Документ готовится к запуску оплаты. Реквизиты ФЛП появятся здесь после регистрации.',
  en: 'This document is being prepared for the launch of payments. The sole proprietor’s details will appear here after registration.',
};

/* ---------------------------------------------------------------- */
/* а) Публічна оферта                                                */
/* ---------------------------------------------------------------- */
const OFFER: LegalSection[] = [
  {
    title: { uk: 'Загальні положення', ru: 'Общие положения', en: 'General provisions' },
    paras: [
      {
        uk: 'Цей документ є публічною офертою (пропозицією укласти договір) відповідно до статей 633, 641 і 642 Цивільного кодексу України та Закону України «Про електронну комерцію».',
        ru: 'Этот документ является публичной офертой (предложением заключить договор) в соответствии со статьями 633, 641 и 642 Гражданского кодекса Украины и Закона Украины «Об электронной коммерции».',
        en: 'This document is a public offer (a proposal to conclude a contract) under Articles 633, 641 and 642 of the Civil Code of Ukraine and the Law of Ukraine “On Electronic Commerce”.',
      },
      {
        uk: 'Виконавець: фізична особа-підприємець {fop}, РНОКПП {taxId}, платник єдиного податку 3 групи (далі «Виконавець» або «Murly»).',
        ru: 'Исполнитель: физическое лицо-предприниматель {fop}, РНУКПН {taxId}, плательщик единого налога 3 группы (далее «Исполнитель» или «Murly»).',
        en: 'Provider: sole proprietor (FOP) {fop}, tax ID {taxId}, single tax payer of the 3rd group (the “Provider” or “Murly”).',
      },
      {
        uk: 'Користувач: будь-яка дієздатна фізична особа, яка прийняла цю оферту. Якщо користувачеві менше 14 років, договір від його імені укладає один з батьків або інший законний представник.',
        ru: 'Пользователь: любое дееспособное физическое лицо, которое приняло эту оферту. Если пользователю меньше 14 лет, договор от его имени заключает один из родителей или другой законный представитель.',
        en: 'User: any legally capable individual who has accepted this offer. If the user is under 14, the contract is concluded on their behalf by a parent or another legal guardian.',
      },
      {
        uk: 'Сайт: murly.com.ua разом з усіма сторінками, кабінетами вчителя й учня та матеріалами, які на ньому розміщені.',
        ru: 'Сайт: murly.com.ua вместе со всеми страницами, кабинетами учителя и ученика и материалами, которые на нём размещены.',
        en: 'Website: murly.com.ua with all its pages, teacher and student dashboards and the materials published on it.',
      },
    ],
  },
  {
    title: { uk: 'Предмет договору', ru: 'Предмет договора', en: 'Subject of the contract' },
    paras: [
      {
        uk: 'Виконавець надає користувачеві доступ до онлайн-платформи Murly для вивчення англійської мови: кабінетів вчителя й учня, готових уроків, пробних тестів НМТ, ігор та інших функцій відповідно до обраного тарифу (далі «Підписка»).',
        ru: 'Исполнитель предоставляет пользователю доступ к онлайн-платформе Murly для изучения английского языка: кабинетов учителя и ученика, готовых уроков, пробных тестов НМТ, игр и других функций в соответствии с выбранным тарифом (далее «Подписка»).',
        en: 'The Provider gives the user access to the Murly online platform for learning English: teacher and student dashboards, ready-made lessons, NMT mock tests, games and other features according to the chosen plan (the “Subscription”).',
      },
      {
        uk: 'Також Виконавець продає цифрові товари: PDF-чеклісти, списки слів, плани з дієсловами, матеріали для друку з іграми та набори таких матеріалів (далі «Цифрові товари»).',
        ru: 'Также Исполнитель продаёт цифровые товары: PDF-чеклисты, списки слов, планы с глаголами, материалы для печати с играми и наборы таких материалов (далее «Цифровые товары»).',
        en: 'The Provider also sells digital goods: PDF checklists, word lists, verb plans, printable game materials and bundles of such materials (the “Digital goods”).',
      },
      {
        uk: 'Опис тарифів і цифрових товарів, їхній склад і ціни розміщені на сторінці «Тарифи» та на сторінках відповідних товарів. Ці описи є частиною оферти.',
        ru: 'Описание тарифов и цифровых товаров, их состав и цены размещены на странице «Тарифы» и на страницах соответствующих товаров. Эти описания являются частью оферты.',
        en: 'Descriptions of plans and digital goods, their contents and prices are published on the Pricing page and on the pages of the relevant goods. These descriptions form part of this offer.',
      },
    ],
  },
  {
    title: { uk: 'Як прийняти оферту', ru: 'Как принять оферту', en: 'How to accept the offer' },
    paras: [
      {
        uk: 'Оферта вважається прийнятою (договір укладеним), коли користувач реєструється на сайті або оплачує Підписку чи Цифровий товар, залежно від того, що станеться раніше.',
        ru: 'Оферта считается принятой (договор заключённым), когда пользователь регистрируется на сайте или оплачивает Подписку или Цифровой товар, в зависимости от того, что произойдёт раньше.',
        en: 'The offer is deemed accepted (and the contract concluded) when the user registers on the website or pays for a Subscription or a Digital good, whichever happens first.',
      },
      {
        uk: 'Приймаючи оферту, користувач підтверджує, що прочитав і погоджується з цим документом, Політикою конфіденційності та Правилами повернення коштів.',
        ru: 'Принимая оферту, пользователь подтверждает, что прочитал и соглашается с этим документом, Политикой конфиденциальности и Правилами возврата средств.',
        en: 'By accepting the offer, the user confirms that they have read and agree to this document, the Privacy Policy and the Refund Policy.',
      },
      {
        uk: 'Договір укладається в електронній формі і має таку саму силу, як договір на папері. Підтвердженням оплати є електронна квитанція від платіжного сервісу.',
        ru: 'Договор заключается в электронной форме и имеет такую же силу, как договор на бумаге. Подтверждением оплаты является электронная квитанция от платёжного сервиса.',
        en: 'The contract is concluded electronically and has the same force as a paper contract. The electronic receipt from the payment service confirms the payment.',
      },
    ],
  },
  {
    title: { uk: 'Ціни та оплата', ru: 'Цены и оплата', en: 'Prices and payment' },
    paras: [
      {
        uk: 'Ціни вказані в гривнях на сторінці «Тарифи» і на сторінках товарів. Ціна фіксується в момент оплати.',
        ru: 'Цены указаны в гривнах на странице «Тарифы» и на страницах товаров. Цена фиксируется в момент оплаты.',
        en: 'Prices are shown in Ukrainian hryvnias on the Pricing page and on product pages. The price is fixed at the moment of payment.',
      },
      {
        uk: 'Оплата здійснюється банківською карткою через платіжний сервіс {provider}. Дані картки вводяться на захищеній сторінці платіжного сервісу, Murly їх не отримує і не зберігає.',
        ru: 'Оплата осуществляется банковской картой через платёжный сервис {provider}. Данные карты вводятся на защищённой странице платёжного сервиса, Murly их не получает и не хранит.',
        en: 'Payment is made by bank card through the payment service {provider}. Card details are entered on the payment service’s secure page; Murly does not receive or store them.',
      },
      {
        uk: 'Виконавець може змінювати ціни. Нові ціни не діють для вже оплаченого періоду. Про зміну ціни для чинної Підписки ми повідомимо листом щонайменше за 14 днів до наступного платежу.',
        ru: 'Исполнитель может изменять цены. Новые цены не действуют для уже оплаченного периода. Об изменении цены для действующей Подписки мы сообщим письмом минимум за 14 дней до следующего платежа.',
        en: 'The Provider may change prices. New prices do not apply to a period already paid for. We will notify you by email at least 14 days before the next payment if the price of your active Subscription changes.',
      },
    ],
  },
  {
    title: { uk: 'Підписка', ru: 'Подписка', en: 'Subscription' },
    paras: [
      {
        uk: 'Підписка оформлюється на місяць або на рік, залежно від обраного тарифу. Доступ до платних функцій відкривається одразу після успішної оплати.',
        ru: 'Подписка оформляется на месяц или на год, в зависимости от выбранного тарифа. Доступ к платным функциям открывается сразу после успешной оплаты.',
        en: 'A Subscription is taken out for a month or a year, depending on the chosen plan. Paid features become available immediately after successful payment.',
      },
      {
        uk: 'Автоматичне продовження діє тільки якщо платіжний сервіс {provider} підтримує регулярні платежі і користувач погодився на них під час оплати. В іншому разі після закінчення оплаченого періоду користувач оплачує наступний період самостійно.',
        ru: 'Автоматическое продление действует только если платёжный сервис {provider} поддерживает регулярные платежи и пользователь согласился на них при оплате. В противном случае после окончания оплаченного периода пользователь оплачивает следующий период самостоятельно.',
        en: 'Automatic renewal applies only if the payment service {provider} supports recurring payments and the user agreed to them at checkout. Otherwise, after the paid period ends, the user pays for the next period manually.',
      },
      {
        uk: 'Скасувати Підписку можна будь-коли в кабінеті, у розділі налаштувань тарифу. Після скасування нові списання не відбуваються, а платні функції залишаються доступними до кінця оплаченого періоду.',
        ru: 'Отменить Подписку можно в любой момент в кабинете, в разделе настроек тарифа. После отмены новые списания не происходят, а платные функции остаются доступными до конца оплаченного периода.',
        en: 'You can cancel the Subscription at any time in your dashboard, in the plan settings. After cancellation no further charges are made, and paid features remain available until the end of the paid period.',
      },
      {
        uk: 'Після закінчення оплаченого періоду акаунт переходить на безкоштовний тариф. Дані користувача (класи, учні, прогрес) зберігаються відповідно до Політики конфіденційності.',
        ru: 'После окончания оплаченного периода аккаунт переходит на бесплатный тариф. Данные пользователя (классы, ученики, прогресс) сохраняются в соответствии с Политикой конфиденциальности.',
        en: 'When the paid period ends, the account moves to the free plan. User data (classes, students, progress) is kept in accordance with the Privacy Policy.',
      },
    ],
  },
  {
    title: { uk: 'Безкоштовний пробний період', ru: 'Бесплатный пробный период', en: 'Free trial' },
    paras: [
      {
        uk: 'Для платних тарифів вчителя діє безкоштовний пробний період 14 днів. Один пробний період надається одному користувачеві один раз.',
        ru: 'Для платных тарифов учителя действует бесплатный пробный период 14 дней. Один пробный период предоставляется одному пользователю один раз.',
        en: 'Paid teacher plans come with a free 14-day trial. Each user can use the trial only once.',
      },
      {
        uk: 'Під час пробного періоду гроші не списуються. Якщо після його закінчення користувач не оплатив тариф, акаунт переходить на безкоштовний тариф «Старт».',
        ru: 'Во время пробного периода деньги не списываются. Если после его окончания пользователь не оплатил тариф, аккаунт переходит на бесплатный тариф «Старт».',
        en: 'No money is charged during the trial. If the user has not paid for a plan when the trial ends, the account moves to the free Start plan.',
      },
    ],
  },
  {
    title: { uk: 'Отримання цифрових товарів', ru: 'Получение цифровых товаров', en: 'Delivery of digital goods' },
    paras: [
      {
        uk: 'Одразу після успішної оплати користувач отримує посилання для завантаження на email, вказаний під час оплати, а також у кабінеті, у розділі покупок.',
        ru: 'Сразу после успешной оплаты пользователь получает ссылку для скачивания на email, указанный при оплате, а также в кабинете, в разделе покупок.',
        en: 'Right after successful payment, the user receives a download link at the email address given at checkout and in the purchases section of the dashboard.',
      },
      {
        uk: 'Цифровий товар вважається переданим, коли посилання для завантаження надіслано користувачеві. Якщо лист не прийшов протягом години, перевірте папку «Спам» або напишіть на {email}.',
        ru: 'Цифровой товар считается переданным, когда ссылка для скачивания отправлена пользователю. Если письмо не пришло в течение часа, проверьте папку «Спам» или напишите на {email}.',
        en: 'A Digital good is deemed delivered once the download link has been sent to the user. If the email has not arrived within an hour, check your spam folder or write to {email}.',
      },
      {
        uk: 'Перед оплатою користувач погоджується на негайне отримання цифрового контенту і підтверджує, що розуміє умови повернення коштів, описані в Правилах повернення коштів.',
        ru: 'Перед оплатой пользователь соглашается на немедленное получение цифрового контента и подтверждает, что понимает условия возврата средств, описанные в Правилах возврата средств.',
        en: 'Before paying, the user agrees to receive the digital content immediately and confirms that they understand the refund terms set out in the Refund Policy.',
      },
    ],
  },
  {
    title: { uk: 'Права на матеріали', ru: 'Права на материалы', en: 'Rights to materials' },
    paras: [
      {
        uk: 'Усі уроки, тести, ігри, тексти, ілюстрації та цифрові товари Murly є об’єктами авторського права і належать Виконавцю або використовуються ним на законних підставах.',
        ru: 'Все уроки, тесты, игры, тексты, иллюстрации и цифровые товары Murly являются объектами авторского права и принадлежат Исполнителю или используются им на законных основаниях.',
        en: 'All Murly lessons, tests, games, texts, illustrations and digital goods are protected by copyright and belong to the Provider or are used by it lawfully.',
      },
      {
        uk: 'Користувач отримує право використовувати матеріали тільки для особистого навчання або для занять зі своїми учнями (для вчителів). Друкувати матеріали для своїх уроків можна.',
        ru: 'Пользователь получает право использовать материалы только для личного обучения или для занятий со своими учениками (для учителей). Печатать материалы для своих уроков можно.',
        en: 'The user may use the materials only for personal learning or for lessons with their own students (for teachers). Printing materials for your own lessons is allowed.',
      },
      {
        uk: 'Заборонено продавати, публікувати, пересилати іншим людям, викладати в інтернет або в групи в месенджерах, передавати доступ до акаунта чи видавати матеріали Murly за свої.',
        ru: 'Запрещено продавать, публиковать, пересылать другим людям, выкладывать в интернет или в группы в мессенджерах, передавать доступ к аккаунту или выдавать материалы Murly за свои.',
        en: 'It is forbidden to sell, publish, forward to other people, upload to the internet or messenger groups, share account access or present Murly materials as your own.',
      },
    ],
  },
  {
    title: { uk: 'Обов’язки сторін', ru: 'Обязанности сторон', en: 'Obligations of the parties' },
    paras: [
      {
        uk: 'Виконавець зобов’язується: надавати доступ до оплачених функцій і товарів; підтримувати роботу сайту; захищати персональні дані користувачів; відповідати на звернення на {email} протягом 3 робочих днів.',
        ru: 'Исполнитель обязуется: предоставлять доступ к оплаченным функциям и товарам; поддерживать работу сайта; защищать персональные данные пользователей; отвечать на обращения на {email} в течение 3 рабочих дней.',
        en: 'The Provider undertakes to: give access to paid features and goods; keep the website running; protect users’ personal data; reply to requests sent to {email} within 3 business days.',
      },
      {
        uk: 'Користувач зобов’язується: вказувати правдиві дані під час реєстрації; не передавати свій пароль іншим; дотримуватися правил використання матеріалів; не намагатися зламати або перевантажити сайт.',
        ru: 'Пользователь обязуется: указывать правдивые данные при регистрации; не передавать свой пароль другим; соблюдать правила использования материалов; не пытаться взломать или перегрузить сайт.',
        en: 'The user undertakes to: provide truthful details when registering; not share their password; follow the rules on the use of materials; not attempt to hack or overload the website.',
      },
      {
        uk: 'Вчитель, який додає учнів у свій кабінет, відповідає за те, щоб мати на це згоду учнів, а для учнів молодше 14 років згоду їхніх батьків або законних представників.',
        ru: 'Учитель, который добавляет учеников в свой кабинет, отвечает за то, чтобы иметь на это согласие учеников, а для учеников младше 14 лет согласие их родителей или законных представителей.',
        en: 'A teacher who adds students to their dashboard is responsible for having the students’ consent and, for students under 14, the consent of their parents or legal guardians.',
      },
      {
        uk: 'Якщо користувач порушує цей договір, Виконавець може попередити його або обмежити доступ до акаунта.',
        ru: 'Если пользователь нарушает этот договор, Исполнитель может предупредить его или ограничить доступ к аккаунту.',
        en: 'If the user breaches this contract, the Provider may warn them or restrict access to the account.',
      },
    ],
  },
  {
    title: { uk: 'Обмеження відповідальності', ru: 'Ограничение ответственности', en: 'Limitation of liability' },
    paras: [
      {
        uk: 'Murly допомагає вивчати англійську, але результат навчання залежить від самого учня. Виконавець не гарантує певного балу на НМТ чи іншому іспиті.',
        ru: 'Murly помогает изучать английский, но результат обучения зависит от самого ученика. Исполнитель не гарантирует определённый балл на НМТ или другом экзамене.',
        en: 'Murly helps people learn English, but learning results depend on the student. The Provider does not guarantee any particular score in the NMT or any other exam.',
      },
      {
        uk: 'Виконавець не відповідає за перебої, спричинені провайдером інтернету, обладнанням користувача, відключенням електроенергії, роботою сторонніх сервісів або обставинами непереборної сили (зокрема воєнним станом). Ми робимо все можливе, щоб швидко відновити роботу.',
        ru: 'Исполнитель не отвечает за перебои, вызванные интернет-провайдером, оборудованием пользователя, отключением электроэнергии, работой сторонних сервисов или обстоятельствами непреодолимой силы (в частности военным положением). Мы делаем всё возможное, чтобы быстро восстановить работу.',
        en: 'The Provider is not liable for interruptions caused by the internet provider, the user’s equipment, power outages, third-party services or force majeure (including martial law). We do everything we can to restore service quickly.',
      },
      {
        uk: 'У будь-якому разі відповідальність Виконавця обмежується сумою, яку користувач фактично сплатив за відповідну Підписку або Цифровий товар.',
        ru: 'В любом случае ответственность Исполнителя ограничивается суммой, которую пользователь фактически заплатил за соответствующую Подписку или Цифровой товар.',
        en: 'In any case, the Provider’s liability is limited to the amount the user actually paid for the relevant Subscription or Digital good.',
      },
    ],
  },
  {
    title: { uk: 'Вирішення спорів', ru: 'Разрешение споров', en: 'Disputes' },
    paras: [
      {
        uk: 'До цього договору застосовується законодавство України, зокрема Закон України «Про захист прав споживачів».',
        ru: 'К этому договору применяется законодательство Украины, в частности Закон Украины «О защите прав потребителей».',
        en: 'This contract is governed by the laws of Ukraine, including the Law of Ukraine “On Consumer Rights Protection”.',
      },
      {
        uk: 'Спершу ми намагаємося вирішити будь-яке питання шляхом переговорів: напишіть на {email}. Якщо домовитися не вдалося, спір розглядає суд відповідно до законодавства України.',
        ru: 'Сначала мы стараемся решить любой вопрос путём переговоров: напишите на {email}. Если договориться не удалось, спор рассматривает суд в соответствии с законодательством Украины.',
        en: 'We first try to resolve any issue through negotiation: write to {email}. If no agreement is reached, the dispute is resolved by a court under the laws of Ukraine.',
      },
    ],
  },
  {
    title: { uk: 'Зміни та строк дії', ru: 'Изменения и срок действия', en: 'Changes and term' },
    paras: [
      {
        uk: 'Виконавець може змінювати цю оферту. Нова редакція набирає чинності з моменту публікації на сайті. Дата останнього оновлення вказана на початку документа.',
        ru: 'Исполнитель может изменять эту оферту. Новая редакция вступает в силу с момента публикации на сайте. Дата последнего обновления указана в начале документа.',
        en: 'The Provider may amend this offer. The new version takes effect when it is published on the website. The date of the last update is shown at the top of the document.',
      },
      {
        uk: 'Договір діє, поки користувач має акаунт на сайті або доступ до придбаних матеріалів. Користувач може припинити договір, видаливши акаунт.',
        ru: 'Договор действует, пока у пользователя есть аккаунт на сайте или доступ к приобретённым материалам. Пользователь может прекратить договор, удалив аккаунт.',
        en: 'The contract remains in force while the user has an account on the website or access to purchased materials. The user may terminate the contract by deleting their account.',
      },
    ],
  },
  {
    title: { uk: 'Реквізити Виконавця', ru: 'Реквизиты Исполнителя', en: 'Provider details' },
    paras: [
      { uk: 'ФОП {fop}', ru: 'ФЛП {fop}', en: 'Sole proprietor (FOP) {fop}' },
      { uk: 'РНОКПП: {taxId}', ru: 'РНУКПН: {taxId}', en: 'Tax ID: {taxId}' },
      { uk: 'Адреса: {address}', ru: 'Адрес: {address}', en: 'Address: {address}' },
      { uk: 'Email: {email}', ru: 'Email: {email}', en: 'Email: {email}' },
      { uk: 'Телефон: {phone}', ru: 'Телефон: {phone}', en: 'Phone: {phone}' },
      { uk: 'Сайт: murly.com.ua', ru: 'Сайт: murly.com.ua', en: 'Website: murly.com.ua' },
    ],
  },
];

/* ---------------------------------------------------------------- */
/* б) Політика конфіденційності                                      */
/* ---------------------------------------------------------------- */
const PRIVACY: LegalSection[] = [
  {
    title: { uk: 'Хто ми', ru: 'Кто мы', en: 'Who we are' },
    paras: [
      {
        uk: 'Володілець персональних даних: ФОП {fop}, РНОКПП {taxId}, адреса: {address}. Контакт з питань даних: {email}.',
        ru: 'Владелец персональных данных: ФЛП {fop}, РНУКПН {taxId}, адрес: {address}. Контакт по вопросам данных: {email}.',
        en: 'Personal data controller: sole proprietor (FOP) {fop}, tax ID {taxId}, address: {address}. Contact for data questions: {email}.',
      },
      {
        uk: 'Ця політика пояснює, які дані ми збираємо на сайті murly.com.ua, навіщо і як їх захищаємо.',
        ru: 'Эта политика объясняет, какие данные мы собираем на сайте murly.com.ua, зачем и как их защищаем.',
        en: 'This policy explains what data we collect on murly.com.ua, why, and how we protect it.',
      },
    ],
  },
  {
    title: { uk: 'Які дані ми збираємо', ru: 'Какие данные мы собираем', en: 'What data we collect' },
    paras: [
      {
        uk: 'Дані акаунта: ім’я, email, роль (вчитель, учень, батьки), мова сайту.',
        ru: 'Данные аккаунта: имя, email, роль (учитель, ученик, родители), язык сайта.',
        en: 'Account data: name, email, role (teacher, student, parent), site language.',
      },
      {
        uk: 'Навчальні дані: класи, домашні завдання, відповіді, результати тестів і квізів, прогрес, досягнення в іграх.',
        ru: 'Учебные данные: классы, домашние задания, ответы, результаты тестов и квизов, прогресс, достижения в играх.',
        en: 'Learning data: classes, homework, answers, test and quiz results, progress, game achievements.',
      },
      {
        uk: 'Дані про оплату: обраний тариф, статус оплати, дата і сума платежу, список придбаних товарів.',
        ru: 'Данные об оплате: выбранный тариф, статус оплаты, дата и сумма платежа, список приобретённых товаров.',
        en: 'Payment data: chosen plan, payment status, payment date and amount, list of purchased goods.',
      },
      {
        uk: 'Ми НЕ отримуємо і НЕ зберігаємо дані банківських карток. Картку обробляє платіжний сервіс {provider} на своїй захищеній сторінці.',
        ru: 'Мы НЕ получаем и НЕ храним данные банковских карт. Карту обрабатывает платёжный сервис {provider} на своей защищённой странице.',
        en: 'We do NOT receive or store bank card details. Cards are processed by the payment service {provider} on its own secure page.',
      },
      {
        uk: 'Технічні дані: IP-адреса, тип браузера і пристрою, які автоматично потрапляють у журнали сервера та сервісу входу.',
        ru: 'Технические данные: IP-адрес, тип браузера и устройства, которые автоматически попадают в журналы сервера и сервиса входа.',
        en: 'Technical data: IP address, browser and device type, which are automatically recorded in server and sign-in service logs.',
      },
    ],
  },
  {
    title: { uk: 'Навіщо нам ці дані', ru: 'Зачем нам эти данные', en: 'Why we need this data' },
    paras: [
      {
        uk: 'Щоб створити й підтримувати ваш акаунт, показувати прогрес, давати вчителю бачити результати його учнів.',
        ru: 'Чтобы создать и поддерживать ваш аккаунт, показывать прогресс, давать учителю видеть результаты его учеников.',
        en: 'To create and maintain your account, show progress, and let teachers see their students’ results.',
      },
      {
        uk: 'Щоб надати доступ до оплачених тарифів і товарів, надіслати посилання на завантаження та квитанції.',
        ru: 'Чтобы предоставить доступ к оплаченным тарифам и товарам, отправить ссылки на скачивание и квитанции.',
        en: 'To give access to paid plans and goods, and to send download links and receipts.',
      },
      {
        uk: 'Щоб відповідати на ваші звернення, захищати сайт від зловживань і виконувати вимоги податкового законодавства.',
        ru: 'Чтобы отвечать на ваши обращения, защищать сайт от злоупотреблений и выполнять требования налогового законодательства.',
        en: 'To answer your requests, protect the website from abuse and meet tax law requirements.',
      },
      {
        uk: 'Ми не продаємо ваші дані і не використовуємо їх для сторонньої реклами.',
        ru: 'Мы не продаём ваши данные и не используем их для сторонней рекламы.',
        en: 'We do not sell your data or use it for third-party advertising.',
      },
    ],
  },
  {
    title: { uk: 'Правові підстави', ru: 'Правовые основания', en: 'Legal basis' },
    paras: [
      {
        uk: 'Ми обробляємо дані відповідно до Закону України «Про захист персональних даних».',
        ru: 'Мы обрабатываем данные в соответствии с Законом Украины «О защите персональных данных».',
        en: 'We process data in accordance with the Law of Ukraine “On Personal Data Protection”.',
      },
      {
        uk: 'Підстави: ваша згода, яку ви надаєте під час реєстрації; виконання договору (публічної оферти); виконання обов’язків, які встановлює закон (зокрема облік платежів).',
        ru: 'Основания: ваше согласие, которое вы даёте при регистрации; исполнение договора (публичной оферты); выполнение обязанностей, установленных законом (в частности учёт платежей).',
        en: 'Grounds: your consent given at registration; performance of the contract (the public offer); compliance with legal obligations (including payment records).',
      },
    ],
  },
  {
    title: { uk: 'Хто ще обробляє дані', ru: 'Кто ещё обрабатывает данные', en: 'Who else processes data' },
    paras: [
      {
        uk: 'Для роботи сайту ми користуємося перевіреними сервісами. Вони обробляють дані тільки за нашим дорученням:',
        ru: 'Для работы сайта мы пользуемся проверенными сервисами. Они обрабатывают данные только по нашему поручению:',
        en: 'To run the website we use trusted services. They process data only on our behalf:',
      },
      {
        uk: 'Clerk: реєстрація, вхід і зберігання даних акаунта.',
        ru: 'Clerk: регистрация, вход и хранение данных аккаунта.',
        en: 'Clerk: registration, sign-in and storage of account data.',
      },
      {
        uk: 'Supabase: база даних з навчальними даними і даними про оплату.',
        ru: 'Supabase: база данных с учебными данными и данными об оплате.',
        en: 'Supabase: the database with learning data and payment data.',
      },
      {
        uk: 'Vercel: хостинг сайту.',
        ru: 'Vercel: хостинг сайта.',
        en: 'Vercel: website hosting.',
      },
      {
        uk: '{provider}: прийом оплати карткою.',
        ru: '{provider}: приём оплаты картой.',
        en: '{provider}: card payment processing.',
      },
      {
        uk: 'Сервери Clerk, Supabase і Vercel можуть розташовуватися за межами України (у США або ЄС). Користуючись сайтом, ви погоджуєтеся на таку передачу даних. Ці сервіси мають власні політики захисту даних.',
        ru: 'Серверы Clerk, Supabase и Vercel могут располагаться за пределами Украины (в США или ЕС). Пользуясь сайтом, вы соглашаетесь на такую передачу данных. Эти сервисы имеют собственные политики защиты данных.',
        en: 'Clerk, Supabase and Vercel servers may be located outside Ukraine (in the USA or the EU). By using the website you agree to such data transfer. These services have their own data protection policies.',
      },
    ],
  },
  {
    title: { uk: 'Cookies', ru: 'Cookies', en: 'Cookies' },
    paras: [
      {
        uk: 'Ми використовуємо тільки потрібні для роботи сайту cookies: murly_lang запам’ятовує мову сайту, cookies сервісу Clerk тримають вас у системі після входу.',
        ru: 'Мы используем только нужные для работы сайта cookies: murly_lang запоминает язык сайта, cookies сервиса Clerk сохраняют вход в систему.',
        en: 'We use only cookies needed for the website to work: murly_lang remembers the site language, and Clerk cookies keep you signed in.',
      },
      {
        uk: 'Частина прогресу в іграх і налаштувань може зберігатися в пам’яті вашого браузера (localStorage). Ці дані не передаються нам, поки ви не увійдете в акаунт.',
        ru: 'Часть прогресса в играх и настроек может храниться в памяти вашего браузера (localStorage). Эти данные не передаются нам, пока вы не войдёте в аккаунт.',
        en: 'Some game progress and settings may be stored in your browser’s memory (localStorage). This data is not sent to us until you sign in.',
      },
      {
        uk: 'Рекламних і стежувальних cookies ми не використовуємо. Якщо це зміниться, ми оновимо політику і попросимо вашу згоду.',
        ru: 'Рекламные и отслеживающие cookies мы не используем. Если это изменится, мы обновим политику и попросим ваше согласие.',
        en: 'We do not use advertising or tracking cookies. If this changes, we will update this policy and ask for your consent.',
      },
    ],
  },
  {
    title: { uk: 'Скільки ми зберігаємо дані', ru: 'Сколько мы храним данные', en: 'How long we keep data' },
    paras: [
      {
        uk: 'Дані акаунта і навчальні дані зберігаються, поки існує акаунт. Після видалення акаунта ми видаляємо їх протягом 30 днів.',
        ru: 'Данные аккаунта и учебные данные хранятся, пока существует аккаунт. После удаления аккаунта мы удаляем их в течение 30 дней.',
        en: 'Account and learning data are kept as long as the account exists. After the account is deleted, we erase them within 30 days.',
      },
      {
        uk: 'Записи про платежі зберігаються стільки, скільки вимагає податкове законодавство України, навіть після видалення акаунта.',
        ru: 'Записи о платежах хранятся столько, сколько требует налоговое законодательство Украины, даже после удаления аккаунта.',
        en: 'Payment records are kept for as long as Ukrainian tax law requires, even after the account is deleted.',
      },
    ],
  },
  {
    title: { uk: 'Діти', ru: 'Дети', en: 'Children' },
    paras: [
      {
        uk: 'Murly можуть користуватися діти від 6 років. Акаунт для дитини молодше 14 років створюється тільки за згодою одного з батьків або іншого законного представника, який також приймає оферту від імені дитини.',
        ru: 'Murly могут пользоваться дети от 6 лет. Аккаунт для ребёнка младше 14 лет создаётся только с согласия одного из родителей или другого законного представителя, который также принимает оферту от имени ребёнка.',
        en: 'Children from 6 years old can use Murly. An account for a child under 14 is created only with the consent of a parent or another legal guardian, who also accepts the offer on the child’s behalf.',
      },
      {
        uk: 'Якщо вчитель додає учнів у свій кабінет, він відповідає за те, щоб мати згоду учнів, а для дітей молодше 14 років згоду їхніх батьків або законних представників.',
        ru: 'Если учитель добавляет учеников в свой кабинет, он отвечает за то, чтобы иметь согласие учеников, а для детей младше 14 лет согласие их родителей или законных представителей.',
        en: 'If a teacher adds students to their dashboard, the teacher is responsible for having the students’ consent and, for children under 14, the consent of their parents or legal guardians.',
      },
      {
        uk: 'Для дітей ми збираємо мінімум даних. Якщо ви з’ясували, що дитина зареєструвалася без вашої згоди, напишіть на {email}, і ми видалимо акаунт.',
        ru: 'Для детей мы собираем минимум данных. Если вы выяснили, что ребёнок зарегистрировался без вашего согласия, напишите на {email}, и мы удалим аккаунт.',
        en: 'We collect as little data about children as possible. If you find that your child has registered without your consent, write to {email} and we will delete the account.',
      },
    ],
  },
  {
    title: { uk: 'Ваші права', ru: 'Ваши права', en: 'Your rights' },
    paras: [
      {
        uk: 'Ви маєте право знати, які ваші дані ми зберігаємо, отримати їх копію, виправити неточні дані, відкликати згоду і вимагати видалення даних.',
        ru: 'Вы имеете право знать, какие ваши данные мы храним, получить их копию, исправить неточные данные, отозвать согласие и потребовать удаления данных.',
        en: 'You have the right to know what data about you we store, get a copy of it, correct inaccurate data, withdraw consent and request deletion.',
      },
      {
        uk: 'Щоб скористатися цими правами, напишіть на {email} з адреси, прив’язаної до акаунта. Ми відповімо протягом 30 днів, зазвичай швидше.',
        ru: 'Чтобы воспользоваться этими правами, напишите на {email} с адреса, привязанного к аккаунту. Мы ответим в течение 30 дней, обычно быстрее.',
        en: 'To exercise these rights, write to {email} from the address linked to your account. We will reply within 30 days, usually sooner.',
      },
      {
        uk: 'Ви також можете звернутися до Уповноваженого Верховної Ради України з прав людини.',
        ru: 'Вы также можете обратиться к Уполномоченному Верховной Рады Украины по правам человека.',
        en: 'You may also contact the Ukrainian Parliament Commissioner for Human Rights.',
      },
    ],
  },
  {
    title: { uk: 'Безпека', ru: 'Безопасность', en: 'Security' },
    paras: [
      {
        uk: 'Сайт працює через захищене з’єднання HTTPS. Доступ до бази даних мають тільки уповноважені особи. Паролі зберігає сервіс Clerk у зашифрованому вигляді, ми їх не бачимо.',
        ru: 'Сайт работает через защищённое соединение HTTPS. Доступ к базе данных имеют только уполномоченные лица. Пароли хранит сервис Clerk в зашифрованном виде, мы их не видим.',
        en: 'The website uses a secure HTTPS connection. Only authorised persons have access to the database. Passwords are stored by Clerk in encrypted form; we cannot see them.',
      },
      {
        uk: 'Вчитель бачить тільки дані учнів своїх класів. Учень бачить тільки свої дані.',
        ru: 'Учитель видит только данные учеников своих классов. Ученик видит только свои данные.',
        en: 'Teachers see only the data of students in their own classes. Students see only their own data.',
      },
      {
        uk: 'Якщо станеться витік даних, ми повідомимо вас і відповідні органи у строки, які встановлює закон.',
        ru: 'Если произойдёт утечка данных, мы сообщим вам и соответствующим органам в сроки, установленные законом.',
        en: 'In the event of a data breach, we will notify you and the relevant authorities within the time limits set by law.',
      },
    ],
  },
  {
    title: { uk: 'Контакти', ru: 'Контакты', en: 'Contacts' },
    paras: [
      {
        uk: 'З усіх питань щодо персональних даних пишіть на {email} або телефонуйте: {phone}.',
        ru: 'По всем вопросам о персональных данных пишите на {email} или звоните: {phone}.',
        en: 'For any questions about personal data, write to {email} or call {phone}.',
      },
      {
        uk: 'Ми можемо оновлювати цю політику. Дата останнього оновлення вказана на початку документа.',
        ru: 'Мы можем обновлять эту политику. Дата последнего обновления указана в начале документа.',
        en: 'We may update this policy. The date of the last update is shown at the top of the document.',
      },
    ],
  },
];

/* ---------------------------------------------------------------- */
/* в) Повернення коштів                                              */
/* ---------------------------------------------------------------- */
const REFUND: LegalSection[] = [
  {
    title: { uk: 'Підписки', ru: 'Подписки', en: 'Subscriptions' },
    paras: [
      {
        uk: 'Скасувати Підписку можна будь-коли в кабінеті. Після скасування нові списання не відбуваються, а доступ зберігається до кінця оплаченого періоду.',
        ru: 'Отменить Подписку можно в любой момент в кабинете. После отмены новые списания не происходят, а доступ сохраняется до конца оплаченного периода.',
        en: 'You can cancel a Subscription at any time in your dashboard. After cancellation no further charges are made, and access remains until the end of the paid period.',
      },
      {
        uk: 'Ми повернемо оплату за поточний період, якщо ви звернулися протягом 7 днів після першої оплати тарифу і не користувалися платними функціями (наприклад, не створювали класи понад ліміт безкоштовного тарифу, не відкривали платні уроки чи тести).',
        ru: 'Мы вернём оплату за текущий период, если вы обратились в течение 7 дней после первой оплаты тарифа и не пользовались платными функциями (например, не создавали классы сверх лимита бесплатного тарифа, не открывали платные уроки или тесты).',
        en: 'We will refund the current period if you contact us within 7 days of your first payment for the plan and have not used any paid features (for example, you have not created classes beyond the free plan limit or opened paid lessons or tests).',
      },
      {
        uk: 'Оплата за наступні періоди продовження не повертається, але ви можете скасувати Підписку до дати наступного платежу.',
        ru: 'Оплата за следующие периоды продления не возвращается, но вы можете отменить Подписку до даты следующего платежа.',
        en: 'Payments for later renewal periods are not refunded, but you can cancel the Subscription before the next payment date.',
      },
      {
        uk: 'Пробний період безкоштовний, тому повертати за нього нічого. Якщо гроші все ж списалися помилково, ми повернемо їх повністю.',
        ru: 'Пробный период бесплатный, поэтому возвращать за него нечего. Если деньги всё же списались ошибочно, мы вернём их полностью.',
        en: 'The trial is free, so there is nothing to refund for it. If money was charged by mistake, we will refund it in full.',
      },
    ],
  },
  {
    title: { uk: 'Цифрові товари', ru: 'Цифровые товары', en: 'Digital goods' },
    paras: [
      {
        uk: 'Ми повернемо кошти за цифровий товар, якщо ви звернулися протягом 14 днів після оплати і файл ще не був завантажений або відкритий.',
        ru: 'Мы вернём деньги за цифровой товар, если вы обратились в течение 14 дней после оплаты и файл ещё не был скачан или открыт.',
        en: 'We will refund a digital good if you contact us within 14 days of payment and the file has not yet been downloaded or opened.',
      },
      {
        uk: 'Також ми повернемо кошти або надішлемо правильний файл, якщо файл пошкоджений, не відкривається або не відповідає опису на сайті. Ви обираєте, що вам зручніше.',
        ru: 'Также мы вернём деньги или отправим правильный файл, если файл повреждён, не открывается или не соответствует описанию на сайте. Вы выбираете, что вам удобнее.',
        en: 'We will also refund you or send the correct file if the file is damaged, does not open or does not match the description on the website. You choose which you prefer.',
      },
      {
        uk: 'В інших випадках після завантаження або відкриття файлу кошти не повертаються. Це цифровий контент, який передається одразу після оплати і не може бути «повернутий» як фізичний товар.',
        ru: 'В других случаях после скачивания или открытия файла деньги не возвращаются. Это цифровой контент, который передаётся сразу после оплаты и не может быть «возвращён» как физический товар.',
        en: 'In other cases, no refund is given once the file has been downloaded or opened. This is digital content delivered immediately after payment and cannot be “returned” like a physical item.',
      },
      {
        uk: 'Перед оплатою ви погоджуєтеся на негайне отримання цифрового контенту і підтверджуєте, що після завантаження втрачаєте право відмовитися від покупки. Це передбачено Законом України «Про захист прав споживачів» для цифрового контенту, який не постачається на матеріальному носії.',
        ru: 'Перед оплатой вы соглашаетесь на немедленное получение цифрового контента и подтверждаете, что после скачивания теряете право отказаться от покупки. Это предусмотрено Законом Украины «О защите прав потребителей» для цифрового контента, который не поставляется на материальном носителе.',
        en: 'Before paying, you agree to receive the digital content immediately and confirm that you lose the right to withdraw from the purchase once you download it. This is provided for by the Law of Ukraine “On Consumer Rights Protection” for digital content not supplied on a tangible medium.',
      },
      {
        uk: 'Для набору матеріалів правила діють так само: повернення можливе, якщо жоден файл з набору не був завантажений, або якщо файл пошкоджений чи не відповідає опису.',
        ru: 'Для набора материалов правила действуют так же: возврат возможен, если ни один файл из набора не был скачан, или если файл повреждён либо не соответствует описанию.',
        en: 'The same rules apply to bundles: a refund is possible if no file from the bundle has been downloaded, or if a file is damaged or does not match the description.',
      },
    ],
  },
  {
    title: { uk: 'Як подати запит', ru: 'Как подать запрос', en: 'How to request a refund' },
    paras: [
      {
        uk: 'Напишіть на {email} з адреси, яку ви вказали під час оплати. У листі вкажіть: дату оплати, суму, назву тарифу або товару і причину повернення. Якщо файл пошкоджений, додайте скриншот.',
        ru: 'Напишите на {email} с адреса, который вы указали при оплате. В письме укажите: дату оплаты, сумму, название тарифа или товара и причину возврата. Если файл повреждён, приложите скриншот.',
        en: 'Write to {email} from the address you used at checkout. Include: the payment date, the amount, the name of the plan or product and the reason for the refund. If the file is damaged, attach a screenshot.',
      },
      {
        uk: 'Ми відповімо протягом 3 робочих днів і повідомимо, чи погоджено повернення.',
        ru: 'Мы ответим в течение 3 рабочих дней и сообщим, одобрен ли возврат.',
        en: 'We will reply within 3 business days and let you know whether the refund is approved.',
      },
    ],
  },
  {
    title: { uk: 'Строки повернення', ru: 'Сроки возврата', en: 'Refund timing' },
    paras: [
      {
        uk: 'Кошти повертаються на ту саму картку, з якої була оплата, через платіжний сервіс {provider}.',
        ru: 'Деньги возвращаются на ту же карту, с которой была оплата, через платёжный сервис {provider}.',
        en: 'Money is returned to the same card used for payment, through the payment service {provider}.',
      },
      {
        uk: 'Повернення займає до 14 днів після погодження. Точний строк залежить від банку, який випустив картку.',
        ru: 'Возврат занимает до 14 дней после одобрения. Точный срок зависит от банка, выпустившего карту.',
        en: 'A refund takes up to 14 days after approval. The exact timing depends on the bank that issued the card.',
      },
      {
        uk: 'Після повернення коштів доступ до відповідного тарифу або товару припиняється.',
        ru: 'После возврата денег доступ к соответствующему тарифу или товару прекращается.',
        en: 'Once the refund is made, access to the relevant plan or product ends.',
      },
    ],
  },
  {
    title: { uk: 'Контакти', ru: 'Контакты', en: 'Contacts' },
    paras: [
      {
        uk: 'ФОП {fop}, РНОКПП {taxId}. Email: {email}. Телефон: {phone}.',
        ru: 'ФЛП {fop}, РНУКПН {taxId}. Email: {email}. Телефон: {phone}.',
        en: 'Sole proprietor (FOP) {fop}, tax ID {taxId}. Email: {email}. Phone: {phone}.',
      },
    ],
  },
];

export const LEGAL_DOCS: Record<LegalDocId, LegalDoc> = {
  offer: {
    id: 'offer',
    href: '/legal/offer',
    title: { uk: 'Публічна оферта', ru: 'Публичная оферта', en: 'Public offer agreement' },
    description: {
      uk: 'Умови договору про доступ до підписок Murly і купівлю цифрових матеріалів.',
      ru: 'Условия договора о доступе к подпискам Murly и покупке цифровых материалов.',
      en: 'Terms of the contract for access to Murly subscriptions and the purchase of digital materials.',
    },
    sections: OFFER,
  },
  privacy: {
    id: 'privacy',
    href: '/legal/privacy',
    title: { uk: 'Політика конфіденційності', ru: 'Политика конфиденциальности', en: 'Privacy policy' },
    description: {
      uk: 'Які дані збирає Murly, навіщо, хто їх обробляє і як ними керувати.',
      ru: 'Какие данные собирает Murly, зачем, кто их обрабатывает и как ими управлять.',
      en: 'What data Murly collects, why, who processes it and how you can control it.',
    },
    sections: PRIVACY,
  },
  refund: {
    id: 'refund',
    href: '/legal/refund',
    title: { uk: 'Повернення коштів', ru: 'Возврат средств', en: 'Refund policy' },
    description: {
      uk: 'Коли і як можна повернути гроші за підписку або цифровий товар Murly.',
      ru: 'Когда и как можно вернуть деньги за подписку или цифровой товар Murly.',
      en: 'When and how you can get a refund for a Murly subscription or digital product.',
    },
    sections: REFUND,
  },
};
