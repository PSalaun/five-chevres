import { Container } from "@mui/system";
import React from "react";

const StyPageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingY: "3rem !important",
        justifyContent: "flex-start",
        flexGrow: "1",
      }}
    >
      {children}
    </Container>
  );
};

export default StyPageContainer;
