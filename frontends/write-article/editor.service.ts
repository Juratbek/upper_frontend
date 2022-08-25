import EditorJs, { OutputData } from '@editorjs/editorjs';

import { EDITOR_HOLDER, EDITOR_PLACEHOLDER } from '../../utils/editor/editor.constants';

export interface ICreateEditorProps {
  holder?: string;
  onChangeHandler?(...args: any[]): void;
  isReadOnly?: boolean;
  data?: OutputData;
  placeholder?: string;
}

export const createEditor = async ({
  holder = EDITOR_HOLDER,
  onChangeHandler,
  isReadOnly = false,
  data = { blocks: [] },
  placeholder = EDITOR_PLACEHOLDER,
}: ICreateEditorProps = {}): Promise<EditorJs> => {
  const EditorJs = (await import('@editorjs/editorjs')).default;
  const Embed = (await import('@editorjs/embed')).default;
  const Header = (await import('@editorjs/header')).default;
  const ImageTool = (await import('@editorjs/image')).default;
  const List = (await import('@editorjs/list')).default;
  const Tooltip = (await import('editorjs-tooltip')).default;
  const TextColor = (await import('editorjs-text-color-plugin')).default;
  const Alert = (await import('editorjs-alert')).default;
  const InclineCode = (await import('@editorjs/inline-code')).default;

  return new EditorJs({
    holder: holder,
    onChange: onChangeHandler,
    readOnly: isReadOnly,
    placeholder: placeholder,
    data: data,
    tools: {
      header: {
        class: Header,
        shortcut: 'CMD+SHIFT+H',
        config: {
          levels: [1, 2, 3, 4, 5, 6],
          defaultLevel: 1,
        },
      },
      alert: Alert,
      list: List,
      image: ImageTool,
      embed: {
        class: Embed,
        inlineToolbar: true,
        config: {
          services: {
            youtube: true,
            codepen: true,
            carbon: {
              regex: /https?:\/\/carbon.now.sh\/(.*)/,
              embedUrl: 'https://carbon.now.sh/embed<%= remote_id %>',
              html: "<iframe height='350' scrolling='yes' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%'></iframe>",
              height: 350,
              width: 600,
            },
          },
        },
      },
      tooltip: {
        class: Tooltip,
        inlineToolbar: true,
        config: {
          underline: true,
        },
      },
      textColor: {
        class: TextColor,
        inlineToolbar: true,
      },
      inlineCode: {
        class: InclineCode,
        inlineToolbar: true,
      },
    },
  });
};

// <iframe
//   src="https://carbon.now.sh/embed?bg=rgba%28171%2C+184%2C+195%2C+1%29&t=seti&wt=none&l=auto&width=680&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=56px&ph=56px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false"
//   style="width: 875px; height: 391px; border:0; transform: scale(1); overflow:hidden;"
//   sandbox="allow-scripts allow-same-origin">
// </iframe>
