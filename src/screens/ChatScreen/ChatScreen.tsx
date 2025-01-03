import React, { useEffect } from "react";
import styles from "./ChatScreen.module.scss";
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import Content from "./components/Content/Content.tsx";
import UserServices from "../../api/UserServices.tsx";
import LoadingScreen from "../LoadingScreen/LoadingScreen.tsx";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.tsx";
import { ChatContext } from "../../contexts/ChatContext.tsx";
import {
  connectSocket,
  handleEventResponse,
  cancelEventResponse,
} from "../../socket.tsx";

export default function ChatScreen() {
  const [loading, setLoading] = useState(true);

  const { token, setUser, socketIsConnected, setSocketIsConnected } =
    useContext(AuthContext);
  const { friendRequests, setFriendRequests } = useContext(ChatContext);

  useEffect(() => {
    if (socketIsConnected) {
      handleEventResponse("receiveFriendRequest", (newFriendRequest) => {
        setFriendRequests((prev) => [...prev, newFriendRequest]);
      });
    }
    return () => {
      cancelEventResponse("receiveFriendRequest");
    };
  }, [socketIsConnected]);

  async function fetchUserData() {
    try {
      const response = await UserServices.getUserData(token);

      if (response.status === 200) {
        setUser(response.data.data.user);
        setFriendRequests(response.data.data.friendRequests);
        connectSocket(token)
          .then(() => {
            setSocketIsConnected(true);
            setLoading(false);
          })
          .catch(() => {});
      }
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      //setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className={styles.container}>
          <Sidebar />
          <Content />
        </div>
      )}
    </>
  );
}
