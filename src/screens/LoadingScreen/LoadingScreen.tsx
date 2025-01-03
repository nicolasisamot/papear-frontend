import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import styles from "./LoadingScreen.module.scss";

export default function LoadingScreen() {
  return (
    <div className={styles.loading}>
      <LinearProgress />
    </div>
  );
}
