import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebokProvider from 'next-auth/providers/facebook';
import GiyHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { AUTH_PROVIDERS } from 'variables';

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        name: { label: 'Name', type: 'text' },
        bio: { label: 'Bio', type: 'text' },
        login: { label: 'Login', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        return credentials || null;
      },
    }),
    FacebokProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECTET || '',
    }),
    GiyHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      const provider = account.provider;
      const providerUtil = AUTH_PROVIDERS[provider];
      return providerUtil(profile);
    },
    async jwt({ token, user }) {
      if (user) {
        token.value = user.token;
      }
      return token;
    },
    async session(params) {
      const { session, user, token } = params;
      if (user) session.user = user;
      session.token = token.value;
      return session;
    },
  },
  secret: 'we do not need this',
});
