import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import verifyEmail from "@/app/actions/verifyEmail";

export default async function PATCH(req: NextApiRequest) {
  const { query } = req;
  const verToken = query.verifyToken as string;
  const id = query.id as string;

  console.log(verToken);

  if (!verToken || !id) {
    return NextResponse.json("Missing required parameters", { status: 400 });
  }

  try {
    const updatedUser = await verifyEmail(verToken, id);
    if (updatedUser) {
      return NextResponse.json("Email verified successfully");
    } else {
      return NextResponse.json("Failed to verify email", { status: 400 });
    }
  } catch (error) {
    console.error("Verify Email Error:", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
