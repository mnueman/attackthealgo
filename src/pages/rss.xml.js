import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { BIO } from '../data/bio';

export async function GET(context) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return rss({
    title: BIO.name,
    description: BIO.intro_short,
    site: context.site,
    items: posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map(p => ({
        title: p.data.title,
        pubDate: p.data.date,
        description: p.data.excerpt,
        link: `/posts/${p.id.replace(/\.md$/, '')}/`,
      })),
  });
}
