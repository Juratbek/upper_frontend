export interface IUseNextAuthProps {
  signIn: (token: string) => Promise<Response>;
  signOut: () => Promise<Response>;
}
