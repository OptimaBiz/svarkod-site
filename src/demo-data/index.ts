type DemoBundle = {
  articles?: any[]; documents?: any[]; organizations?: any[]; events?: any[]; ratings?: any[]; forum?: any[];
};
const modules = import.meta.glob('./*.json', { eager: true, import: 'default' }) as Record<string, DemoBundle>;
const bundles = Object.values(modules);
const collect = (key: keyof DemoBundle) => bundles.flatMap((bundle) => bundle[key] ?? []);
export const demoArticles = collect('articles');
export const demoDocuments = collect('documents');
export const demoOrganizations = collect('organizations');
export const demoEvents = collect('events');
export const demoRatings = collect('ratings');
export const demoForum = collect('forum');
export const demoEnabled = bundles.length > 0;
