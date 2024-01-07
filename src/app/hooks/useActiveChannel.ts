import { useEffect, useState } from "react";
import { Channel, Members } from "pusher-js";
import PusherClient from "pusher-js";
import useActiveList from "./useActiveList";
import { axiosAuth } from "../libs/axios";

const useActiveChannel = (pusherClient: PusherClient | null) => {
  const { set, add, remove } = useActiveList();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChannel;

    if (!pusherClient) {
      return;
    }

    if (!channel) {
      channel = pusherClient.subscribe("presence-messenger");
      setActiveChannel(channel);
    }

    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      const initialMembers: string[] = [];

      members.each((member: Record<string, any>) =>
        initialMembers.push(member.id)
      );
      set(initialMembers);
    });

    channel.bind("pusher:member_added", (member: Record<string, any>) => {
      add(member.id);
    });

    channel.bind("pusher:member_removed", (member: Record<string, any>) => {
      remove(member.id);
    });

    return () => {
      if (activeChannel) {
        pusherClient?.unsubscribe("presence-messenger");
        return setActiveChannel(null);
      }
      const currentDate = new Date();
      axiosAuth
        .patch("/user", { wasOnlineAt: currentDate })
        .catch((error) => console.log(error));
    };
  }, [activeChannel, set, add, remove, pusherClient]);
};

export default useActiveChannel;
