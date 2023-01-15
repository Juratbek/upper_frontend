import { ITutorialSection } from 'types';

export interface IAddSectionByTargetPayloadAction {
  targetSection: ITutorialSection;
  newSection: ITutorialSection;
}
