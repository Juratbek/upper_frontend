import { ITool, TToolType } from 'components/molecules/editor/tools/tool.types';

export interface IItemProps extends ITool {
  type: TToolType;
  onClick: (type: TToolType) => void;
}
