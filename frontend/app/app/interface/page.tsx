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

export default function BasicGrid() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [conversationData, setConversationData] = useState<ConversationData[]>(
    [],
  );
  const [followupQuestions, setFollowupQuestions] = useState<
    FollowupQuestion[]
  >([]);
  const [hoveredFollowupQuestion, setHoveredFollowupQuestion] = useState<FollowupQuestion | undefined>()
  const [embeddedContentType, setEmbeddedContentType] = useState<string>("nft")

  const searchParams = useSearchParams();

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

  const passHoveredFollowupQuestionData = (hoveredFollowupQuestion: FollowupQuestion) => {
    setHoveredFollowupQuestion(hoveredFollowupQuestion)
  }

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
    let embeddedContentTypeNew = searchParams.get("embedded_content")
    embeddedContentTypeNew = embeddedContentTypeNew === null ? "nft" : embeddedContentTypeNew
    setEmbeddedContentType(embeddedContentTypeNew)
  }, [userInfo]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={6}>
          <Stack>
            <EmbeddedContent embeddedContentType={embeddedContentType}/>
            <ChatRecord
              userInfo={userInfo}
              passConversationData={passConversationData}
              passFollowupQuestions={passFollowupQuestions}
              passHoveredFollowupQuestionData={passHoveredFollowupQuestionData}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <div>
            <ConceptNetwork userInfo={userInfo} />
            <TreeMap
              userInfo={userInfo}
              conversationData={conversationData}
              followupQuestions={followupQuestions}
              hoveredFollowupQuestion={hoveredFollowupQuestion}
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
