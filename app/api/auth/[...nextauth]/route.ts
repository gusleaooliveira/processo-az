import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { axiosInstance } from '../../../../services/api';

export const authOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const res = await axiosInstance.post('/proof/session', {
            email: credentials?.email,
            password: credentials?.password,
          });

          return {
            id: res.data.id,
            email: res.data.email,
            name: res.data.profile.name,
            token: res.data.token,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
