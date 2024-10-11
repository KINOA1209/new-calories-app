import { Lock } from "@mui/icons-material";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { FormInput, FormPassword } from "components";
import { PATH } from "constant";
import { FormikHelpers, useFormik } from "formik";
import { Link } from "react-router-dom";
import { TSignIn } from "types";
import * as Yup from "yup";

interface SignInProps {
  onSubmit: (value: TSignIn, action: FormikHelpers<TSignIn>) => void;
}

export const SignInView: React.FC<SignInProps> = ({ onSubmit }) => {
  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Incorrect email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formik = useFormik({
    initialValues: { email: "", password: "" },
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
            Sign In
          </Typography>
          <FormInput
            label="Enter your email"
            name="email"
            value={formik.values.email}
            errors={formik.errors.email}
            touched={formik.touched.email}
            onChange={formik.handleChange}
          />
          <FormPassword
            name="password"
            value={formik.values.password}
            errors={formik.errors.email}
            touched={formik.touched.email}
            onChange={formik.handleChange}
          />
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
          <Typography>
            Don't have an account? Please{" "}
            <Link to={PATH.SIGN_UP} style={{ textDecoration: "none" }}>
              <span>Sign up</span>
            </Link>{" "}
            here
          </Typography>
        </Box>
      </form>
    </Box>
  );
};
