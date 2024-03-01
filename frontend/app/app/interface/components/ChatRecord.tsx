import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { UserInfo, ConversationData } from "../types";

import styles from "../styles.module.css";

interface Props {
  userInfo: UserInfo | null;
}

export default function ChatRecord(props: Props) {
  const [userInputPrompt, setUserInputPrompt] = useState<string>("");

  const onChangeTextField = (inputText: string) => {
    setUserInputPrompt(inputText);
  };

  const onSubmit = () => {
    // TODO: sent userInputPrompt to ChatGPT
  };

  return (
    <Box sx={{ m: 3 }}>
      <Box className={styles.border_solid}>Chat record here</Box>
      <Box
        sx={{
          m: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Type here"
          variant="outlined"
          minRows={6}
          onChange={(e) => onChangeTextField(e.target.value)}
          sx={{ width: "50%", marginTop: "10px" }}
        />
        <Button
          variant="contained"
          sx={{ marginLeft: "10px" }}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
