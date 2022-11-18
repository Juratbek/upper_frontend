export const nextAuthSignIn = (origin: string, token: string): Promise<Response> =>
  fetch(`${origin}/api/sign-in?token=${token}`);

export const nextAuthSignOut = (origin: string): Promise<Response> =>
  fetch(`${origin}/api/sign-out`);
