import { Typography } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
};
const MainTitle = (props: Props) => {
  return (
    <Typography
      variant="h1"
      sx={{ textAlign: "left", paddingBottom: "1.5rem", fontSize: "3.4rem" }}
    >
      {props.children}
    </Typography>
  );
};

export default MainTitle;
