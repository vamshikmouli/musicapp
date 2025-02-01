import { Prisma, User } from '@prisma/client';
import NextAuth from 'next-auth';
import { prisma } from './lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import { saltAndHashPassword } from './utils/helper';
import bcrypt from 'bcryptjs';

const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' as const },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const email = credentials.email as string;
        const hash = saltAndHashPassword(credentials.password);

        let user: any = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          throw new Error('No user found with this email');
        }
        if (!user.hashPassword) {
          throw new Error('User has no hashed password');
        }
        const isMatch = bcrypt.compareSync(
          credentials.password as string,
          user.hashPassword
        );
        if (!isMatch) {
          throw new Error('Incorrect password');
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async session({
      session,
      token,
    }: {
      session: any;
      token: any;
    }): Promise<any> {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
    error: '/auth/error',
  },
};

const { handlers, signIn, signOut, auth } = NextAuth(authOptions);

export { handlers, signIn, signOut, auth };
