import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { pusherServer } from "@/app/libs/pusher";
import { errors } from "@/helpers/responseVariants";

interface IParams {
  conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse(
        errors.UNAUTHORIZED.message,
        errors.UNAUTHORIZED.status
      );
    }

    //Find conversation
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: {
              select: {
                id: true,
                name: true,
                image: true,
                email: true,
              },
            },
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse(
        errors.INVALID_ID.message,
        errors.INVALID_ID.status
      );
    }

    //Find not seen messages
    const notSeenMessages = conversation.messages.filter(
      ({ seen }) => seen.length === 1
    );

    if (!notSeenMessages) {
      return NextResponse.json(conversation);
    }

    //Update seen of messages
    const updatedMessages = await Promise.all(
      notSeenMessages.map(async (message) => {
        const updatedMessage = await prisma.message.update({
          where: {
            id: message.id,
          },
          include: {
            seen: {
              select: {
                id: true,
                name: true,
                image: true,
                email: true,
              },
            },
          },
          data: {
            seen: {
              connect: {
                id: currentUser.id,
              },
            },
          },
        });

        await pusherServer.trigger(
          conversationId!,
          "message:update",
          updatedMessage
        );

        return updatedMessage;
      })
    );

    return NextResponse.json(updatedMessages);
  } catch (error: any) {
    console.log(error, "ERROR_MESSAGES_SEEN");
    return new NextResponse(
      errors.INTERNAL_ERROR.message,
      errors.INTERNAL_ERROR.status
    );
  }
}
