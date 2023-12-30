import { withAuth } from "next-auth/middleware";

withAuth({
  pages: {
    signIn: "/auth",
  },
});

export const config = {
  matcher: ["/conversations/:path*", "/users/:path*"],
};
