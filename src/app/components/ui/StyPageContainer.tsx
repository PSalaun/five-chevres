import { Container } from "@mui/system";
import React from "react";

const StyPageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "auto",
        justifyContent: "flex-start",
      }}
    >
      {children}
    </Container>
  );
};

export default StyPageContainer;
