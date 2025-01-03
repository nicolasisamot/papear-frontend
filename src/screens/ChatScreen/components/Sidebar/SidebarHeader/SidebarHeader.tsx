import React, { useState } from "react";
import styles from "./SidebarHeader.module.scss";
import Menu from "./components/Menu.tsx";
import TextField from "@mui/material/TextField";

import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
export default function SidebarHeader() {
  const [focused, setFocused] = useState(false);
  return (
    <div className={styles.sidebarHeader}>
      <Menu />
      <TextField
        hiddenLabel
        id="search-field"
        variant="outlined"
        size="small"
        fullWidth
        defaultValue=""
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        InputProps={{
          startAdornment: !focused && (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
