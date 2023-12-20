import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  withAuth({
    pages: {
      signIn: "/auth",
    },
  });
}

export const config = {
  matcher: ["/conversations/:path*", "/users/:path*"],
};
