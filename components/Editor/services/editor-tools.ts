import { EditorConfig } from '@editorjs/editorjs';
import { compressImage, toBase64, updateQueryParam } from 'utils';

import { IQuizData, IUploadedImage } from '../editor.types';
import Paragraph from '../tools/paragraph/Paragraph.tool';
import { unsplashToolHtml } from './unsplashTool';

type TTool =
  | 'Embed'
  | 'Header'
  | 'ImageTool'
  | 'List'
  | 'Quote'
  | 'Delimiter'
  | 'Alert'
  | 'Unsplash'
  | 'InclineCode'
  | 'Code'
  | 'Table'
  | 'Quiz';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TOOLS: Record<TTool, any> = {
  Embed: undefined,
  List: undefined,
  Table: undefined,
  Delimiter: undefined,
  InclineCode: undefined,
  Alert: undefined,
  Quote: undefined,
  Header: undefined,
  ImageTool: undefined,
  Code: undefined,
  Quiz: undefined,
  Unsplash: undefined,
};

export const getTools = async ({
  onQuizSubmit,
}: {
  onQuizSubmit?: (data: IQuizData) => Promise<void>;
}): Promise<EditorConfig['tools']> => {
  const tools = await Promise.all([
    import('@editorjs/embed'),
    import('../tools/list/List.tool'),
    import('../tools/table'),
    import('../tools/delimiter/Delimiter.tool'),
    import('@juratbek/editorjs-inline-code'),
    import('../tools/alert/Alert.tool'),
    import('../tools/quote/Quote.tool'),
    import('../tools/header/Header.tool'),
    import('@juratbek/editorjs-image'),
    import('@juratbek/editorjs-code'),
    import('@juratbek/editorjs-quiz'),
    import('@samandar.boymurodov/editorjs-inline-image'),
  ]);

  Object.keys(TOOLS).forEach((key, index) => {
    TOOLS[key as TTool] = tools[index].default;
  });

  return {
    header: {
      class: TOOLS.Header,
      shortcut: navigator.platform.startsWith('Mac') ? 'CMD+SHIFT+H' : 'ALT+SHIFT+H',
      config: {
        levels: [1, 2, 3, 4, 5, 6],
        defaultLevel: 1,
      },
    },
    paragraph: {
      class: Paragraph,
      inlineToolbar: true,
    },
    code: TOOLS.Code,
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
                url: imageUrl?.toString() ?? '',
              },
            };
          },
        },
        buttonContent: 'Rasmni tanlang',
      },
    },
    unsplash: {
      class: TOOLS.Unsplash,
      toolbox: {
        title: 'Unsplash',
      },
      config: {
        unsplashInnerHtml: unsplashToolHtml,
        unsplash: {
          appName: 'udas',
          clientId: 'YUiELidZbnKRhMEECKChvST2BMHOfCR6X3mPia5ZdbU',
          updateUrlOnSelect: (url: string): string => {
            return updateQueryParam(url, 'q', '10');
          },
        },
      },
    },
    list: TOOLS.List,
    delimiter: TOOLS.Delimiter,
    alert: {
      class: TOOLS.Alert,
      inlineToolbar: true,
    },
    quiz: {
      class: TOOLS.Quiz,
      config: {
        onSubmit: onQuizSubmit,
      },
    },
    quote: TOOLS.Quote,
    table: {
      class: TOOLS.Table,
      inlineToolbar: true,
    },
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
    inlineCode: {
      class: TOOLS.InclineCode,
      inlineToolbar: true,
    },
  };
};
