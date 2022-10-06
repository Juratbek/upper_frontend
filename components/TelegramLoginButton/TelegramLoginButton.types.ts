import { IBlogRegisterResponse } from 'store/apis/blog/blog.types';

type TButtonSize = 'large' | 'medium' | 'small';

export interface ITelegramLoginButtonProps {
  botName: string;
  shouldUsePic?: boolean;
  className?: string;
  cornerRadius?: number;
  shouldRequestAccess?: boolean;
  onAuth?: (user: IBlogRegisterResponse) => void;
  buttonSize?: TButtonSize;
  isLoading?: boolean;
}
