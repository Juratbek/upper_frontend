import { IEditorContext } from '../../context';
import { IBlockNode } from '../../instance/Editor.types';
import { IToolbarSetting } from '../tool.types';
import { IAlertData, TAlertType } from './Alert.types';

export const AlertTypes = ['info', 'success', 'warning', 'dark', 'danger'] as const;

const AlertColors: Record<TAlertType, { path: string; color: string }> = {
  danger: {
    path: '#FF0000',
    color: 'white',
  },
  dark: {
    path: '#161B1D',
    color: 'white',
  },
  info: {
    path: '#007AFF',
    color: 'white',
  },
  success: {
    path: '#4BE732',
    color: 'black',
  },
  warning: {
    path: '#FBD614',
    color: 'black',
  },
};

export const Warning = (type: TAlertType) => {
  const { color, path } = AlertColors[type] ?? AlertColors.info;

  return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9.86674 5.25C10.8149 3.58333 13.1851 3.58333 14.1333 5.25L22.6663 20.25C23.6144 21.9167 22.4293 24 20.533 24H3.46695C1.57072 24 0.385575 21.9167 1.33369 20.25L9.86674 5.25Z" fill=${path} />
            <rect x="11" y="8" width="2" height="10" fill=${color} />
            <rect width="2" height="2" transform="matrix(1 0 0 -1 11 22)" fill=${color} />
          </svg>`;
};

function changeAlertType(type: TAlertType) {
  return ({ hoveredBlock, setBlock }: IEditorContext) => {
    if (!hoveredBlock) return;
    const { id, data } = hoveredBlock as IBlockNode<IAlertData>;
    setBlock<IAlertData>({ id, type: hoveredBlock.type, data: { ...data, type } });
  };
}

export const AlertSettings: IToolbarSetting[] = [
  {
    icon: Warning('danger'),
    text: 'Qizil',
    onClick: changeAlertType('danger'),
  },
  {
    icon: Warning('info'),
    text: "Ko'k",
    onClick: changeAlertType('info'),
  },
  {
    icon: Warning('warning'),
    text: 'Sariq',
    onClick: changeAlertType('warning'),
  },
  {
    icon: Warning('success'),
    text: 'Zangor',
    onClick: changeAlertType('success'),
  },
  {
    icon: Warning('dark'),
    text: 'Kulrang',
    onClick: changeAlertType('dark'),
  },
];
