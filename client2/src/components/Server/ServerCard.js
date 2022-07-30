import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Clock as ClockIcon } from "../../icons/clock";
import CircleIcon from "@mui/icons-material/Circle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const ServerCard = ({ server, ...rest }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxShadow: 2,
      }}
      {...rest}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton onClick={handleClick} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={server.name}
        subheader="September 14, 2016"
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Button sx={{ p: 2 }}>Edit</Button>
        <Button color="error" sx={{ p: 2 }}>
          Delete
        </Button>
      </Popover>
      <CardContent>
        {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pb: 3,
        }}
      >
        <Avatar alt="Product" src={server.media} variant="square" />
      </Box> */}
        {/* <Typography align="center" color="textPrimary" gutterBottom variant="h6">
        {server.name}
      </Typography> */}
        <Typography align="left" color="textPrimary" variant="body1">
          {`Cpu:
        ${server.cpu}`}
        </Typography>
        <Typography align="left" color="textPrimary" variant="body1">
          {`Ram:
        ${server.ram} Mb`}
        </Typography>
        <Typography align="left" color="textPrimary" variant="body1">
          {`Ip address: ${server.ip}`}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: 50,
            px: 1,
          }}
        >
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <ClockIcon color="action" />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              Updated 2hr ago
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography
              color="textSecondary"
              display="flex"
              variant="body2"
              pr={1}
            >
              Status
            </Typography>
            {server.status ? (
              <CircleIcon color="success" fontSize="inherit" />
            ) : (
              <CircleIcon color="error" fontSize="inherit " />
            )}
            {/* <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {server.totalDownloads} Downloads
          </Typography> */}
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};
ServerCard.propTypes = {};

export default ServerCard;
