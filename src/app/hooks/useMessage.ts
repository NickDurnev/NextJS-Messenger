import { create } from "zustand";
import { FullMessageType } from "../types";
interface MessageStore {
  selectedMessage: FullMessageType | null;
  setSelectedMessage: (selectedMessage: FullMessageType | null) => void;
}

const useMessage = create<MessageStore>((setSelectedMessage) => ({
  selectedMessage: null,
  setSelectedMessage: (selectedMessage) =>
    setSelectedMessage({ selectedMessage }),
}));

export default useMessage;
