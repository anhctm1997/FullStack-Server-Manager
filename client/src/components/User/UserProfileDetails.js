import { useEffect, useState } from "react";
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
import { getUser, updateUser } from "../../utils/reducer/UserSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const dataUser = Yup.object().shape({
  username: Yup.string(),
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .min(4, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  name: Yup.string().required("Required"),
  isAdmin: Yup.number().default(2),
});
const UserProfileDetails = (props) => {
  const navigate = useNavigate();
  let { id } = useParams();
  const { userInfo, success } = useSelector(({ userData }) => userData);
  // console.log(id);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      _id: id,
      email: "",
      username: "",
      password: "",
      name: "",
      isAdmin: 1,
    },
    validationSchema: dataUser,
    onSubmit: async () => {
      let data = {
        _id: id,
        email: formik.values.email,
        username: formik.values.username,
        password: formik.values.password,
        name: formik.values.name,
        isAdmin: formik.values.isAdmin,
      };
      if (!formik.values.password) {
        data = {
          _id: id,
          email: formik.values.email,
          username: formik.values.username,
          name: formik.values.name,
          isAdmin: formik.values.isAdmin,
        };
      }
      // console.log(id);
      const res = await dispatch(updateUser({ id, data: data }));
      if (res.error) {
        return toast.error(res.error.message);
      } else {
        toast.success("Successfuly");
        return navigate("/users");
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(getUser(id));
      if (res.error) {
        toast.error(res.payload);
      } else {
        formik.setFieldValue("username", res.payload.username);
        formik.setFieldValue("email", res.payload.email);
        formik.setFieldValue("name", res.payload.name);
        formik.setFieldValue("isAdmin", res.payload.isAdmin);
      }
    };
    fetchData();
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
                fullWidth
                label="Username"
                margin="normal"
                disabled
                name="username"
                type="username"
                value={formik.values.username}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email"
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                variant="outlined"
              />
            </Grid>

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
                select
                helperText={formik.touched.isAdmin && formik.errors.isAdmin}
                label="Permission"
                name="isAdmin"
                onChange={formik.handleChange}
                value={formik.values.isAdmin}
                style={{ width: "200px" }}
                variant="outlined"
              >
                <MenuItem value={1}>Admin</MenuItem>
                <MenuItem value={2}>Member</MenuItem>
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

export default UserProfileDetails;
