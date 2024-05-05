import { ITokens } from 'hooks/useAuth';
import { REFRESH_TOKEN, TOKEN } from 'variables';

export const setLocalStorageTokens = (tokens: ITokens): void => {
  localStorage.setItem(TOKEN, tokens.token);
  localStorage.setItem(REFRESH_TOKEN, tokens.refreshToken);
};

export const removeLocalStorageTokens = (): void => {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};
