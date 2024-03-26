import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import TextNFT2 from "./TextNFT2";
import TextSemiotics from "./TextSemiotics";

import styles from "../styles.module.css";

interface Props {
  embeddedContentType: string;
}

const navigationItemsNFT = [
  "Title",
  "What does NFT stand for?",
  "What is an NFT?",
  "Why are NFTs so expensive?",
  "Why do people buy NFTs?",
  "Key takeaways",
];

const navigationItemsSemiotics = [
  "Title",
  "Semiotics: definition",
  "Signs in semiotics",
  "Semiotic theory",
  "Semiotic analysis",
  "Semiotics examples",
  "Semiotics and language teaching",
  "Semiotics - Key Takeaways",
];

export default function EmbeddedContent(props: Props) {
  const [embeddedContentType, setEmbeddedContentType] = useState<string>("");
  const [navigationItems, setNavigationItems] = useState<string[]>([]);
  const [navigationDisplayValue, setNavigationDisplayValue] = useState<
    "flex" | "none"
  >("flex");
  const [clickedNavigationButtonIndex, setClickedNavigationButtonIndex] =
    useState<number | null>(null);
  const parentRef = useRef(null); // Reference to the parent box
  const [childHeight, setChildHeight] = useState("0px"); // State to hold the child's height

  useEffect(() => {
    if (parentRef.current) {
      const parentHeight = parentRef.current.offsetHeight; // Get the rendered height of the parent
      setChildHeight(`${parentHeight * 0.8}px`); // Set the child's height to half of the parent's height
    }
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    setEmbeddedContentType(props.embeddedContentType);
    if (props.embeddedContentType === "nft") {
      setNavigationItems(navigationItemsNFT);
    } else if (props.embeddedContentType === "semiotics") {
      setNavigationItems(navigationItemsSemiotics);
    }
  }, [props]);

  return (
    <Box ref={parentRef} className={styles.interface_component_left}>
      <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          alt="Embedded Content Sharp"
          src="/images/embedded_content.png"
          variant="square"
          sx={{ mr: 2 }}
        />
        <Typography variant="h5">Embedded Content</Typography>
      </Stack>
      <Divider sx={{ mt: 1, mb: 2, borderColor: "black", borderWidth: 1 }} />
      <Stack direction="row">
        <Stack
          sx={{
            display: navigationDisplayValue,
            flexDirection: "column",
            alignItems: "center",
            overflowY: "auto",
            // height: childHeight,
            height: "40vh",
            overflowX: "visible",
            padding: "10px",
          }}
        >
          <Typography variant="h6">Navigation</Typography>
          <Box>
            {navigationItems.map((d, i) => (
              <Button
                key={i}
                variant={
                  clickedNavigationButtonIndex === i ? "contained" : "outlined"
                }
                sx={{ mt: 1, width: "100%" }}
                onClick={() => {
                  const element = document.getElementById(`content_sec${i}`);
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "nearest",
                    });
                  }
                  setClickedNavigationButtonIndex(i);
                }}
              >
                {d}
              </Button>
            ))}
          </Box>
        </Stack>
        <Box
          sx={{
            width: "10px",
            height: childHeight,
            // height: "100%",
            marginLeft: "10px",
            backgroundColor: "darkgray",
            display: "flex",
            alignItems: "flex-start",
          }}
          className={styles.bar}
          onClick={() => {
            const newNavigationDisplayValue =
              navigationDisplayValue === "flex" ? "none" : "flex";
            setNavigationDisplayValue(newNavigationDisplayValue);
          }}
        >
          <Box
            className={styles.navigation_bar}
            onClick={() => {
              const newNavigationDisplayValue =
                navigationDisplayValue === "flex" ? "none" : "flex";
              setNavigationDisplayValue(newNavigationDisplayValue);
            }}
            sx={{ marginTop: "130px" }}
          >
            {navigationDisplayValue === "flex" ? "<" : ">"}
          </Box>
        </Box>
        <Box sx={{ ml: 3, overflowY: "auto", height: childHeight }}>
          {embeddedContentType === "nft" && <TextNFT2 />}
          {embeddedContentType === "semiotics" && <TextSemiotics />}
        </Box>
      </Stack>
    </Box>
  );
}
