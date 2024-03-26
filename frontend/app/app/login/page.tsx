"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Header from "../components/Header";
import { UserInfo } from "../types";

import styles from "./styles.module.css";

export default function BasicGrid() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userId, setUserId] = useState<string>("");

  const router = useRouter();

  const onChangeTextField = (inputText: string) => {
    setUserId(inputText);
  };

  const onClickSubmitButton = () => {
    const newUserInfo: UserInfo = {
      userId: userId,
      userName: "",
    };

    // POST userInfo
    const url: string = `${process.env.NEXT_PUBLIC_API_URL}/save_user_info`;
    const data = {
      user_info: newUserInfo,
    };
    const header = {
      method: "POST",
      "Access-Control-Allow-Origin": "*",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(url, header)
      .then((res) => res.json())
      .then(
        (result) => {
          // Go to self-learning page
          // const url: string = `/interface?user_id=${userId}`;
          const url: string = `/interface?user_id=${userId}&embedded_content=nft`;
          router.push(url);
        },
        (error) => {
          console.log("========== API error ==========");
          console.log(error);
        },
      );
  };

  useEffect(() => {
    // TODO:  Fetch user data
    if (userInfo !== null) return;

    const userInfoTest: UserInfo = { userId: "test_user", userName: "user1" };
    setUserInfo(userInfoTest);
  }, [userInfo]);

  const onClickSemiotics = () => {
    const newUserInfo: UserInfo = {
      userId: userId,
      userName: "",
    };

    // POST userInfo
    const url: string = `${process.env.NEXT_PUBLIC_API_URL}/save_user_info`;
    const data = {
      user_info: newUserInfo,
    };
    const header = {
      method: "POST",
      "Access-Control-Allow-Origin": "*",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(url, header)
      .then((res) => res.json())
      .then(
        (result) => {
          // Go to self-learning page
          // const url: string = `/interface?user_id=${userId}`;
          const url: string = `/interface?user_id=${userId}&embedded_content=semiotics`;
          router.push(url);
        },
        (error) => {
          console.log("========== API error ==========");
          console.log(error);
        },
      );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <Stack>
            <Typography variant="h3" gutterBottom>
              Login Page
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Plase input User ID. Then, click Submit button to go to the
              self-learning page.
            </Typography>
            <TextField
              id="user_id"
              label="User ID"
              variant="outlined"
              sx={{ maxWidth: "200px", marginTop: "20px" }}
              onChange={(e) => {
                onChangeTextField(e.target.value);
              }}
            />
            <Button
              variant="contained"
              sx={{ maxWidth: "100px", marginTop: "20px" }}
              onClick={onClickSubmitButton}
            >
              NFT
            </Button>
            <Button
              variant="contained"
              sx={{ maxWidth: "100px", marginTop: "20px" }}
              onClick={onClickSemiotics}
            >
              Semiotics
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={4} />
      </Grid>
    </Box>
  );
}
