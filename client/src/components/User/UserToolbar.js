import { CSVLink } from "react-csv";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { Download as DownloadIcon } from "../../icons/download";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersList, findUser } from "../../utils/reducer/UserSlice";
import { toast } from "react-toastify";
import SearchInput from "../SearchInput/SearchInput";

const headers = [
  { label: "ID", key: "_id" },
  { label: "Username", key: "username" },
  { label: "Full Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Permission", key: "isAdmin" },
  { label: "Registration date", key: "regDate" },
];

const UserToolbar = (props) => {
  const sm = useMediaQuery((theme) => theme.breakpoints.up("sm"), {
    defaultMatches: true,
    noSsr: false,
  });
  const { setOpen } = props;
  const dispatch = useDispatch();
  const { userList } = useSelector(({ userData }) => userData);
  const getData = (event, done) => {
    const res = dispatch(fetchUsersList(null));
    if (res.error) {
      toast.error(res.payload);
    } else {
      done(true);
    }
  };
  return (
    <Box {...props} sx={{ mt: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Users list
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
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
                label="Search User"
                search={findUser}
                type="users"
              ></SearchInput>
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
                <CSVLink
                  data={userList}
                  headers={headers}
                  asyncOnClick={true}
                  style={{ textDecoration: "none", color: "primary" }}
                  target="_blank"
                  filename={"User_data_list.csv"}
                  onClick={getData}
                >
                  Export
                </CSVLink>
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={() => setOpen(true)}
              >
                Add Users
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default UserToolbar;
