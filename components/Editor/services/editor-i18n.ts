import { I18nConfig } from '@editorjs/editorjs';

const imageSettings = {
  'With border': 'Chegara bilan',
  'Stretch image': "Rasimni cho'zish",
  'With background': 'Orqa fon bilan',
};

export const i18n: I18nConfig = {
  messages: {
    ui: {
      popover: {
        'Nothing found': 'Blok topilmadi.',
      },
    },
    toolNames: {
      Heading: 'Sarlavha',
      Text: 'Yozuv',
      Alert: 'Ogohlantiruvchi',
      Quote: 'Iqtibos',
      Delimiter: 'Ajratuvchi',
      List: "Ro'yxat",
      Image: 'Rasm',
      Code: 'Kod',
      Table: 'Jadval',
      Quiz: 'Test',
    },
    blockTunes: {
      delete: {
        Delete: "O'chirish",
        'Click to delete': "O'chirishni tasdiqlang",
      },
      moveUp: {
        'Move up': 'Yuqoriga surish',
      },
      moveDown: {
        'Move down': 'Pastga surish',
      },
    },
    tools: {
      image: imageSettings,
      unsplash: imageSettings,
    },
  },
};
