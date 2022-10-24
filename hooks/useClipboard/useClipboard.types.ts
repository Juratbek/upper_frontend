export interface IUseClipboardProps {
  isCopied: boolean;
  isError: boolean;
  isLoading: boolean;
  writeText: (text: string) => Promise<void>;
}
