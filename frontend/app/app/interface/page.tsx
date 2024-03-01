import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Header from "./components/Header";
import ChatRecord from "./components/ChatRecord";
import TreeMap from "./components/TreeMap";
import ConceptNetwork from "./components/ConceptNetwork";

import styles from "./styles.module.css";

export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={6}>
          <div>
            <ChatRecord />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <TreeMap />
            <ConceptNetwork />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
