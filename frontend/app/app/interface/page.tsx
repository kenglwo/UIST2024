"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Header from "../components/Header";
import ChatRecord from "./components/ChatRecord";
import TreeMap from "./components/TreeMap";
import ConceptNetwork from "./components/ConceptNetwork";
import EmbeddedContent from "./components/EmbeddedContent";
import { UserInfo, ConversationData, FollowupQuestion } from "../types";
import styles from "./styles.module.css";

export default function BasicGrid() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [conversationData, setConversationData] = useState<ConversationData[]>(
    [],
  );
  const [followupQuestions, setFollowupQuestions] = useState<
    FollowupQuestion[]
  >([]);
  const [hoveredFollowupQuestion, setHoveredFollowupQuestion] = useState<
    FollowupQuestion | undefined
  >();
  const [embeddedContentType, setEmbeddedContentType] = useState<string>("");
  const [clickedFollowupQuestionIndex, setClickedFollowupQuestionIndex] =
    useState<string>("");

  const searchParams = useSearchParams();

  const passClickedFollowupQuestionIndex = (
    clickedFollowupQuestionIndex: string,
  ) => {
    setClickedFollowupQuestionIndex(clickedFollowupQuestionIndex);
    console.log(
      `@@ clickedFollowupQuestionIndex at page: ${clickedFollowupQuestionIndex}`,
    );
  };

  const passConversationData = (
    conversationDataInChildComponent: ConversationData[],
  ) => {
    setConversationData(conversationDataInChildComponent);
  };

  const passFollowupQuestions = (
    followupQuestionsInChildComponent: FollowupQuestion[],
  ) => {
    setFollowupQuestions(followupQuestionsInChildComponent);
  };

  const passHoveredFollowupQuestionData = (
    hoveredFollowupQuestion: FollowupQuestion,
  ) => {
    setHoveredFollowupQuestion(hoveredFollowupQuestion);
  };

  useEffect(() => {
    if (userInfo !== null) return;

    // @ts-ignore
    const userId: string = searchParams.get("user_id");
    const userInfoTest: UserInfo = {
      userId: userId,
      userName: "user1",
    };
    setUserInfo(userInfoTest);

    // get embedded content type
    const embeddedContentParameter = searchParams.get("embedded_content");
    if (embeddedContentParameter === "nft") {
      setEmbeddedContentType("nft");
    } else if (embeddedContentParameter === "semiotics") {
      setEmbeddedContentType("semiotics");
    } else {
      setEmbeddedContentType("nft");
    }
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container className={styles.layout_grid}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={6}>
          <Stack>
            <EmbeddedContent embeddedContentType={embeddedContentType} />
            <ChatRecord
              userInfo={userInfo}
              embeddedContentType={embeddedContentType}
              passConversationData={passConversationData}
              passFollowupQuestions={passFollowupQuestions}
              passHoveredFollowupQuestionData={passHoveredFollowupQuestionData}
              passClickedFollowupQuestionIndex={
                passClickedFollowupQuestionIndex
              }
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack>
            <ConceptNetwork
              userInfo={userInfo}
              embeddedContentType={embeddedContentType}
            />
            <TreeMap
              userInfo={userInfo}
              conversationData={conversationData}
              followupQuestions={followupQuestions}
              hoveredFollowupQuestion={hoveredFollowupQuestion}
              clickedFollowupQuestionIndex={clickedFollowupQuestionIndex}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
