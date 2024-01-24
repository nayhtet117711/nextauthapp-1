import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session }) {
      try {
        // Send properties to the client, like an access_token from a provider.
        const result = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${session.user?.email}`).then(res => res.json() as unknown as { payload: { id?: number, is_admin?: boolean | null } })
        session.user = { ...session.user, ...result.payload }
        return session
      } catch(error) {
        console.log("error: ", error)
        return session
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }