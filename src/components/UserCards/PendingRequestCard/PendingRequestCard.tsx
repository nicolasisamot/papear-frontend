import React from "react";
import styles from "./PendingRequestCard.module.scss";
import { IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";

interface PendingRequestCardProps {
  request: {
    id: string;
    status: string;
    createdAt: Date;
    sender: {
      id: string;
      username: string;
      avatarUrl: string | null;
    };
  };
}

export default function PendingRequestCard({
  request,
}: PendingRequestCardProps) {
  const {
    id,
    status,
    createdAt,
    sender: { username, avatarUrl },
  } = request;
  return (
    <div className={styles.card}>
      <div className={styles.avatarAndUsername}>
        <img
          className={styles.avatar}
          src={avatarUrl || "./assets/images/avatar.jpg"}
          alt={username}
        />
        <span className={styles.username}>{username}</span>
      </div>

      <div className={styles.actions}>
        <IconButton sx={{ color: "green" }}>
          <CheckIcon />
        </IconButton>
        <IconButton sx={{ color: "red" }}>
          <CloseSharpIcon />
        </IconButton>
      </div>
    </div>
  );
}
