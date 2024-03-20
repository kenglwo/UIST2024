import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import TextNFT2 from "./TextNFT2";

import styles from "../styles.module.css";

interface Props {
  textName: string;
}

export default function EmbeddedContent(props: Props) {
  const [text, setText] = useState<string>("");
  const [navigationItems, setNavigationItem] = useState<string[]>([
    "Title",
    "What does NFT stand for?",
    "What is an NFT?",
    "Why are NFTs so expensive?",
    "Why do people buy NFTs?",
    "Key takeaways",
  ]);

  useEffect(() => {
    if (props.textName === "NFT") {
    }
  }, [props]);

  return (
    <Box className={styles.interface_component}>
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
        <Stack>
          <Typography variant="h6">Navigation</Typography>
          {navigationItems.map((d, i) => (
            <Button
              key={i}
              variant={d === "Method" ? "contained" : "outlined"}
              sx={{ mt: 1 }}
              onClick={() => {
                const element = document.getElementById(`content_sec${i}`);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {d}
            </Button>
          ))}
        </Stack>
        <Box
          sx={{
            width: "10px",
            marginLeft: "10px",
            backgroundColor: "darkgray",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              paddingTop: "50px",
              paddingBottom: "50px",
              backgroundColor: "lightgray",
            }}
          >&lt;</Box>
        </Box>
        <Box sx={{ ml: 3 }}>
          <TextNFT2 />
        </Box>
      </Stack>
    </Box>
  );
}
