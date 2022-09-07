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
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        return {
          username: 'juratbek123',
          password: 'password123',
          token: 'token123',
        };
      },
    }),
    FacebokProvider({
      clientId: '1002246197103951',
      clientSecret: '975d99337efaee92dcdf3dd02280f123',
    }),
    GiyHubProvider({
      clientId: 'aee8949321e01c883496',
      clientSecret: 'cc7ffbd775fe38f50fefa3408197c760fb21b80a',
    }),
    GoogleProvider({
      clientId: '578132262483-mp1bv5i0pp46fmh0d8hvi0qe7t29g9p0.apps.googleusercontent.com',
      clientSecret: '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',
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
      return Promise.resolve(token);
    },
  },
});
