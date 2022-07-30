import { Box, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import UserProfileDetails from "../components/User/UserProfileDetails";

const UserInfo = () => {
  return (
    <div>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            User Update
          </Typography>
          <Grid container spacing={3}>
            <UserProfileDetails />
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default UserInfo;
