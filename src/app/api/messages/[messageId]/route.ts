import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getMessages from "@/app/actions/getMessages";
import { errors } from "@/helpers/responseVariants";

interface IParams {
  messageId?: string;
}

async function handler(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse(
        errors.UNAUTHORIZED.message,
        errors.UNAUTHORIZED.status
      );
    }

    switch (request.method) {
      case "DELETE":
        await DELETE(request, { params });
        break;
      case "PATCH":
        await PATCH(request, { params });
        break;
    }
  } catch (error) {
    console.log(error, "ERROR_MESSAGE_DELETE");
    return new NextResponse(
      errors.INTERNAL_ERROR.message,
      errors.INTERNAL_ERROR.status
    );
  }
}

async function DELETE(request: Request, { params }: { params: IParams }) {
  console.log(params);
  const { messageId } = params;

  const existingMessage = await prisma.message.findUnique({
    where: {
      id: messageId,
    },
  });

  if (!existingMessage) {
    return new NextResponse(
      errors.INVALID_ID.message,
      errors.INVALID_ID.status
    );
  }

  const existingConversation = await prisma.conversation.findUnique({
    where: {
      id: existingMessage.conversationId!,
    },
    include: {
      users: true,
    },
  });

  const deletedMessage = await prisma.message.delete({
    where: {
      id: messageId,
    },
  });

  if (!existingConversation) {
    return new NextResponse("Conversation not found", { status: 404 });
  }

  await pusherServer.trigger(
    existingConversation.id,
    "message:delete",
    deletedMessage
  );

  const date1 = new Date(existingConversation.lastMessageAt);
  const date2 = new Date(deletedMessage.createdAt);
  const time1 = date1.getHours() + date1.getMinutes() + date1.getSeconds();
  const time2 = date2.getHours() + date2.getMinutes() + date2.getSeconds();

  const isLastMessage = Math.abs(time1 - time2) <= 1;
  //TODO isLastMessage doesn't work correctly

  console.log("IS LAST MESSAGE", isLastMessage);

  if (isLastMessage) {
    const messages = await getMessages(existingConversation.id);
    const lastMessage = messages[messages.length - 1];
    console.log("LAST MESSAGE", lastMessage);
    console.log("DELETED MESSAGE", deletedMessage);
    await prisma.conversation.update({
      where: {
        id: existingConversation.id,
      },
      data: {
        lastMessageAt: lastMessage.createdAt,
      },
    });
    existingConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:deleteMessage", {
          id: existingConversation.id,
          messages: [lastMessage],
        });
      }
    });
  }

  return NextResponse.json(deletedMessage);
}

async function PATCH(request: Request, { params }: { params: IParams }) {
  const body = await request.json();
  const { message, image, conversationId } = body;

  const { messageId } = params;

  return NextResponse.json({ message: "PATCH request processed successfully" });
}

export { handler as PATCH, handler as DELETE };
