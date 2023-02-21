import { ImageProps } from 'next/image';

export interface IStorysetImageProps extends ImageProps {
  storysetUri: string;
}
