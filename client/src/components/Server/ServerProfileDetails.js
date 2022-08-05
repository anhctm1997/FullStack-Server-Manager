import { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addServer,
  getServer,
  updateServer,
} from "../../utils/reducer/ServerSlice";

const dataServer = Yup.object().shape({
  name: Yup.string().required("Required"),
  username: Yup.string().required("Required"),
  password: Yup.string()
    .min(4, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  host: Yup.string().required("Required"),
  ram: Yup.number().default(1024),
  cpu: Yup.string().required("Required"),
  http: Yup.bool().default(true),
  https: Yup.bool().default(true),
  status: Yup.bool().default(true),
});
const ServerProfileDetails = (props) => {
  const navigate = useNavigate();
  let id = props.id;
  const { serverInfo } = useSelector(({ serverData }) => serverData);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      _id: id,
      name: "",
      username: "",
      password: "",
      host: "",
      status: true,
      ram: 1024,
      cpu: "",
      http: true,
      https: true,
    },
    validationSchema: dataServer,
    onSubmit: async () => {
      let data = {
        name: formik.values.name,
        username: formik.values.username,
        password: formik.values.password,
        host: formik.values.host,
        status: formik.values.status,
        ram: formik.values.ram,
        cpu: formik.values.cpu,
        http: formik.values.http,
        https: formik.values.https,
      };
      if (!formik.values.password) {
        data = {
          name: formik.values.name,
          username: formik.values.username,
          host: formik.values.host,
          status: formik.values.status,
          ram: formik.values.ram,
          cpu: formik.values.cpu,
          http: formik.values.http,
          https: formik.values.https,
        };
      }
      let res;
      if (id === "add") {
        res = await dispatch(addServer(data));
      } else {
        res = await dispatch(updateServer({ id, data: data }));
      }
      if (res.error) {
        return toast.error(res.payload);
      } else {
        toast.success("Successfuly");
        return navigate("/servers");
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(getServer(id));
      if (res.error) {
        toast.error(res.payload);
      } else {
        formik.setFieldValue(
          "username",
          serverInfo.username || res.payload.username
        );
        formik.setFieldValue("ram", serverInfo.ram || res.payload.ram);
        formik.setFieldValue("cpu", serverInfo.cpu || res.payload.cpu);
        formik.setFieldValue("status", serverInfo.status || res.payload.status);
        formik.setFieldValue("host", serverInfo.host || res.payload.host);
        formik.setFieldValue("http", serverInfo.http || res.payload.http);
        formik.setFieldValue("https", serverInfo.https || res.payload.https);
        formik.setFieldValue("name", res.payload.name || res.payload.name);
      }
    };
    if (id !== "add") {
      fetchData();
    }
  }, [dispatch]);

  return (
    <form onSubmit={formik.handleSubmit} {...props}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Name"
                margin="normal"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.username && formik.errors.username
                )}
                fullWidth
                helperText={formik.touched.username && formik.errors.username}
                label="Username"
                margin="normal"
                name="username"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.username}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.host && formik.errors.host)}
                fullWidth
                helperText={formik.touched.host && formik.errors.host}
                label="Host"
                margin="normal"
                name="host"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.host}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.ram && formik.errors.ram)}
                fullWidth
                helperText={formik.touched.ram && formik.errors.ram}
                label="Ram"
                margin="normal"
                name="ram"
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.ram}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.cpu && formik.errors.cpu)}
                fullWidth
                helperText={formik.touched.cpu && formik.errors.cpu}
                label="Cpu"
                margin="normal"
                name="cpu"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.cpu}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <TextField
                select
                helperText={formik.touched.status && formik.errors.status}
                label="Status"
                name="status"
                onChange={formik.handleChange}
                value={formik.values.status}
                style={{ width: "200px" }}
                variant="outlined"
              >
                <MenuItem value={true}>On</MenuItem>
                <MenuItem value={false}>Off</MenuItem>
              </TextField>
              <TextField
                select
                helperText={formik.touched.http && formik.errors.http}
                label="Http"
                name="http"
                onChange={formik.handleChange}
                value={formik.values.http}
                style={{ width: "200px" }}
                variant="outlined"
              >
                <MenuItem value={true}>On</MenuItem>
                <MenuItem value={false}>Off</MenuItem>
              </TextField>
              <TextField
                select
                helperText={formik.touched.https && formik.errors.https}
                label="Https"
                name="https"
                onChange={formik.handleChange}
                value={formik.values.https}
                style={{ width: "200px" }}
                variant="outlined"
              >
                <MenuItem value={true}>On</MenuItem>
                <MenuItem value={false}>Off</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" type="submit">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default ServerProfileDetails;
