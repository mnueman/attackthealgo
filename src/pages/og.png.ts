import { renderOgPng } from '../lib/og';

export const GET = async () => {
  const png = await renderOgPng({
    title: 'Attacking the Algorithm',
    kicker: 'Field notes from production security.',
  });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
