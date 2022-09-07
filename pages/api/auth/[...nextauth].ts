import NextAuth from 'next-auth';
import FacebokProvider from 'next-auth/providers/facebook';
import GiyHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { AUTH_PROVIDERS } from 'variables';

export default NextAuth({
  providers: [
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
  },
});
