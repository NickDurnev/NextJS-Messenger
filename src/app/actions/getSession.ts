import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

import { authOptions } from "../api/auth/[...nextauth]/route";

const getSession = async (request: Request) => {
  if (request) {
    console.log("REQ HEQDERS", request.headers);
  }
  console.log("COOKIE", cookies().get("__Secure-next-auth.session-token"));
  return await getServerSession(authOptions);
};

export default getSession;
