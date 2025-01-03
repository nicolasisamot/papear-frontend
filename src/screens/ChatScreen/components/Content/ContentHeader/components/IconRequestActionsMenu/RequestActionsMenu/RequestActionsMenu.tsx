import React, { useState, useContext, useEffect } from "react";
import styles from "./RequestActionsMenu.module.scss";
import PendingRequestCard from "../../../../../../../../components/UserCards/PendingRequestCard/PendingRequestCard.tsx";
import { ChatContext } from "../../../../../../../../contexts/ChatContext.tsx";

export default function RequestActionsMenu() {
  const { friendRequests } = useContext(ChatContext);

  return (
    <div className={styles.menu}>
      {friendRequests.map((request) => (
        <PendingRequestCard key={request.id} request={request} />
      ))}
    </div>
  );
}
