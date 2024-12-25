'use client';

import { useEffect } from 'react';
import { useReachTextEditor } from '../editor';
import {
  DEFAULT_VIEWER_CLASSANAMES,
  EXTENSIONS,
} from '../constants/defaults.constants';
import { EditorContent, useEditor } from '@tiptap/react';

type Props = React.HTMLAttributes<HTMLElement>;

export const RichTextViewer = ({}: Readonly<Props>) => {
  const { editorInstance } = useReachTextEditor();

  const viewer = useEditor({
    extensions: [...EXTENSIONS],
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editorInstance || !viewer) return;
    viewer.commands.setContent(editorInstance.getHTML());
    viewer.setEditable(false);

    editorInstance.on('update', (evt) => {
      viewer.commands.setContent(evt.editor.getHTML());
    });
  }, [editorInstance, viewer]);

  return (
    <EditorContent editor={viewer} className={DEFAULT_VIEWER_CLASSANAMES} />
  );
};
