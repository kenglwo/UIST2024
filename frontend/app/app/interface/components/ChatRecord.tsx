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
import JSZip from "jszip";

interface Props {
  userInfo: UserInfo | null;
  embeddedContentType: string;
  passConversationData: (
    ConversationData: ConversationData[],
    clickedFollowupQuestionIndedx?: string,
  ) => void;
  passFollowupQuestions: (followupQuestions: FollowupQuestion[]) => void;
  passHoveredFollowupQuestionData: (
    hoveredFollowupQuestion: FollowupQuestion,
  ) => void;
  passClickedFollowupQuestionIndex: (
    clickedFollowupQuestionIndex: string,
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
  const clickedFollowupQuestionIndexArray = useRef([]);

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
          // console.log("===== ask chatgpt to read content ===");
          // console.log(props.embeddedContentType);
          const hasRead = await askChatGptToReadEmbeddedContent(
            props.userInfo.userId,
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

  function getTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    // getMonth() returns month from 0 (January) to 11 (December) so we add 1
    const month = ("0" + (now.getMonth() + 1)).slice(-2); // Ensure two digits
    const day = ("0" + now.getDate()).slice(-2); // Ensure two digits
    const hours = ("0" + now.getHours()).slice(-2);
    const minutes = ("0" + now.getMinutes()).slice(-2);
    const seconds = ("0" + now.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const onChangeTextField = (inputText: string) => {
    setUserInputPrompt(inputText);
    setTextFieldValue(inputText);
  };

  const onSubmit = async () => {
    if (props.userInfo === null) return;

    // clear textfiled
    setTextFieldValue("");

    const newConversationDataUser: ConversationData = {
      user_id: props.userInfo.userId,
      role: "user",
      content: userInputPrompt,
      conversationId: conversationId,
      mode: followupQuestionMode,
      timestamp: getTimestamp(),
    };
    const conversationDataPrev: ConversationData[] = [
      ...conversationData,
      newConversationDataUser,
    ];
    setConversationData([...conversationData, newConversationDataUser]);
    props.passConversationData([...conversationData, newConversationDataUser]);

    const url: string = `${process.env.NEXT_PUBLIC_API_URL}/get_chatgpt_answer`;
    const data = {
      user_id: props.userInfo.userId,
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
            user_id: props.userInfo!.userId,
            role: "system",
            content: result["answer_question"],
            conversationId: conversationId,
            mode: followupQuestionMode,
            timestamp: getTimestamp(),
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
    const data = { user_id: props.userInfo.userId, user_input_prompt: prompt, embedded_content_type: props.embeddedContentType};
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
    props.passClickedFollowupQuestionIndex(clickedFollowupQuestionIndex);
    clickedFollowupQuestionIndexArray.current.push({
      followupQuestionIndex: clickedFollowupQuestionIndex,
      timestamp: getTimestamp(),
    });

    const url: string = `${process.env.NEXT_PUBLIC_API_URL}/get_chatgpt_answer`;
    const data = {
      user_id: props.userInfo.userId,
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
            user_id: props.userInfo!.userId,
            role: "system",
            content: result["answer_question"],
            conversationId: conversationId,
            mode: followupQuestionMode,
            timestamp: getTimestamp(),
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
            <Typography variant="body1">{d.content}</Typography>
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

  // @ts-ignore
  function objectArrayToTsv(data) {
    if (data.length === 0) {
      return "";
    }

    // Extract headers
    const headers = Object.keys(data[0]);
    const csvRows = [];

    // Add header row
    csvRows.push(headers.join("\t"));

    // Convert each object to a CSV row
    for (const row of data) {
      const values = headers.map((header) => {
        const escaped = ("" + row[header]).replace(/"/g, '""'); // Convert to string and escape double quotes
        const escapedLine = escaped.replaceAll("\n", "");
        return `"${escaped}"`; // Enclose each value in double quotes
      });
      csvRows.push(values.join("\t"));
    }

    return csvRows.join("\n");
  }

  function downloadZip(tsvDataObjects, zipFilename = "data.zip") {
    const zip = new JSZip();

    // Add each TSV file to the zip
    tsvDataObjects.forEach(({ data, filename }) => {
      const tsvString = objectArrayToTsv(data);
      zip.file(filename, tsvString, { binary: false });
    });

    // Generate the ZIP file and trigger the download
    zip.generateAsync({ type: "blob" }).then(function (content) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = zipFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  const onClickDownload = () => {
    const dataSets = [
      {
        data: conversationData,
        filename: "conversation_data.tsv",
      },
      {
        data: followupQuestions,
        filename: "followup_questions.tsv",
      },
      {
        data: clickedFollowupQuestionIndexArray.current,
        filename: "clicked_followup_questions.tsv",
      },
    ];

    downloadZip(dataSets, "data.zip");
  };

  return (
    <Box ref={parentRef} className={styles.interface_component_left}>
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
      <Box sx={{ height: "40vh", overflowY: "auto" }}>
        <Box>
          {conversationData.map((conversation, i) => {
            return conversationBox(conversation, followupQuestions, i);
          })}
          {!llmAlreadyReadEmbeddedContent && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CircularProgress />
              <Typography variant="h6" sx={{ marginLeft: "20px" }}>
                LLM is reading the embedded content
              </Typography>
            </Box>
          )}
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
      <Box>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ marginLeft: "10px" }}
          onClick={onClickDownload}
        >
          Download
        </Button>
      </Box>
    </Box>
  );
}
