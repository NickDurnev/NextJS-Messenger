import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/route";

const getSession = async () => {
  console.log(authOptions);
  return await getServerSession(authOptions);
};

export default getSession;
