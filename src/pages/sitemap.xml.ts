import { getCollection } from 'astro:content';
import { sections } from '../data/site';

const SITE = 'https://svarkod.ru';
function escapeXml(value: string) { return value.replace(/[<>&'\"]/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[char] || char)); }
function urlEntry(path: string, lastmod?: Date) { const loc = escapeXml(new URL(path, SITE).href); return `<url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : ''}</url>`; }

export async function GET() {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  const documents = await getCollection('documents', ({ data }) => !data.draft);
  const organizations = await getCollection('organizations', ({ data }) => !data.draft);
  const events = await getCollection('events', ({ data }) => !data.draft);
  const staticPaths = ['/', ...Object.keys(sections).map(section => `/${section}/`), '/documents/', '/organizations/', '/events/', '/ratings/methodology/', '/about/', '/advertising/', '/privacy/', '/ratings/centers/'];
  const urls = [
    ...staticPaths.map(path => urlEntry(path)),
    ...articles.map(entry => urlEntry(`/articles/${entry.id}/`, entry.data.updatedAt ?? entry.data.publishedAt)),
    ...documents.map(entry => urlEntry(`/documents/${entry.id}/`, entry.data.updatedAt)),
    ...organizations.map(entry => urlEntry(`/organizations/${entry.id}/`, entry.data.verifiedAt)),
    ...events.map(entry => urlEntry(`/events/${entry.id}/`, entry.data.verifiedAt)),
  ];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
