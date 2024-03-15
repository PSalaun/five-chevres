"use client";
import MantyLogo from "@/app/components/ui/mantyLogo";
import { signOut } from "@/auth";
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
          <form
            action={async () => {
              await signOut();
            }}
          >
            <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
              <div className="hidden md:block">Sign Out</div>
            </button>
          </form>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
