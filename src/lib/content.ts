import type { CollectionEntry } from 'astro:content';

const dateFormatter = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
export function formatDate(date: Date) { return dateFormatter.format(date); }
export function sortArticles(entries: CollectionEntry<'articles'>[]) { return [...entries].sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()); }
export function toArticleCard(entry: CollectionEntry<'articles'>) {
  return { slug: entry.id, section: entry.data.section, date: formatDate(entry.data.publishedAt), read: `${entry.data.readMinutes} мин`, title: entry.data.title, lead: entry.data.lead, featured: entry.data.featured };
}
