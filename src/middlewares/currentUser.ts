import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { MiddlewareFactory } from "./types";
// function getSearchParam(param: string, url: any) {
//   return url.searchParams.get(param);
// }

const currentUser: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;

    // if (["/profile"]?.some((path) => pathname.startsWith(path))) {
    //   const userId = request.cookies.get("userId");
    //   if (!userId) {
    //     const url = new URL(`/auth/login`, request.url);
    //     return NextResponse.redirect(url);
    //   }
    // }
    // Add the API paths you want to include in this middleware
    console.log("CURRENT_USER_MIDDLEWARE", pathname);
    const apiPaths = ["api/conversations/:path*", "api/users/:path*"];
    if (apiPaths.some((pattern) => pathname.match(pattern))) {
      // Your logic to check the current user
      const currentUser = await getCurrentUser();
      console.log("currentUser", currentUser);

      if (!currentUser?.id || !currentUser?.email) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
      return next(request, _next);
    }
  };
};

export default currentUser;
