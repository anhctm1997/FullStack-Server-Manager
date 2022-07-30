import { Dialog, DialogContent } from "@mui/material";
import React from "react";

const DialogForm = (props) => {
  const { children, open } = props;
  return (
    <Dialog title="Dialog" open={open}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default DialogForm;
