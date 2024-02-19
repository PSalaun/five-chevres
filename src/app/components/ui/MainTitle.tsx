import { Typography } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
};
const MainTitle = (props: Props) => {
  return (
    <Typography
      variant="h1"
      sx={{ textAlign: "left", paddingY: "4rem", fontSize: "4rem" }}
    >
      {props.children}
    </Typography>
  );
};

export default MainTitle;
