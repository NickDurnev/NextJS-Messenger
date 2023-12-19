import { withAuth } from "next-auth/middleware";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log(1111111);
  withAuth({
    pages: {
      signIn: "/auth",
    },
  });

  if (request.nextUrl.pathname.startsWith("/api")) {
    console.log("API-MIDDLEWARE");

    const currentUser = await getCurrentUser();
    console.log("currentUser", currentUser);

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  }
}

export const config = {
  matcher: [
    "/api/messages/:path*",
    "/api/users/:path*",
    "/conversations/:path*",
    "/users/:path*",
  ],
};
