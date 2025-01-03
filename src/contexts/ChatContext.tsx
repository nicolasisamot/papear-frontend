import { createContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

interface FriendRequestInterface {
  id: string;
  status: string;
  createdAt: Date;
  sender: {
    id: string;
    username: string;
    avatarUrl: string | null;
  };
}

export const ChatContext = createContext<any>(null);
ChatContext.displayName = "Chat";
/*
interface AuthContextType {
  token: string | null;
  user: UserInterface | null;
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
  login: (token: string) => void;
  logout: () => void;
}*/
interface ChatContextProviderProps {
  children: ReactNode;
}

export default function ChatContextProvider({
  children,
}: ChatContextProviderProps) {
  const [friendRequests, setFriendRequests] = useState<
    FriendRequestInterface[]
  >([]);

  return (
    <ChatContext.Provider value={{ friendRequests, setFriendRequests }}>
      {children}
    </ChatContext.Provider>
  );
}
