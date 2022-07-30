import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/reducer/UserSlice";
import { toast } from "react-toastify";
// import { addUser } from "src/redux/UserProfileSlice/userProfileAction";

const dataUser = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(4, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  name: Yup.string().required("Required"),
  isAdmin: Yup.number().default(2),
});

const AddUserForm = ({ setOpen }) => {
  const { error } = useSelector(({ userData }) => userData);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      name: "",
      isAdmin: 2,
    },
    validationSchema: dataUser,
    onSubmit: async () => {
      const res = await dispatch(addUser(formik.values));
      if (!res.error) {
        toast.success("Successfuly");
        setOpen(false);
      } else {
        toast.error(res.payload);
      }
    },
  });
  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        maxWidth: "500px",
        minHeight: "100%",
      }}
    >
      <Box
        sx={{
          my: 3,
          width: "100%",
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography color="textPrimary" variant="h4">
          Add User
        </Typography>
        <Button color="error" onClick={() => setOpen(false)}>
          <CancelIcon />
        </Button>
      </Box>

      <form onSubmit={formik.handleSubmit}>
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
        <TextField
          error={Boolean(formik.touched.username && formik.errors.username)}
          fullWidth
          helperText={formik.touched.username && formik.errors.username}
          label="Username"
          margin="normal"
          name="username"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="username"
          value={formik.values.username}
          variant="outlined"
        />
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
        <TextField
          error={Boolean(formik.touched.password && formik.errors.password)}
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

        <Box
          sx={{
            marginTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
          <Button
            style={{ width: "200px" }}
            color="primary"
            disabled={formik.isSubmitting}
            size="large"
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddUserForm;
