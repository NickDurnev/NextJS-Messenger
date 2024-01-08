import { Conversation, Message, User } from "@prisma/client";

export type PartialUser = Pick<
  User,
  "id" | "name" | "email" | "image" | "wasOnlineAt" | "createdAt"
>;

export type FullMessageType = Message & {
  sender: PartialUser;
  seen: PartialUser[];
};

export type FullConversationType = Conversation & {
  users: PartialUser[];
  messages: FullMessageType[];
};
