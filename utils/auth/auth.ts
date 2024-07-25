import { REFRESH_TOKEN, TOKEN } from 'constants/auth';
import { ITokens } from 'hooks/useAuth';

export const setLocalStorageTokens = (tokens: ITokens): void => {
  localStorage.setItem(TOKEN, tokens.token);
  localStorage.setItem(REFRESH_TOKEN, tokens.refreshToken);
};

export const removeLocalStorageTokens = (): void => {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};
