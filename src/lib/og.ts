import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';

const fontsDir = path.join(
  process.cwd(),
  'node_modules/@fontsource/newsreader/files'
);
const newsreaderRegular = fs.readFileSync(
  path.join(fontsDir, 'newsreader-latin-400-normal.woff')
);
const newsreaderItalic = fs.readFileSync(
  path.join(fontsDir, 'newsreader-latin-400-italic.woff')
);

const CREAM = '#f6f4ee';
const INK = '#1a1916';
const INK_FAINT = 'rgba(26,25,22,0.10)';
const INK_MID = 'rgba(26,25,22,0.22)';
const LAVENDER = '167,133,212';

const gridBackground = {
  backgroundColor: CREAM,
  backgroundImage: [
    `linear-gradient(to right, rgba(${LAVENDER},0) 45%, rgba(${LAVENDER},0.35) 100%)`,
    `linear-gradient(to right, ${INK_FAINT} 1px, transparent 1px)`,
    `linear-gradient(to bottom, ${INK_FAINT} 1px, transparent 1px)`,
    `linear-gradient(to right, ${INK_MID} 1.5px, transparent 1.5px)`,
    `linear-gradient(to bottom, ${INK_MID} 1.5px, transparent 1.5px)`,
  ].join(','),
  backgroundSize: '100% 100%, 40px 40px, 40px 40px, 200px 200px, 200px 200px',
  backgroundPosition: '0 0, 0 0, 0 0, 0 0, 0 0',
};

interface RenderArgs {
  title: string;
  kicker?: string;
}

export async function renderOgPng({ title, kicker }: RenderArgs): Promise<Buffer> {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          color: INK,
          fontFamily: 'Newsreader',
          ...gridBackground,
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                fontSize: '22px',
                letterSpacing: '0.02em',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      gap: '5px',
                      marginRight: '16px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: { width: '7px', height: '24px', backgroundColor: INK },
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: { width: '7px', height: '24px', backgroundColor: INK },
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: { fontStyle: 'italic' },
                    children: 'attackthealgorithm.com',
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                marginTop: 'auto',
              },
              children: [
                kicker
                  ? {
                      type: 'div',
                      props: {
                        style: {
                          fontSize: '20px',
                          fontStyle: 'italic',
                          marginBottom: '20px',
                          color: INK,
                          opacity: 0.65,
                        },
                        children: kicker,
                      },
                    }
                  : null,
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '64px',
                      lineHeight: 1.05,
                      letterSpacing: '-0.02em',
                      maxWidth: '900px',
                    },
                    children: title,
                  },
                },
              ].filter(Boolean),
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                fontSize: '20px',
                paddingTop: '28px',
                borderTop: `1px solid ${INK_MID}`,
              },
              children: [
                {
                  type: 'span',
                  props: {
                    style: { fontStyle: 'italic' },
                    children: 'Moses Nueman III',
                  },
                },
                {
                  type: 'span',
                  props: {
                    children: 'Senior Security Engineer',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Newsreader', data: newsreaderRegular, weight: 400, style: 'normal' },
        { name: 'Newsreader', data: newsreaderItalic, weight: 400, style: 'italic' },
      ],
    }
  );

  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
    .render()
    .asPng();
  return png;
}
