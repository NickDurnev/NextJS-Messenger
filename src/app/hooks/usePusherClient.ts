import { create } from "zustand";
import Pusher from "pusher-js";

interface PusherClientStore {
  pusherClient: Pusher | null;
  setPusherClient: (pusherClient: Pusher) => void;
}

const usePusherClient = create<PusherClientStore>((set) => ({
  pusherClient: null,
  setPusherClient: (instance) => set({ pusherClient: instance }),
}));

export default usePusherClient;
