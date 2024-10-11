import { Lock } from "@mui/icons-material";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { FormInput, FormPassword } from "components";
import { PATH } from "constant";
import { FormikHelpers, useFormik } from "formik";
import { Link } from "react-router-dom";
import { TSignUp } from "types";
import * as Yup from "yup";

interface SignUpProps {
  onSubmit: (value: TSignUp, action: FormikHelpers<TSignUp>) => void;
}

export const SignUpView: React.FC<SignUpProps> = ({ onSubmit }) => {
  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Incorrect email format")
      .required("Email is required"),
    name: Yup.string().required("Name is required"),
    password: Yup.string().required("Password is required"),
  });
  const formik = useFormik({
    initialValues: { email: "", name: "", password: "" },
    validationSchema: SignInSchema,
    onSubmit,
  });
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={6}
      alignItems={"center"}
      justifyContent={"center"}
      height={"calc(100vh - 112px)"}
    >
      <form onSubmit={formik.handleSubmit}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          width={360}
          alignItems={"center"}
        >
          <Avatar sx={{ bgcolor: blue[500] }}>
            <Lock fontSize="inherit" />
          </Avatar>
          <Typography variant="h3" align="center">
            Sign Up
          </Typography>
          <FormInput
            label="Enter your email"
            name="email"
            value={formik.values.email}
            errors={formik.errors.email}
            touched={formik.touched.email}
            onChange={formik.handleChange}
          />
          <FormInput
            label="Enter your name"
            name="name"
            value={formik.values.name}
            errors={formik.errors.name}
            touched={formik.touched.name}
            onChange={formik.handleChange}
          />
          <FormPassword
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            errors={formik.errors.password}
            touched={formik.touched.password}
          />
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
          <Typography>
            Already have an account? Please{" "}
            <Link to={PATH.SIGN_IN} style={{ textDecoration: "none" }}>
              <span>Sign in</span>
            </Link>{" "}
            here
          </Typography>
        </Box>
      </form>
    </Box>
  );
};
