import * as React from "react";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import { UserInfo } from "../types";

import styles from "../styles.module.css";

interface Props {
  userInfo: UserInfo | null;
}

export default function ChatRecord(props: Props) {
  return (
      <Box>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </Box>
 )
}
