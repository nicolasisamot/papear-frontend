import React from "react";
import styles from "./Content.module.scss";
import ContentHeader from "./ContentHeader/ContentHeader.tsx";
export default function Content() {
  return (
    <div className={styles.content}>
      <ContentHeader />
    </div>
  );
}
