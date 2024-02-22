import { Card, CardContent, CardHeader } from "@mui/material";
import React from "react";

type Props = {
  title?: string;
  children: React.ReactNode;
};
const StyCard = (props: Props) => {
  return (
    <Card sx={{ height: "100%", width: "100%" }}>
      <CardHeader title={props.title} />
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

export default StyCard;
