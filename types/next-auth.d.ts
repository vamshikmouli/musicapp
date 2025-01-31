import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      role?: string; // Add role here
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role?: string; // Extend User type with role
  }

  interface JWT {
    id: string;
    email: string;
    role?: string; // Add role to JWT
  }
}
