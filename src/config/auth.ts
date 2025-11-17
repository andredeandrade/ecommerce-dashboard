import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthConfig, Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      authorize: async (credentials) => {
        const userDB = {
          id: '1',
          name: 'Dev Teste',
          email: 'teste@email.com',
          password: '123456',
        }

        if (
          credentials?.email === userDB.email &&
          credentials?.password === userDB.password
        ) {
          return {
            id: userDB.id,
            name: userDB.name,
            email: userDB.email,
          } as User
        }

        return null
      },
    }),
  ],

  session: { strategy: 'jwt' },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
      }
      return token
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
      }
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
