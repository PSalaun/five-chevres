"use client";
import { Button, Dialog } from "@mui/material";
import React, { useState } from "react";

const NewMatch = ({ title }: { title: string }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Ajouter un nouveau match
      </Button>
      <Dialog open={open}>NewMatch</Dialog>
    </>
  );
};

export default NewMatch;
