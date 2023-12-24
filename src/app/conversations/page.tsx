"use client";

import clsx from "clsx";

import { useRouter } from "next/navigation";
import useConversation from "../hooks/useConversation";
import EmptyState from "../components/EmptyState";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect } from "react";

const Home = () => {
  const { isOpen } = useConversation();
  const router = useRouter();
  const [conversationId] = useLocalStorage("conversationId");

  useEffect(() => {
    if (conversationId) {
      router.push(`/conversations/${conversationId}`);
    }
  }, [conversationId, router]);

  return (
    <div
      className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};

export default Home;
