import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ token }) => {
      if (token) return true;
      return false;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
});

export const config = { matcher: ["/admin", "/admin/:path*"] };
// export const config = { matcher: ["/admin"] };
