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
import { useDispatch } from "react-redux";
// import { deleteServer } from "../../utils/reducer/ServerSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ServerCard = ({ server, action, ...rest }) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const updateDate = new Date(server.updateDate).toDateString();
  const createDate = new Date(server.createDate).toDateString();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    const res = dispatch(action(server._id));
    if (res.error) {
      toast.error(res.payload);
    } else {
      toast.success("Successfuly");
    }
  };
  const handleUpdate = () => {
    navigator("/servers/" + server._id);
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
          <Avatar sx={{ bgcolor: "blue" }} aria-label="recipe">
            B
          </Avatar>
        }
        action={
          <IconButton onClick={handleClick} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={server.name}
        subheader={createDate}
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
        <Button onClick={handleUpdate} sx={{ p: 2 }}>
          Edit
        </Button>
        <Button onClick={handleDelete} color="error" sx={{ p: 2 }}>
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
          {`Username: 
        ${server.username}`}
        </Typography>
        <Typography align="left" color="textPrimary" variant="body1">
          {`Ip address: ${server.host}`}
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
              Updated {updateDate}
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
