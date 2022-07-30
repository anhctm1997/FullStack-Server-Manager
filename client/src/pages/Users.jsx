import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import AddUserForm from "../components/User/AddUserForm";
import DialogForm from "../components/DialogForm";
import UserToolbar from "../components/User/UserToolbar";
import UsersList from "../components/User/UsersList";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Users = () => {
  const [open, setOpen] = useState(false);
  const { isAdmin } = useSelector(({ authData }) => authData);
  return isAdmin === 1 ? (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2,
      }}
    >
      <Container maxWidth={false}>
        <DialogForm open={open}>
          <AddUserForm setOpen={setOpen} />
        </DialogForm>
        <UserToolbar setOpen={setOpen} addUser={open} />
        <Box sx={{ mt: 3 }}>
          <UsersList sx={{ width: "100%" }} />
        </Box>
      </Container>
    </Box>
  ) : (
    <Navigate to={"/error"}></Navigate>
  );
};

export default Users;
