import prisma from "@/app/libs/prismadb";
import { UserSelector } from "../libs/prismaSelectors";

const getMessages = async (conversationId: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        seen: {
          ...UserSelector,
        },
        sender: {
          ...UserSelector,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch (error: any) {
    return [];
  }
};

export default getMessages;
