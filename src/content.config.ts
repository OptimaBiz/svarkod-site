import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    lead: z.string(),
    section: z.enum(['Новости', 'Аналитика', 'Объясняем', 'Расследования', 'Интервью', 'Мнения', 'Практика', 'Технологии']),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    readMinutes: z.number().int().positive(),
    author: z.string().default('Редакция СВАРКОД'),
    reviewedBy: z.string().optional(),
    sourceUrls: z.array(z.string().url()).default([]),
    correctionNote: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const documents = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/documents' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    status: z.enum(['Действует', 'Не вступил в силу', 'Утратил силу', 'Изменён', 'Редакционный материал', 'Методика', 'Справка']),
    documentType: z.string().optional(),
    number: z.string().optional(),
    issuer: z.string().optional(),
    adoptedAt: z.coerce.date().optional(),
    effectiveFrom: z.coerce.date().optional(),
    effectiveTo: z.coerce.date().optional(),
    officialUrl: z.string().url().optional(),
    updatedAt: z.coerce.date(),
    verifiedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const requirements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/requirements' }),
  schema: z.object({
    title: z.string(), summary: z.string(), subject: z.string(), obligation: z.string(),
    sourceDocumentId: z.string().optional(), sourceSection: z.string().optional(),
    effectiveFrom: z.coerce.date().optional(), effectiveTo: z.coerce.date().optional(),
    transitionRules: z.string().optional(), roles: z.array(z.string()).default([]), industries: z.array(z.string()).default([]),
    evidenceRequired: z.array(z.string()).default([]), reviewedAt: z.coerce.date(), draft: z.boolean().default(false),
  }),
});

const qualificationPaths = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/qualification-paths' }),
  schema: z.object({
    title: z.string(), role: z.string(), summary: z.string(), prerequisites: z.array(z.string()).default([]),
    requiredDocuments: z.array(z.string()).default([]), steps: z.array(z.string()).default([]), validity: z.string().optional(),
    sourceDocumentIds: z.array(z.string()).default([]), reviewedAt: z.coerce.date(), draft: z.boolean().default(false),
  }),
});

const organizations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/organizations' }),
  schema: z.object({
    name: z.string(), shortName: z.string().optional(), description: z.string(),
    type: z.enum(['СРО', 'Аттестационный центр', 'Учебный центр', 'Лаборатория', 'Производитель оборудования', 'Производитель материалов', 'Поставщик', 'Экспертная организация']),
    region: z.string(), city: z.string().optional(), website: z.string().url().optional(), inn: z.string().optional(), ogrn: z.string().optional(),
    sourceUrl: z.string().url().optional(), verification: z.enum(['Проверено редакцией', 'Требует проверки']),
    verifiedAt: z.coerce.date().optional(), tags: z.array(z.string()).default([]), draft: z.boolean().default(false),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(), description: z.string(),
    category: z.enum(['Выставка', 'Конференция', 'Вебинар', 'Обучение', 'Нормативная дата', 'Событие СВАРКОД']),
    startsAt: z.coerce.date(), endsAt: z.coerce.date().optional(), location: z.string(), organizer: z.string(),
    externalUrl: z.string().url().optional(), verification: z.enum(['Проверено редакцией', 'Требует проверки']),
    verifiedAt: z.coerce.date().optional(), tags: z.array(z.string()).default([]), draft: z.boolean().default(false),
  }),
});

const ratingEditions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/rating-editions' }),
  schema: z.object({
    title: z.string(), category: z.string(), period: z.string(), cutoffAt: z.coerce.date(), methodologyVersion: z.string(),
    datasetVersion: z.string(), publishedAt: z.coerce.date().optional(), status: z.enum(['Планируется', 'Опубликован', 'Исправлен']),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, documents, requirements, qualificationPaths, organizations, events, ratingEditions };
