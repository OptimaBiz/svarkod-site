import { getCollection } from 'astro:content';
import { platformPages } from '../data/platform';
import { hubs } from '../data/site';
const SITE='https://svarkod.ru';
function esc(v:string){return v.replace(/[<>&'\"]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'}[c]||c));}
function u(path:string,last?:Date){return `<url><loc>${esc(new URL(path,SITE).href)}</loc>${last?`<lastmod>${last.toISOString().slice(0,10)}</lastmod>`:''}</url>`;}
export async function GET(){
 const [articles,documents,organizations,events,requirements,paths,ratings]=await Promise.all([
  getCollection('articles',({data})=>!data.draft),getCollection('documents',({data})=>!data.draft),getCollection('organizations',({data})=>!data.draft),getCollection('events',({data})=>!data.draft),getCollection('requirements',({data})=>!data.draft),getCollection('qualificationPaths',({data})=>!data.draft),getCollection('ratingEditions',({data})=>!data.draft)
 ]);
 const staticPaths=['/',...Object.keys(hubs).map(x=>`/${x}/`),...platformPages.map(x=>`/${x.area}/${x.slug}/`),'/documents/','/organizations/','/events/','/ratings/','/ratings/methodology/','/forum/','/search/','/about/','/advertising/','/privacy/'];
 const urls=[...new Set(staticPaths)].map(x=>u(x));
 urls.push(...articles.map(x=>u(`/articles/${x.id}/`,x.data.updatedAt??x.data.publishedAt)),...documents.map(x=>u(`/documents/${x.id}/`,x.data.verifiedAt??x.data.updatedAt)),...organizations.map(x=>u(`/organizations/${x.id}/`,x.data.verifiedAt)),...events.map(x=>u(`/events/${x.id}/`,x.data.verifiedAt)),...requirements.map(x=>u(`/requirements/rules/${x.id}/`,x.data.reviewedAt)),...paths.map(x=>u(`/certification/roadmaps/${x.id}/`,x.data.reviewedAt)),...ratings.map(x=>u(`/ratings/editions/${x.id}/`,x.data.publishedAt??x.data.cutoffAt)));
 return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
}
