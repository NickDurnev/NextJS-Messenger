import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { UserSelector } from "../libs/prismaSelectors";

const getConversations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: {
              ...UserSelector,
            },
            sender: {
              ...UserSelector,
            },
          },
        },
      },
    });

    return conversations;
  } catch (error: any) {
    return [];
  }
};

export default getConversations;
