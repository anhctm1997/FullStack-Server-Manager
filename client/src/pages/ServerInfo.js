import { Box, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";
import ServerProfileDetails from "../components/Server/ServerProfileDetails";
import UserProfileDetails from "../components/User/UserProfileDetails";

const ServerInfo = () => {
  const { id } = useParams();
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
            {id !== "add" ? "EDIT SERVER" : "ADD SERVER"}
          </Typography>
          <Grid container spacing={3}>
            <ServerProfileDetails id={id} />
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default ServerInfo;
