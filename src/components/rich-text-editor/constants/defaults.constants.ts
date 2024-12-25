import { cn } from '@/lib/utils';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Table from '@tiptap/extension-table';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import Gapcursor from '@tiptap/extension-gapcursor';
import { DndImageUploader } from '../extensions/dnd-image-uploader';
import Link from '@tiptap/extension-link';

export const EXTENSIONS = [
  StarterKit,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  Gapcursor,
  DndImageUploader,
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: 'https',
    protocols: ['http', 'https'],
    isAllowedUri: (url, ctx) => {
      try {
        // construct URL
        const parsedUrl = url.includes(':')
          ? new URL(url)
          : new URL(`${ctx.defaultProtocol}://${url}`);

        // use default validation
        if (!ctx.defaultValidate(parsedUrl.href)) {
          return false;
        }

        // disallowed protocols
        const disallowedProtocols = ['ftp', 'file', 'mailto'];
        const protocol = parsedUrl.protocol.replace(':', '');

        if (disallowedProtocols.includes(protocol)) {
          return false;
        }

        // only allow protocols specified in ctx.protocols
        const allowedProtocols = ctx.protocols.map((p) =>
          typeof p === 'string' ? p : p.scheme,
        );

        if (!allowedProtocols.includes(protocol)) {
          return false;
        }

        // disallowed domains
        const disallowedDomains = [] as string[];
        const domain = parsedUrl.hostname;

        if (disallowedDomains.includes(domain)) {
          return false;
        }

        // all checks have passed
        return true;
      } catch (error) {
        return false;
      }
    },
    shouldAutoLink: (url) => {
      try {
        // construct URL
        const parsedUrl = url.includes(':')
          ? new URL(url)
          : new URL(`https://${url}`);

        // only auto-link if the domain is not in the disallowed list
        const disallowedDomains = [] as string[];
        const domain = parsedUrl.hostname;

        return !disallowedDomains.includes(domain);
      } catch (error) {
        return false;
      }
    },
  }),
];

const DEFAULT_CLASSNAMES = cn(
  'max-w-none prose prose-p:my-0 prose-headings:m-0 prose-h1:mb-6 prose-h2:mb-3 prose-hr:my-4 prose-img:m-0',
  '[&>[role=textbox]:focus]:outline-none [&>[role=textbox]]:p-4 [&>[role=textbox]]:min-h-32',

  '[&_table]:border-collapse',
  '[&_table]:m-0',
  '[&_table]:table-fixed',
  '[&_table]:w-full',

  '[&_table_th]:border [&_table_td]:border',
  '[&_table_th]:box-border [&_table_td]:box-border',
  '[&_table_th]:min-w-4 [&_table_td]:min-w-4',
  '[&_table_th]:relative [&_table_td]:relative',
  '[&_table_th]:align-top [&_table_td]:align-top',
  '[&_table_th]:bg-zinc-100',
  '[&_table_th]:p-2 [&_table_td]:p-2',

  '[&_table_.selectedCell:after]:content-[""] [&_table_.selectedCell:after]:bg-slate-100',
  '[&_table_.selectedCell:after]:inset-0 [&_table_.selectedCell:after]:pointer-events-none',
  '[&_table_.selectedCell:after]:absolute [&_table_.selectedCell:after]:z-[-2]',

  '[&_.tableWrapper]:overflow-x-auto',
  '[&_.tableWrapper]:overflow-y-hidden',
);

export const DEFAULT_EDITOR_CLASSNAMES = cn(
  DEFAULT_CLASSNAMES,
  '[&_p.is-editor-empty:first-child:before]:content-[attr(data-placeholder)]',
  '[&_p.is-editor-empty:first-child:before]:float-start',
  '[&_p.is-editor-empty:first-child:before]:h-0',
  '[&_p.is-editor-empty:first-child:before]:text-gray-400',
  '[&_p.is-editor-empty:first-child:before]:pointer-events-none',

  '[&_table_.column-resize-handle]:bg-primary',
  '[&_table_.column-resize-handle]:bottom-[-2px]',
  '[&_table_.column-resize-handle]:pointer-events-none',
  '[&_table_.column-resize-handle]:absolute',
  '[&_table_.column-resize-handle]:right-0',
  '[&_table_.column-resize-handle]:top-0',
  '[&_table_.column-resize-handle]:w-[4px]',

  '[&_.resize-cursor]:cursor-col-resize',
);

export const DEFAULT_VIEWER_CLASSANAMES = cn(DEFAULT_CLASSNAMES);
