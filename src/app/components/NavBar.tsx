"use client";
import MantyLogo from "@/app/components/ui/mantyLogo";
import theme from "@/theme";
import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import Link from "next/link";

const NavBar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        justifyContent: "flex-end",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "4rem",
          padding: "10px",
        }}
      >
        <MantyLogo />
        <Container
          sx={{ display: "flex", justifyContent: "flex-end", gap: "4rem" }}
        >
          <Link href="/">Home</Link>
          {/* TODO: don't hardcode /1 */}
          <Link href="/composition/1">Composition</Link>
          <Link href="/players">Joueurs</Link>
          <Link href="/calendar">Calendrier</Link>
          <Link href="/ranking">Classement</Link>
          <Link href="/profil">Profil</Link>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
