import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token) return true;
        return false;
      },
    },
    pages: {
      // signIn: "/auth/login",
      signIn: "/",
      signOut: "/"
    },
  }
);

export const config = { matcher: ["/admin", "/admin/:path*"] };
// export const config = { matcher: ["/admin"] };
