import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import { UserInfo, ConversationData, FollowupQuestion } from "../../types";
import styles from "../styles.module.css";

interface Props {
  userInfo: UserInfo | null;
  passConversationData: (ConversationData: ConversationData[]) => void;
  passFollowupQuestions: (followupQuestions: FollowupQuestion[]) => void;
}

export default function ChatRecord(props: Props) {
  const [userInputPrompt, setUserInputPrompt] = useState<string>("");
  const [conversationData, setConversationData] = useState<ConversationData[]>(
    [],
  );
  const [followupQuestions, setFollowupQuestions] = useState<
    FollowupQuestion[]
  >([]);
  const [textFieldValue, setTextFieldValue] = useState<string>("");
  const [isLoadingLLMResponse, setIsLoadingLLMResponse] =
    useState<boolean>(false);
  const [followupQuestionMode, setFollowupQuestionMode] = useState<
    "controlled" | "epistemology"
  >("epistemology");
  const [conversationId, setConversationId] = useState<number>(0);

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
      conversationId: conversationId,
    };
    const conversationDataPrev: ConversationData[] = [
      ...conversationData,
      newConversationDataUser,
    ];
    setConversationData([...conversationData, newConversationDataUser]);
    props.passConversationData([...conversationData, newConversationDataUser]);

    const url: string = `${process.env.NEXT_PUBLIC_API_URL}/get_chatgpt_answer`;
    const data = {
      user_input_prompt: userInputPrompt,
      followup_question_mode: followupQuestionMode,
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
          console.log(result);
          // add LLM response to conversation data
          const newConversationDataLLM: ConversationData = {
            userId: props.userInfo!.userId,
            role: "system",
            content: result["answer_question"],
            conversationId: conversationId,
          };

          setConversationData([
            ...conversationDataPrev,
            newConversationDataLLM,
          ]);
          props.passConversationData([
            ...conversationDataPrev,
            newConversationDataLLM,
          ]);

          // @ts-ignore
          const newFollowupQuestions: FollowupQuestion[] = result[
            "followup_questions"
          ].map((content: FollowupQuestion, i: number) => ({
            conversationId: conversationId,
            followupQuestionIndex: i,
            content: content,
          }));
          console.log(newFollowupQuestions);
          setFollowupQuestions([...followupQuestions, ...newFollowupQuestions]);
          props.passFollowupQuestions([
            ...followupQuestions,
            ...newFollowupQuestions,
          ]);
          setConversationId(conversationId + 1);

          // set false to hide loading icon
          setIsLoadingLLMResponse(false);
        },
        (error) => {
          console.log("========== API error ==========");
          console.log(error);
        },
      );
  };

  const onChangeSwitch = (isSwitchOn: boolean) => {
    console.log(isSwitchOn);
    const newFollowupQuestionMode = isSwitchOn ? "epistemology" : "controlled";
    setFollowupQuestionMode(newFollowupQuestionMode);
  };

  const conversationBox = (
    conversation: ConversationData,
    followupQuestions: FollowupQuestion[],
    i: number,
  ) => {
    const _followupQuestions = followupQuestions.filter(
      (d) => d.conversationId === conversation.conversationId,
    );
    const followupQuestionsContainer = _followupQuestions.map((d, i) => (
      <Box key={i} className={styles.followup_question_box}>
        <Typography variant="body1">
          {i + 1}. {d.content}
        </Typography>
      </Box>
    ));

    return (
      <Box
        key={i}
        className={`${
          conversation.role === "user"
            ? styles.chatbox_user
            : styles.chatbox_llm
        }`}
      >
        <Box>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                conversation.role === "user" ? "flex-start" : "flex-end",
            }}
          >
            <Avatar
              alt={conversation.role === "user" ? "U" : "C"}
              src={`/images/${
                conversation.role === "user" ? "user.png" : "bot.png"
              }`}
            />
            <h3>
              {conversation.role === "user"
                ? props.userInfo?.userId
                : "ChatGPT"}
            </h3>
          </Stack>
          <Box className={styles.chat_text_box}>
            <p>{conversation.content}</p>
          </Box>
          {conversation.role === "system" && (
            <Box className={styles.followup_question_container}>
              {followupQuestionsContainer}
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  const followupQuestionBox = (conversation: ConversationData, i: number) => {
    return (
      <Box key={i} className={styles.followup_question_container}>
        {conversation.content.split("\n").map((d, i) => (
          <Box key={i} className={styles.followup_question_box}>
            <Typography variant="body1">{d}</Typography>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box className={styles.interface_component}>
      <Stack
        direction="row"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            alt="Embedded Content Sharp"
            src="/images/q_a.png"
            variant="square"
            sx={{ mr: 2 }}
          />
          <Typography variant="h5">Q&A Conversation</Typography>
        </Stack>
        <Stack
          direction="row"
          sx={{
            displaY: "flex",
            alignItems: "center",
            mr: 4,
          }}
        >
          <Tooltip title="Controlled Version" arrow placement="top">
            <Typography variant="button">C</Typography>
          </Tooltip>
          <Switch
            defaultChecked
            onChange={(e) => onChangeSwitch(e.target.checked)}
          />
          <Tooltip title="Epistemology Version" arrow placement="top">
            <Typography variant="button">E</Typography>
          </Tooltip>
        </Stack>
      </Stack>
      <Divider sx={{ mt: 1, mb: 2, borderColor: "black", borderWidth: 1 }} />
      <Box>
        {conversationData.map((conversation, i) => {
          return conversationBox(conversation, followupQuestions, i);
        })}
        {/* {conversationData[conversationData.length-1]["role"] === "system" && } */}
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
