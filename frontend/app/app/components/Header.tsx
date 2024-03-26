import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// import Avatar from "@mui/material/Avatar";
// import styles from "../globals.css";

export default function Header() {
  return (
    <Box
      sx={{
        m: 0,
        p: 1,
        pl: 2,
        height: "40px",
        backgroundColor: "#565656",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
        CausaDisco
      </Typography>
    </Box>
  );
}
