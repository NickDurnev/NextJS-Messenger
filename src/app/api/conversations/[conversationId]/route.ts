import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { pusherServer } from "@/app/libs/pusher";
import { UserSelector } from "@/app/libs/prismaSelectors";
import { errors } from "@/helpers/responseVariants";

interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse(
        errors.UNAUTHORIZED.message,
        errors.UNAUTHORIZED.status
      );
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: {
          ...UserSelector,
        },
      },
    });

    if (!existingConversation) {
      return new NextResponse(
        errors.INVALID_ID.message,
        errors.INVALID_ID.status
      );
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    await Promise.all(
      existingConversation.users.map(async (user) => {
        if (user.email) {
          await pusherServer.trigger(
            user.email,
            "conversation:remove",
            existingConversation
          );
        }
      })
    );

    return NextResponse.json(deletedConversation);
  } catch (error) {
    console.log(error, "ERROR_COMVERSATION_DELETE");
    return new NextResponse(
      errors.INTERNAL_ERROR.message,
      errors.INTERNAL_ERROR.status
    );
  }
}
