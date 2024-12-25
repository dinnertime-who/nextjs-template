'use client';
'use no memo';
import { cn } from '@/lib/utils';
import { Content, Editor, EditorContent, useEditor } from '@tiptap/react';
import { ChangeEvent, createContext, useContext } from 'react';
import {
  DEFAULT_EDITOR_CLASSNAMES,
  EXTENSIONS,
} from '../constants/defaults.constants';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button';
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ImageIcon,
  ItalicIcon,
  TableIcon,
} from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';

type Props = {};

type ReachTextEditorType = {
  editorInstance: Editor | null;
};
const ReachTextEditor = createContext<ReachTextEditorType | null>(null);

export const useReachTextEditor = () => {
  const context = useContext(ReachTextEditor);
  if (!context) {
    throw new Error('ReachTextEditor Error');
  }
  return context;
};

export const ReachTextEditorProvider = ({
  children,
  defaultContent,
}: Readonly<{ children: React.ReactNode; defaultContent?: Content }>) => {
  const editorInstance = useEditor({
    extensions: [
      ...EXTENSIONS,
      Placeholder.configure({ placeholder: '내용을 작성해주세요...' }),
    ],
    content: defaultContent,
    immediatelyRender: false,
  });

  return (
    <ReachTextEditor.Provider value={{ editorInstance }}>
      {children}
    </ReachTextEditor.Provider>
  );
};

export const RichTextEditor = ({}: Readonly<Props>) => {
  const { editorInstance } = useReachTextEditor();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const src = URL.createObjectURL(files[0]);
    editorInstance?.commands.setImage({ src });
  };

  if (!editorInstance) return null;

  return (
    <div className="border rounded-md">
      <ol className="border-b flex">
        <li>
          <Button
            onClick={() => editorInstance.chain().focus().toggleBold().run()}
            disabled={!editorInstance.can().chain().focus().toggleBold().run()}
            className="data-[active=true]:bg-zinc-100"
            variant="ghost"
            size="icon"
            data-active={editorInstance.isActive('bold')}
          >
            <BoldIcon className="h-4 w-4" />
          </Button>
        </li>
        <li>
          <Button
            onClick={() => editorInstance.chain().focus().toggleItalic().run()}
            disabled={
              !editorInstance.can().chain().focus().toggleItalic().run()
            }
            className="data-[active=true]:bg-zinc-100"
            variant="ghost"
            size="icon"
            data-active={editorInstance.isActive('italic')}
          >
            <ItalicIcon className="h-4 w-4" />
          </Button>
        </li>
        <li className="px-2 py-2">
          <Separator className="h-full w-px bg-border" orientation="vertical" />
        </li>
        <li>
          <Button
            onClick={() =>
              editorInstance.chain().focus().setTextAlign('left').run()
            }
            className="data-[active=true]:bg-zinc-100"
            variant="ghost"
            size="icon"
            data-active={editorInstance.isActive({ textAlign: 'left' })}
          >
            <AlignLeftIcon className="h-4 w-4" />
          </Button>
        </li>
        <li>
          <Button
            onClick={() =>
              editorInstance.chain().focus().setTextAlign('center').run()
            }
            className="data-[active=true]:bg-zinc-100"
            variant="ghost"
            size="icon"
            data-active={editorInstance.isActive({ textAlign: 'center' })}
          >
            <AlignCenterIcon className="h-4 w-4" />
          </Button>
        </li>
        <li>
          <Button
            onClick={() =>
              editorInstance.chain().focus().setTextAlign('right').run()
            }
            className="data-[active=true]:bg-zinc-100"
            variant="ghost"
            size="icon"
            data-active={editorInstance.isActive({ textAlign: 'right' })}
          >
            <AlignRightIcon className="h-4 w-4" />
          </Button>
        </li>
        <li className="px-2 py-2">
          <Separator className="h-full w-px bg-border" orientation="vertical" />
        </li>
        <li>
          <Button
            onClick={() =>
              editorInstance
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
            className="data-[active=true]:bg-zinc-100"
            variant="ghost"
            size="icon"
          >
            <TableIcon className="h-4 w-4" />
          </Button>
        </li>
        <li>
          <Button
            onClick={(e) =>
              (e.target as HTMLElement).querySelector('input')?.click()
            }
            className="data-[active=true]:bg-zinc-100"
            variant="ghost"
            size="icon"
          >
            <ImageIcon className="h-4 w-4" />
            <input className="hidden" type="file" onChange={onChange} />
          </Button>
        </li>
      </ol>

      <EditorContent
        className={cn(DEFAULT_EDITOR_CLASSNAMES)}
        editor={editorInstance}
      />

      <div className="border-t flex justify-end">
        <Button onClick={() => console.log(editorInstance.getHTML())}>
          Save
        </Button>
      </div>
    </div>
  );
};
