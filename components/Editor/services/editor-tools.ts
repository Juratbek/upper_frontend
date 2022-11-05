import { EditorConfig } from '@editorjs/editorjs';
import { compressImage, toBase64 } from 'utils';

import { IUploadedImage } from '../editor.types';

type TTool =
  | 'Embed'
  | 'Header'
  | 'ImageTool'
  | 'List'
  | 'Quote'
  | 'Delimeter'
  | 'TextColor'
  | 'Alert'
  | 'Unsplash'
  | 'InclineCode'
  | 'CodeFlask';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TOOLS: Record<TTool, any> = {
  Embed: undefined,
  Header: undefined,
  ImageTool: undefined,
  List: undefined,
  Quote: undefined,
  Delimeter: undefined,
  TextColor: undefined,
  Alert: undefined,
  Unsplash: undefined,
  InclineCode: undefined,
  CodeFlask: undefined,
};

export const getTools = async (): Promise<EditorConfig['tools']> => {
  const tools = await Promise.all([
    import('@editorjs/embed'),
    import('@editorjs/header'),
    import('@editorjs/image'),
    import('@editorjs/list'),
    import('@editorjs/quote'),
    import('@editorjs/delimiter'),
    import('editorjs-text-color-plugin'),
    import('editorjs-alert'),
    import('editorjs-inline-image'),
    import('@editorjs/inline-code'),
    import('@calumk/editorjs-codeflask'),
  ]);

  Object.keys(TOOLS).forEach((key, index) => {
    TOOLS[key as TTool] = tools[index].default;
  });

  return {
    header: {
      class: TOOLS.Header,
      shortcut: 'CMD+SHIFT+H',
      config: {
        levels: [1, 2, 3, 4, 5, 6],
        defaultLevel: 1,
      },
    },
    alert: TOOLS.Alert,
    quote: TOOLS.Quote,
    delimeter: TOOLS.Delimeter,
    list: TOOLS.List,
    unsplash: {
      class: TOOLS.Unsplash,
      config: {
        unsplash: {
          appName: 'udas',
          clientId: 'YUiELidZbnKRhMEECKChvST2BMHOfCR6X3mPia5ZdbU',
        },
      },
    },
    image: {
      class: TOOLS.ImageTool,
      config: {
        uploader: {
          async uploadByFile(file: File): Promise<IUploadedImage> {
            const compressedFile = await compressImage(file);
            const imageUrl = await toBase64(compressedFile);

            return {
              success: 1,
              file: {
                url: imageUrl?.toString() || '',
              },
            };
          },
        },
      },
    },
    code: TOOLS.CodeFlask,
    embed: {
      class: TOOLS.Embed,
      inlineToolbar: true,
      config: {
        services: {
          youtube: true,
          codepen: true,
          pinterest: {
            regex: /https:\/\/www\.pinterest.com\/pin\/(.*)\/(.*)/,
            embedUrl: 'https://assets.pinterest.com/ext/embed.html?id=<%= remote_id %>',
            html: '<iframe scrolling="yes" frameborder="no" allowtransparency="true" allowfullscreen="true" style="width: 100%; min-height: 500px; max-height: 1000px;" class="embed-tool__content"></iframe>',
          },
          carbon: {
            regex: /https?:\/\/carbon.now.sh\/(.*)/,
            embedUrl: 'https://carbon.now.sh/embed<%= remote_id %>',
            html: "<iframe height='350' scrolling='auto' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%'></iframe>",
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
          jsfiddle: {
            regex: /https?:\/\/jsfiddle.net\/(.*)/,
            embedUrl: 'https://jsfiddle.net/<%= remote_id %>embedded/',
            html: "<iframe width='100%' height='300' allowfullscreen='allowfullscreen' allowpaymentrequest frameborder='0'></iframe>",
            height: 500,
            width: 600,
          },
        },
      },
    },
    textColor: {
      class: TOOLS.TextColor,
      inlineToolbar: true,
    },
    inlineCode: {
      class: TOOLS.InclineCode,
      inlineToolbar: true,
    },
  };
};
