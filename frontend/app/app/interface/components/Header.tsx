import * as React from "react";
import Box from "@mui/material/Box";

import Avatar from "@mui/material/Avatar";
import styles from "../styles.module.css";

export default function Header() {
  return (
    <Box
      sx={{ m: 2, display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Avatar
        alt="Logo"
        // src="/next.svg"
        // variant="square"
        className={styles.logo}
        sx={{ float: "left", mr: 3 }}
      >
        U
      </Avatar>
      <h4>UISZT 2024</h4>
    </Box>
  );
}
