import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'seu@email.com' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {}
        if (email === 'teste@email.com' && password === '123456') {
          return { id: '1', name: 'Tester', email }
        }

        return null
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    },
    async session({ session, token }) {
      session.user = token.user as any
      return session
    },
  },
})

export { handler as GET, handler as POST }
