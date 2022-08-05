import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Pagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ServerCard from "../components/Server/ServerCard";
import ServerListToolbar from "../components/Server/ServerListToolbar";
import { deleteServer, fetchServersList } from "../utils/reducer/ServerSlice";

const Server = () => {
  const dispatch = useDispatch();
  const { serverList, success, meta } = useSelector(
    ({ serverData }) => serverData
  );
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(fetchServersList({ limit: 6, page: page }));
      if (res.error) {
        toast.error(res.payload);
      }
    };
    fetchData();
  }, [dispatch, page]);
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2,
      }}
    >
      <Container maxWidth={false}>
        <ServerListToolbar />
        {success ? (
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {serverList.map((server) => (
                <Grid item key={server._id} lg={4} md={6} xs={12}>
                  <ServerCard server={server} action={deleteServer} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <CircularProgress size={50} />
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 3,
          }}
        >
          {success && (
            <Pagination
              color="primary"
              count={meta.totalPage}
              page={page}
              size="small"
              onChange={handleChange}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Server;
