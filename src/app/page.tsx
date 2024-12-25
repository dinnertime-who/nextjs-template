import {
  ReachTextEditorProvider,
  RichTextEditor,
} from '@/components/rich-text-editor/editor';
import { RichTextViewer } from '@/components/rich-text-editor/viewer';

export default function Home() {
  return (
    <main>
      <section className="p-8">
        <ReachTextEditorProvider defaultContent={''}>
          <RichTextEditor />
          <RichTextViewer />
        </ReachTextEditorProvider>
      </section>
    </main>
  );
}
