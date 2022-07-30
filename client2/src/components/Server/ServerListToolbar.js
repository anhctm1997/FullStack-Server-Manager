import {
  Button,
  Card,
  CardContent,
  InputAdornment,
  SvgIcon,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Download as DownloadIcon } from "../../icons/download";
import { Search as SearchIcon } from "../../icons/search";
const ServerListToolbar = (props) => {
  const sm = useMediaQuery((theme) => theme.breakpoints.up("sm"), {
    defaultMatches: true,
    noSsr: false,
  });
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
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search product"
                variant="outlined"
              />
            </Box>
            <Box
              sx={
                sm
                  ? { m: 1 }
                  : { display: "flex", justifyContent: "space-between", pt: 2 }
              }
            >
              <Button
                startIcon={<DownloadIcon fontSize="small" />}
                sx={{ mr: 1 }}
              >
                Export
              </Button>
              <Button color="primary" variant="contained">
                Add Servers
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ServerListToolbar;
