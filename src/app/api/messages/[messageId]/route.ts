import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { pusherServer } from "@/app/libs/pusher";
import getMessages from "@/app/actions/getMessages";

interface IParams {
  messageId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { messageId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingMessage = await prisma.message.findUnique({
      where: {
        id: messageId,
      },
    });

    if (!existingMessage) {
      return new NextResponse("Invalid ID", { status: 400 });
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

    console.log("DELETED", deletedMessage);

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

    if (isLastMessage) {
      const messages = await getMessages(existingConversation.id);
      const lastMessage = messages[messages.length - 1];
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
  } catch (error) {
    console.log(error, "ERROR_MESSAGE_DELETE");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
