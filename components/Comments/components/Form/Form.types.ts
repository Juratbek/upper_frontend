import { IInfiniteScrollV2 } from 'hooks';
import React from 'react';
import { IComment, TSubmitFormEvent } from 'types';

export interface IFormProps {
  className?: string;
  onSubmit?: (event: TSubmitFormEvent) => void;
  selectedComment?: IComment;
  isBeingEdited?: boolean;
  api: IInfiniteScrollV2<IComment>;
  focusHandler: React.FocusEventHandler<HTMLTextAreaElement>;
}
