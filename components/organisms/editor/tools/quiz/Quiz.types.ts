export interface IVariant {
  value: number;
  text: string;
}

export interface IQuizData {
  type: 'singleSelect' | 'multiSelect';
  question: string;
  answers: number[];
  variants: IVariant[];
}
