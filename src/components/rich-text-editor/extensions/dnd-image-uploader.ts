import { mergeAttributes } from '@tiptap/core';
import Image from '@tiptap/extension-image';
import { Plugin, PluginKey } from 'prosemirror-state';

export const DndImageUploader = Image.extend({
  name: 'dndImageUploader',

  group: 'inline',

  inline: true,

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'img',
      mergeAttributes(HTMLAttributes, {
        style: `width: ${HTMLAttributes.width}; height: ${HTMLAttributes.height};`,
      }),
    ];
  },

  addCommands() {
    return {
      setImage:
        (options: { src: string; alt?: string; title?: string }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('dndImageUploader'),
        props: {
          handleDOMEvents: {
            drop: (view, event: Event) => {
              const dropEvent = event as DragEvent;

              // `dataTransfer.files`가 있으면 파일 업로드 처리
              if (dropEvent.dataTransfer?.files?.length) {
                dropEvent.preventDefault(); // 브라우저 기본 동작 방지
                dropEvent.stopPropagation();

                const file = dropEvent.dataTransfer.files[0];
                const src = URL.createObjectURL(file);

                this.editor.commands.setImage({ src });
                return true;
              }

              // 파일이 아닌 경우, 기본 동작 허용 (노드 위치 변경)
              return false;
            },
          },
        },
      }),
    ];
  },
});
