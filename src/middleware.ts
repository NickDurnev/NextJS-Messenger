import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./app/libs/jwt";
import { errors } from "./helpers/responseVariants";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/conversations")) {
    console.log(1);
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return new NextResponse(
        errors.UNAUTHORIZED.message,
        errors.UNAUTHORIZED.status
      );
    }
    if (authHeader.startsWith("Bearer ")) {
      // Extract the JWT from the Authorization header
      const jwtToken = authHeader.split(" ")[1];

      // if (jwtToken === undefined) {
      //   request.nextUrl.pathname = "/login";
      //   return NextResponse.redirect(request.nextUrl);
      // }

      const verified = await verifyJwt(jwtToken);
      console.log(verified);
      if (!verified) {
        return new NextResponse(
          errors.UNAUTHORIZED.message,
          errors.UNAUTHORIZED.status
        );
      }
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}
