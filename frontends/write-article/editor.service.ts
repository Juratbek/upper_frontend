import EditorJs, { OutputData } from '@editorjs/editorjs';

import { EDITOR_HOLDER, EDITOR_PLACEHOLDER } from '../../utils/editor/editor.constants';

export interface ICreateEditorProps {
  holder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            codesandbox: {
              regex: /https?:\/\/codesandbox.io\/s\/(.*)/,
              embedUrl: 'https://codesandbox.io/embed/<%= remote_id %>',
              html: "<iframe style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;' title='frosty-snowflake-4lbhkx' allow='accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking' sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts'></iframe>",
              height: 500,
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
// https://codesandbox.io/s/frosty-snowflake-4lbhkx?file=/src/App.js

//  <iframe src="https://codesandbox.io/embed/frosty-snowflake-4lbhkx?fontsize=14&hidenavigation=1&theme=dark"
//      style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
//      title="frosty-snowflake-4lbhkx"
//      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
//      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
//    ></iframe>
