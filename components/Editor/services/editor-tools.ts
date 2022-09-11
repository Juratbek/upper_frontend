import { EditorConfig } from '@editorjs/editorjs';

export const getTools = async (): Promise<EditorConfig['tools']> => {
  const Embed = (await import('@editorjs/embed')).default;
  const Header = (await import('@editorjs/header')).default;
  const ImageTool = (await import('@editorjs/image')).default;
  const List = (await import('@editorjs/list')).default;
  const Quote = (await import('@editorjs/quote')).default;
  const Delimeter = (await import('@editorjs/delimiter')).default;
  const Tooltip = (await import('editorjs-tooltip')).default;
  const TextColor = (await import('editorjs-text-color-plugin')).default;
  const Alert = (await import('editorjs-alert')).default;
  const Unsplash = (await import('editorjs-inline-image')).default;
  const InclineCode = (await import('@editorjs/inline-code')).default;
  const CodeFlask = (await import('@calumk/editorjs-codeflask')).default;

  return {
    header: {
      class: Header,
      shortcut: 'CMD+SHIFT+H',
      config: {
        levels: [1, 2, 3, 4, 5, 6],
        defaultLevel: 1,
      },
    },
    alert: Alert,
    quote: Quote,
    delimeter: Delimeter,
    list: List,
    unsplash: {
      class: Unsplash,
      config: {
        unsplash: {
          appName: 'udas',
          clientId: 'YUiELidZbnKRhMEECKChvST2BMHOfCR6X3mPia5ZdbU',
        },
      },
    },
    image: ImageTool,
    code: CodeFlask,
    embed: {
      class: Embed,
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
  };
};
