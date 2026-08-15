export const primaryNav = [
  { href: '/edition/', label: 'Издание' },
  { href: '/requirements/', label: 'Требования' },
  { href: '/certification/', label: 'Аттестация' },
  { href: '/practice/', label: 'Практика' },
  { href: '/registry/', label: 'Реестры и рейтинги' },
  { href: '/community/', label: 'Сообщество' },
];

export const nav = primaryNav;
export const utilityNav = [
  { href: '/calendar/regulatory-deadlines/', label: 'Календарь' },
  { href: '/services/', label: 'Услуги' },
  { href: '/advertising/', label: 'Реклама' },
  { href: '/about/', label: 'О проекте' },
];

export const hubs = {
  edition: {
    label: 'Издание',
    accent: 'РЕДАКЦИЯ',
    title: 'Отраслевое издание без информационного шума',
    description: 'Новости, аналитика и объяснения с отделением факта, мнения, официального источника и коммерческого участия.',
    children: ['news', 'analysis', 'explainers', 'investigations', 'interviews', 'opinions', 'authors'],
  },
  requirements: {
    label: 'Требования',
    accent: 'РЕГУЛИРОВАНИЕ',
    title: 'От документа — к применимому требованию',
    description: 'Первоисточники, атомарные требования, сроки действия, переходные положения и навигация по применимости.',
    children: ['changes', 'documents', 'rules', 'topics', 'industries', 'timeline', 'navigator', 'compare', 'transition-2027'],
  },
  certification: {
    label: 'Аттестация',
    accent: 'МАРШРУТЫ',
    title: 'Аттестация и подтверждение готовности без догадок',
    description: 'Маршруты для персонала и производства: условия, документы, этапы, сроки действия, проверка сведений и центры.',
    children: ['personnel', 'production', 'industrial-safety', 'professional-qualifications', 'roadmaps', 'documents', 'validity-and-renewal', 'find-center', 'verify', 'faq'],
  },
  practice: {
    label: 'Практика',
    accent: 'ПРОИЗВОДСТВО',
    title: 'Инженерная практика сварочного производства',
    description: 'Процессы, материалы, оборудование, качество, дефекты, контроль, безопасность, автоматизация и рабочие шаблоны.',
    children: ['processes', 'materials', 'equipment', 'welding-procedures', 'modes-and-parameters', 'quality', 'defects', 'ndt', 'safety', 'automation-and-robotics', 'cases', 'calculators', 'templates', 'glossary'],
  },
  registry: {
    label: 'Реестры и рейтинги',
    accent: 'ПРОВЕРКА',
    title: 'Проверяемые сведения вместо рекламного каталога',
    description: 'Структурированные профили организаций и отраслевых сущностей с источниками, датой сверки и историей изменений.',
    children: ['certification-centers', 'training-centers', 'organizations', 'sro', 'experts', 'personnel', 'materials', 'equipment', 'technologies', 'laboratories', 'verify'],
  },
  community: {
    label: 'Сообщество',
    accent: 'ПРОФЕССИОНАЛЫ',
    title: 'Профессиональный разговор, связанный с источниками',
    description: 'Экспертные ответы, события и отдельный форумный контур с модерацией, принятыми ответами и ссылками на первоисточники.',
    children: ['experts', 'answers', 'events', 'jobs', 'associations', 'forum'],
  },
} as const;

export const legacyEditorialSections = {
  news: { label: 'Новости', articleSections: ['Новости', 'Интервью'] },
  norms: { label: 'Нормы', articleSections: ['Объясняем', 'Аналитика'] },
  technologies: { label: 'Технологии', articleSections: ['Технологии', 'Практика'] },
} as const;

export const directoryTypes = [
  'СРО', 'Аттестационный центр', 'Учебный центр', 'Лаборатория', 'Производитель оборудования',
  'Производитель материалов', 'Поставщик', 'Экспертная организация',
];
export const eventCategories = ['Выставка', 'Конференция', 'Вебинар', 'Обучение', 'Нормативная дата', 'Событие СВАРКОД'];
