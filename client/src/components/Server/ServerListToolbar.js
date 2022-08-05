import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CircularProgress,
  InputAdornment,
  Popover,
  SvgIcon,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useDebounce from "../../hook/useDebounce";
import { Download as DownloadIcon } from "../../icons/download";
import { Search as SearchIcon } from "../../icons/search";
import { findServer } from "../../utils/reducer/ServerSlice";
import SearchInput from "../SearchInput/SearchInput";
const ServerListToolbar = (props) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const valueRef = useRef("");
  const sm = useMediaQuery((theme) => theme.breakpoints.up("sm"), {
    defaultMatches: true,
    noSsr: false,
  });

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    if (searchValue !== "") {
      console.log(searchValue);
      dispatch(findServer(searchValue));
    }
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 2 }} variant="h4">
          SERVERS LIST
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent
            sx={
              sm
                ? {
                    display: "flex",
                    flexDirection: "columm",
                    justifyContent: "space-between",
                  }
                : { alignItems: "center" }
            }
          >
            <Box sx={sm ? { maxWidth: 500, minWidth: 200 } : { minWidth: 200 }}>
              <SearchInput
                label="Search Server"
                search={findServer}
                type="servers"
              ></SearchInput>
            </Box>
            <Box
              sx={
                sm
                  ? { m: 1 }
                  : {
                      display: "flex",
                      justifyContent: "space-between",
                      pt: 2,
                    }
              }
            >
              <Button
                startIcon={<DownloadIcon fontSize="small" />}
                sx={{ mr: 1 }}
              >
                Export
              </Button>
              <Link to="/servers/add" style={{ textDecoration: "none" }}>
                <Button color="primary" variant="contained">
                  Add Servers
                </Button>
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ServerListToolbar;
