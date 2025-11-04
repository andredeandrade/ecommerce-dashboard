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
        // Exemplo simples: autenticação manual
        const { email, password } = credentials ?? {}

        // Aqui tu colocaria a chamada real à tua API / banco de dados
        if (email === 'teste@email.com' && password === '123456') {
          return { id: '1', name: 'Andrezinho', email }
        }

        // Se falhar, retorna null
        return null
      },
    }),
  ],

  session: {
    strategy: 'jwt', // mais comum para apps modernos
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
