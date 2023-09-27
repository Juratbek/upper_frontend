export const nextAuthSignIn = (origin: string, token: string): Promise<Response> => {
  if (!origin || !token) return Promise.reject('Token or origin is not provided');
  return fetch(`${origin}/api/sign-in?token=${token}`);
};

export const nextAuthSignOut = (origin: string): Promise<Response> =>
  fetch(`${origin}/api/sign-out`);
