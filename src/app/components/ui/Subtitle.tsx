import { Typography } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
};
const Subtitle = (props: Props) => {
  return (
    <Typography variant="h2" sx={{ textAlign: "left", fontSize: "2rem" }}>
      {props.children}
    </Typography>
  );
};

export default Subtitle;
