"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Header from "./components/Header";
import ChatRecord from "./components/ChatRecord";
import TreeMap from "./components/TreeMap";
import ConceptNetwork from "./components/ConceptNetwork";
import { UserInfo } from "../types";

export default function BasicGrid() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    // TODO:  Fetch user data
    if (userInfo !== null) return;

    const userInfoTest: UserInfo = { userId: "test_user", userName: "user1" };
    setUserInfo(userInfoTest);
  }, [userInfo]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={6}>
          <div>
            <ChatRecord userInfo={userInfo} />
          </div>
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
