import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { UserInfo, ConversationData } from "../../types";
import { generateResponse } from "./chatgpt_api";

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
  const [textFieldValue, setTextFieldValue] = useState<string>("");
  const [isLoadingLLMResponse, setIsLoadingLLMResponse] =
    useState<boolean>(false);

  const onChangeTextField = (inputText: string) => {
    setUserInputPrompt(inputText);
    setTextFieldValue(inputText);
  };

  const onSubmit = async () => {
    if (props.userInfo === null) return;

    // clear textfiled
    setTextFieldValue("");
    const newConversationDataUser: ConversationData = {
      userId: props.userInfo.userId,
      role: "user",
      content: userInputPrompt,
    };
    const conversationDataPrev: ConversationData[] = [...conversationData, newConversationDataUser];
    setConversationData([...conversationData, newConversationDataUser]);

    const url: string = `${process.env.NEXT_PUBLIC_API_URL}/get_chatgpt_answer`;
    const data = {
      user_input_prompt: userInputPrompt,
    };
    const header = {
      method: "POST",
      "Access-Control-Allow-Origin": "*",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    // set true to show loading icon
    setIsLoadingLLMResponse(true);

    // get LLM response
    fetch(url, header)
      .then((res) => res.json())
      .then(
        (result) => {
          const newConversationDataLLM: ConversationData = {
            userId: props.userInfo.userId,
            role: "system",
            content: result["content"],
          };

          setConversationData([...conversationDataPrev, newConversationDataLLM]);

          // set false to hide loading icon
          setIsLoadingLLMResponse(false);
        },
        (error) => {
          console.log("========== API error ==========");
          console.log(error);
        },
      );
  };

  return (
    <Box className={styles.interface_component}>
      <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          alt="Embedded Content Sharp"
          src="/images/q_a.png"
          variant="square"
          sx={{ mr: 2 }}
        />
        <Typography variant="h5">Q&A Conversation</Typography>
      </Stack>
      <Divider sx={{ mt: 1, mb: 2, borderColor: "black", borderWidth: 1 }} />
      <Box>
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
        {isLoadingLLMResponse && <CircularProgress />}
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
          id="user_input"
          label="Type here"
          variant="outlined"
          minRows={6}
          value={textFieldValue}
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
