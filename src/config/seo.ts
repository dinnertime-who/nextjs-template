import type { Metadata } from 'next/types';
import { serverEnv } from './env/env.server';

export const SEO_DEFAULT_TITLE = 'CMS';

export const SEO_DEFAULT_DESCRIPTION = ``;

export const SEO_DEFAULT_KEYWORD = ``;

export const MAIN_METADATA: Metadata = {
  title: {
    default: SEO_DEFAULT_TITLE,
    template: `%s | ${SEO_DEFAULT_TITLE}`,
  },
  description: SEO_DEFAULT_DESCRIPTION,
  keywords: SEO_DEFAULT_KEYWORD,
  metadataBase: new URL(serverEnv.WEB_URL),
  applicationName: SEO_DEFAULT_TITLE,
};
