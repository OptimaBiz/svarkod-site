import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    lead: z.string(),
    section: z.enum(['Новости', 'Нормы', 'Практика', 'Технологии', 'Интервью']),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    readMinutes: z.number().int().positive(),
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
    status: z.enum(['Редакционный материал', 'Методика', 'Справка']),
    updatedAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const organizations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/organizations' }),
  schema: z.object({
    name: z.string(),
    shortName: z.string().optional(),
    description: z.string(),
    type: z.enum(['СРО', 'Аттестационный центр', 'Учебный центр', 'Лаборатория', 'Производитель оборудования', 'Производитель материалов', 'Поставщик', 'Экспертная организация']),
    region: z.string(),
    city: z.string().optional(),
    website: z.string().url().optional(),
    verification: z.enum(['Проверено редакцией', 'Требует проверки']),
    verifiedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['Выставка', 'Конференция', 'Вебинар', 'Обучение', 'Нормативная дата', 'Событие СВАРКОД']),
    startsAt: z.coerce.date(),
    endsAt: z.coerce.date().optional(),
    location: z.string(),
    organizer: z.string(),
    externalUrl: z.string().url().optional(),
    verification: z.enum(['Проверено редакцией', 'Требует проверки']),
    verifiedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, documents, organizations, events };
