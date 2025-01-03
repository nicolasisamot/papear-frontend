import React from "react";
import styles from "./ContentHeader.module.scss";
import IconAddUserMenu from "./components/IconAddUserMenu/IconAddUserMenu.tsx";
import IconRequestActionsMenu from "./components/IconRequestActionsMenu/IconRequestActionsMenu.tsx";
export default function ContentHeader() {
  return (
    <div className={styles.contentHeader}>
      <IconAddUserMenu />
      <IconRequestActionsMenu />
    </div>
  );
}
