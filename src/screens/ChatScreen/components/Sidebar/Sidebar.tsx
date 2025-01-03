import React from "react";
import styles from "./Sidebar.module.scss";
import SidebarHeader from "./SidebarHeader/SidebarHeader.tsx";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <SidebarHeader />
    </div>
  );
}
