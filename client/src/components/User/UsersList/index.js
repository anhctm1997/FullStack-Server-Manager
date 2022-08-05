import {
  Box,
  Button,
  Card,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PerfectScrollbar from "react-perfect-scrollbar";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { deleteUser, fetchUsersList } from "../../../utils/reducer/UserSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const UsersList = ({ ...props }) => {
  const navigator = useNavigate();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  let { userList, success, meta } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const p = page + 1;
      const res = await dispatch(fetchUsersList({ limit, page: p }));
      if (res.error) {
        toast.error(res.payload);
      }
      userList = res.payload.data;
      meta = res.payload.meta;
    };
    fetchData();
  }, [dispatch, limit, page]);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleDelete = (value) => async (event) => {
    const res = await dispatch(deleteUser(value));
    if (res.error) {
      toast.error(res.error.message);
    } else {
      toast.success("Successfuly");
    }
  };
  const handleUpdate = (value) => (event) => {
    // console.log(value);
    navigator(`/users/${value}`);
  };

  return (
    <Card {...props}>
      <PerfectScrollbar>
        <Box sx={{}}>
          {success ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Permissions</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Registration date</TableCell>
                  <TableCell
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Edit
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {userList.map((customer) => {
                  const date = new Date(customer.regDate).toDateString();

                  return (
                    <TableRow hover key={customer._id}>
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Typography sx={{ mr: 2 }}>
                            {customer.username}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {customer.isAdmin === 1 ? "Admin" : "Member"}
                      </TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell size="small">{customer.email}</TableCell>
                      <TableCell>{date}</TableCell>
                      <TableCell
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <Button onClick={handleUpdate(customer._id)}>
                          <ModeEditIcon />
                        </Button>
                      </TableCell>
                      <TableCell
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <Button onClick={handleDelete(customer._id)}>
                          <DeleteIcon color="error" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
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
        </Box>
      </PerfectScrollbar>
      {success && (
        <TablePagination
          component="div"
          count={meta ? meta.totalCount : 5}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      )}
    </Card>
  );
};
UsersList.propTypes = {
  skeletons: PropTypes.bool,
};
export default UsersList;
