import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { writeClient } from "./sanity/lib/write-client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user: { name, email, image }, profile }) {
      if (!profile?.id) return false

      const githubId = `github-${profile.id}`

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: githubId })

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          _id: githubId,
          name,
          username: profile.login,
          email,
          image,
          bio: profile.bio || "",
        })
      }

      return true
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        const githubId = `github-${profile.id}`
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: githubId })

        token.id = user?._id
      }
      return token
    },

    async session({ session, token }) {
      return {
        ...session,
        id: token.id,
      }
    },
  },
})
