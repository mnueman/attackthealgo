import { getCollection } from 'astro:content';
import { renderOgPng } from '../../../lib/og';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.map(p => ({
    params: { slug: p.id.replace(/\.md$/, '') },
    props: { title: p.data.title, excerpt: p.data.excerpt },
  }));
}

export const GET = async ({ props }) => {
  const png = await renderOgPng({
    title: props.title,
    kicker: props.excerpt,
  });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
