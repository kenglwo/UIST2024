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
import { UserInfo } from "../types";

export default function BasicGrid() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (userInfo !== null) return;

    // @ts-ignore
    const userId: string = searchParams.get("user_id");
    const userInfoTest: UserInfo = {
      userId: userId,
      userName: "user1",
    };
    setUserInfo(userInfoTest);
  }, [userInfo]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={6}>
          <Stack>
            <EmbeddedContent textName={"NFT"} />
            <ChatRecord userInfo={userInfo} />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <div>
            <TreeMap userInfo={userInfo} />
            <ConceptNetwork userInfo={userInfo} />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
