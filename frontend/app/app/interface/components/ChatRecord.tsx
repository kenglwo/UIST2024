import React, { useState, useEffect, useRef } from "react";
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
import { askChatGptToReadEmbeddedContent } from "./chatgpt_api";
import styles from "../styles.module.css";

interface Props {
  userInfo: UserInfo | null;
  embeddedContentType: string;
  passConversationData: (ConversationData: ConversationData[]) => void;
  passFollowupQuestions: (followupQuestions: FollowupQuestion[]) => void;
  passHoveredFollowupQuestionData: (
    hoveredFollowupQuestion: FollowupQuestion,
  ) => void;
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
  const parentRef = useRef(null); // Reference to the parent box
  const [childHeight, setChildHeight] = useState("100px"); // State to hold the child's height
  const [llmAlreadyReadEmbeddedContent, setllmAlreadyReadEmbeddedContent] =
    useState<boolean>(false);
  // const [embeddedContentType, setEmbeddedContentType] = useState<string>("")

  useEffect(() => {
    // scroll to the question
    if (conversationData.length > 0) {
      const latestConversationData =
        conversationData[conversationData.length - 1];
      const element =
        latestConversationData.role === "user"
          ? document.querySelector(
              `#question_${latestConversationData.role}_${latestConversationData.conversationId}`,
            )
          : document.getElementById(
              `#answer_${latestConversationData.role}_${latestConversationData.conversationId}`,
            );
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [conversationData]);

  useEffect(() => {
    if (parentRef.current) {
      const parentHeight = parentRef.current.offsetHeight; // Get the rendered height of the parent
      setChildHeight(`${parentHeight * 0.8}px`); // Set the child's height to half of the parent's height
    }
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    if (props.embeddedContentType !== "") {
      // ask ChatGPT to read the embedded content
      const checkAndReadContent = async () => {
        if (!llmAlreadyReadEmbeddedContent) {
          console.log("===== ask chatgpt to read content ===");
          console.log(props.embeddedContentType);
          const hasRead = await askChatGptToReadEmbeddedContent(
            props.embeddedContentType,
            followupQuestionMode,
          );
          // Update the state based on whether ChatGPT has successfully read the content
          setllmAlreadyReadEmbeddedContent(hasRead);
        }
      };
      // Call the async function
      checkAndReadContent();
    }
  }, [props.embeddedContentType]);

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
            // followupQuestionIndex: String(i),
            followupQuestionIndex: `conversationId${conversationId}_${i}`,
            content: content,
          }));
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

  const onChangeSwitch = async (isSwitchOn: boolean) => {
    const newFollowupQuestionMode = isSwitchOn ? "epistemology" : "controlled";
    setFollowupQuestionMode(newFollowupQuestionMode);

    const prompt =
      newFollowupQuestionMode === "epistemology"
        ? `From now play a role as a tutor helping your novice students learn the material of ${props.embeddedContentType} from the next prompt. If OK just say ChatGPT plays a role as a tutor about ${props.embeddedContentType}.`
        : `Forget about your role. Learn the material of ${props.embeddedContentType}. If OK just say ChatGPT is ready on ${props.embeddedContentType} (control version), without further comments`;

    const url = `${process.env.NEXT_PUBLIC_API_URL}/get_chatgpt_answer_without_followup_questions`;
    const data = { user_input_prompt: prompt };
    const headers = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      const res = await fetch(url, headers);
      const result = await res.json();
      window.alert(result.answer_question);
    } catch (error) {
      console.log("========== API error ==========");
      console.log(error);
    }
  };

  const onHoverFollowupQuestion = (d: FollowupQuestion) => {
    props.passHoveredFollowupQuestionData(d);
  };

  const onClickModifyButton = (followupQuestionContent: string) => {
    setTextFieldValue(followupQuestionContent);
  };

  const onClickFollowupQuestion = (followupQuestion: FollowupQuestion) => {
    const followupQuestionContent: string = followupQuestion.content;
    const clickedFollowupQuestionIndex = followupQuestion.followupQuestionIndex;
    // const newConversationDataUser: ConversationData = {
    //   userId: props.userInfo.userId,
    //   role: "user",
    //   content: followupQuestionContent,
    //   conversationId: conversationId,
    // };
    // const conversationDataPrev: ConversationData[] = [
    //   ...conversationData,
    //   newConversationDataUser,
    // ];
    // setConversationData([...conversationData, newConversationDataUser]);
    // props.passConversationData([...conversationData, newConversationDataUser]);

    const url: string = `${process.env.NEXT_PUBLIC_API_URL}/get_chatgpt_answer`;
    const data = {
      user_input_prompt: followupQuestionContent,
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
          // add LLM response to conversation data as children of the selected follow-up question
          const newConversationDataLLM: ConversationData = {
            userId: props.userInfo!.userId,
            role: "system",
            content: result["answer_question"],
            // conversationId: followupQuestion.conversationId,
            conversationId: conversationId,
            isAnswerToFolloupQuestion: true,
            // followupQuestionIndex: followupQuestion.followupQuestionIndex
          };

          // console.log('-- new conversation data --')
          // console.log(newConversationData)
          const newConversationData: ConversationData[] = [
            ...conversationData,
            newConversationDataLLM,
          ];
          setConversationData(newConversationData);
          props.passConversationData(newConversationData);

          // handle follow-up questions of a selected follow-up question
          const newFollowupQuestions: FollowupQuestion[] = result[
            "followup_questions"
          ].map((content: FollowupQuestion, i: number) => {
            return {
              // conversationId: followupQuestion.conversationId,
              conversationId: conversationId,
              followupQuestionIndex: `${clickedFollowupQuestionIndex}_${i}`,
              content,
            };
          });
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

  const conversationBox = (
    conversation: ConversationData,
    followupQuestions: FollowupQuestion[],
    i: number,
  ) => {
    const _followupQuestions = followupQuestions.filter(
      (d) => d.conversationId === conversation.conversationId,
    );
    const followupQuestionsContainer = _followupQuestions.map(
      (d: FollowupQuestion, i: number) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            size="small"
            sx={{
              height: 30,
              width: 30,
              minWidth: 0,
              borderRadius: "50%",
              marginRight: "10px",
            }}
            onClick={() => onClickModifyButton(d.content)}
          >
            M
          </Button>
          <Box
            key={i}
            className={styles.followup_question_box}
            onMouseEnter={() => onHoverFollowupQuestion(d)}
            onClick={() => {
              onClickFollowupQuestion(d);
            }}
          >
            <Typography variant="body1">
              {d.content}
            </Typography>
          </Box>
        </Box>
      ),
    );

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
          <Box
            id={
              conversation.role === "user"
                ? `question_${conversation.role}_${conversation.conversationId}`
                : `answer_${conversation.role}_${conversation.conversationId}`
            }
            className={styles.chat_text_box}
          >
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

  return (
    <Box ref={parentRef} className={styles.interface_component2}>
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
      <Box sx={{ height: childHeight, overflowY: "auto" }}>
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
            multiline
            rows={3}
            fullWidth
            value={textFieldValue}
            onChange={(e) => onChangeTextField(e.target.value)}
            sx={{ marginTop: "10px" }}
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
    </Box>
  );
}
