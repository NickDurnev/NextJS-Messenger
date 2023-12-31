import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./app/libs/jwt";
import { errors } from "./helpers/responseVariants";

const pathList = ["/api/conversations", "/api/user", "/api/messages"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathList.some((path) => pathname.startsWith(path))) {
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

      const verified = await verifyJwt(jwtToken);
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
