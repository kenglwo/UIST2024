import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { UserInfo, ConversationData } from "../types";

import styles from "../styles.module.css";
import { clear } from "console";

interface Props {
  userInfo: UserInfo | null;
}

export default function ChatRecord(props: Props) {
  const [userInputPrompt, setUserInputPrompt] = useState<string>("");
  const [conversationData, setConversationData] = useState<ConversationData[]>(
    [],
  );

  const onChangeTextField = (inputText: string) => {
    setUserInputPrompt(inputText);
  };

  const onSubmit = () => {
    if (props.userInfo === null) return;
    const newConversationDataUser: ConversationData = {
      userId: props.userInfo.userId,
      role: "user",
      content: userInputPrompt,
    };
    // setConversationData([...conversationData, newConversationDataUser]);
    // TODO: sent userInputPrompt to ChatGPT
    //
    //
    // TODO: set response by LLM
    const newConversationDataLLM: ConversationData = {
      userId: props.userInfo.userId,
      role: "system",
      content: "response by LLM ...",
    };

    setConversationData([
      ...conversationData,
      newConversationDataUser,
      newConversationDataLLM,
    ]);
  };

  return (
    <Box sx={{ m: 3 }}>
      <Box className={styles.border_solid}>
        {conversationData.map((conversation, i) => (
          <Box
            key={i}
            className={`${
              conversation.role === "user"
                ? styles.chatbox_user
                : styles.chatbox_llm
            }`}
            sx={{ mt: 4, whiteSpace: "pre-wrap" }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Avatar
                alt={conversation.role === "user" ? "U" : "C"}
                // src={`/images/${
                //   conversation.role === "user" ? "user.png" : "student.jpeg"
                // }`}
              />
              <h3>{conversation.role === "user" ? "You" : "ChatGPT"}</h3>
            </Stack>
            <Box sx={{ m: 2, textAlign: "left", whiteSpace: "pre-wrap" }}>
              <p>{conversation.content}</p>
            </Box>
          </Box>
        ))}
      </Box>
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
