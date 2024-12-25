import localFont from 'next/font/local';

export const notoSansKr = localFont({
  src: [
    { path: './NotoSans-Black.woff2', weight: '900' },
    { path: './NotoSans-Bold.woff2', weight: '700' },
    { path: './NotoSans-Medium.woff2', weight: '500' },
    { path: './NotoSans-Regular.woff2', weight: '400' },
    { path: './NotoSans-Light.woff2', weight: '300' },
    { path: './NotoSans-DemiLight.woff2', weight: '200' },
    { path: './NotoSans-Thin.woff2', weight: '100' },
  ],
  display: 'swap',
});
