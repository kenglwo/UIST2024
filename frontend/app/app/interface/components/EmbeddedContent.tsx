import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import TextNFT from "./TextNFT";

import styles from "../styles.module.css";

interface Props {
  textName: string;
}

export default function EmbeddedContent(props: Props) {
  const [text, setText] = useState<string>("");
  const [navigationItems, setNavigationItem] = useState<string[]>([
    "Introduction",
    "Related Works",
    "Method",
    "Evaluation",
    "Discussions",
    "Contributions",
  ]);

  useEffect(() => {
    if (props.textName === "NFT") {
    }
  }, [props]);

  return (
    <Box
      sx={{
        m: 3,
        p: 3,
        backgroundColor: "white",
        borderRadius: "16px",
        maxHeight: "50vh",
        overflowY: "auto",
      }}
    >
      <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          alt="Embedded Content Sharp"
          src="/images/embedded_content.png"
          variant="square"
          sx={{ mr: 2 }}
        />
        <Typography variant="h5">Embedded Content</Typography>
      </Stack>
      <Divider sx={{ mt: 1, mb: 2, borderColor: "black", borderWidth: 1 }} />
      <Stack direction="row">
        <Stack >
          <Typography variant="h6">Navigation</Typography>
          {navigationItems.map((d, i) => (
            <Button
              key={i}
              variant={d === "Method" ? "contained" : "outlined"}
              sx={{ mt: 1 }}
            >
              {d}
            </Button>
          ))}
        </Stack>
        <Box sx={{ ml: 3 }}>
          <TextNFT />
        </Box>
      </Stack>
    </Box>
  );
}
