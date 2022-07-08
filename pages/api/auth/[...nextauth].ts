import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google"
// import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
import TwitterProvider from "next-auth/providers/twitter"
// import Auth0Provider from "next-auth/providers/auth0"
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

import OktaProvider from "next-auth/providers/okta";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    OktaProvider({
      clientId: process.env.OKTA_CLIENT_ID || '',
      clientSecret: process.env.OKTA_CLIENT_SECRET || '',
      issuer: process.env.OKTA_ISSUER,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      version: "2.0",
    }), 
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    /* GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    */
    /* 
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }), */
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },
})
