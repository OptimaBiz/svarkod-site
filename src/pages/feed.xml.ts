import { getCollection } from 'astro:content';
import { sortArticles } from '../lib/content';

const SITE = 'https://svarkod.ru';

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[char] || char));
}

export async function GET() {
  const articles = sortArticles(await getCollection('articles', ({ data }) => !data.draft)).slice(0, 30);
  const items = articles.map(entry => `<item><title>${escapeXml(entry.data.title)}</title><link>${new URL(`/articles/${entry.id}/`, SITE).href}</link><guid>${new URL(`/articles/${entry.id}/`, SITE).href}</guid><pubDate>${entry.data.publishedAt.toUTCString()}</pubDate><description>${escapeXml(entry.data.lead)}</description></item>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>СВАРКОД</title><link>${SITE}/</link><description>Материалы о сварке, промышленной безопасности и нормативном регулировании.</description><language>ru</language>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
