import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
import { errors } from "@/helpers/responseVariants";
import { UserSelector } from "@/app/libs/prismaSelectors";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse(
        errors.UNAUTHORIZED.message,
        errors.UNAUTHORIZED.status
      );
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse(
        errors.INVALID_DATA.message,
        errors.INVALID_DATA.status
      );
    }

    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: {
            ...UserSelector,
          },
        },
      });
      await Promise.all(
        newConversation.users.map(async (user) => {
          if (user.email) {
            await pusherServer.trigger(
              user.email,
              "conversation:new",
              newConversation
            );
          }
        })
      );

      return NextResponse.json(newConversation);
    }

    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            { id: userId },
          ],
        },
      },
      include: {
        users: {
          ...UserSelector,
        },
      },
    });

    await Promise.all(
      newConversation.users.map(async (user) => {
        if (user.email) {
          await pusherServer.trigger(
            user.email,
            "conversation:new",
            newConversation
          );
        }
      })
    );

    return NextResponse.json(newConversation);
  } catch (error: any) {
    return new NextResponse(
      error.INTERNAL_ERROR.message,
      error.INTERNAL_ERROR.status
    );
  }
}
