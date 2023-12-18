import currentUser from "@/middlewares/currentUser";
import { stackMiddlewares } from "@/middlewares/stackHandler";

import { withAuth } from "next-auth/middleware";

withAuth({
  pages: {
    signIn: "/auth",
  },
});

export const config = {
  matcher: ["/conversations/:path*", "/users/:path*"],
};

const middlewares = [currentUser];
export default stackMiddlewares(middlewares);
