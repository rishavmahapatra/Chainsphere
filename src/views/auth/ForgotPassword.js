import {
  Box,
  Button,
  FormHelperText,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import ApiConfig from "src/config/ApiConfig";
import { Form, Formik } from "formik";
import * as yep from "yup";
import { useHistory } from "react-router-dom";
import { AuthContext } from "src/context/Auth";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
const useStyles = makeStyles((theme) => ({
  mainLoginContainer: {
    background: "rgba(255, 255, 255, 0.025)",
    padding: "50px 20px 20px",
    borderRadius: "15px",

    "& h1": {
      fontWeight: "100",
      fontSize: "32px",
    },
  },
  formBox: {
    "& svg": {
      fontSize: "16px",
      color: "#555352",
    },
    "& .MuiFormHelperText-root.Mui-error": {
      color: "#BB2C2C !important",
      padding: "0px",
    },
    "& p": {
      color: "#fff !important",
      paddingBottom: "8px",
    },
  },
  BaseBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& p": {
      color: "#FFFFFF99",
    },

    "& span": {
      color: "#FF564D",
      fontWeight: "500",
      cursor: "pointer",
    },
  },
}));
export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setLoader] = useState(false);
  const auth = useContext(AuthContext);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleFormSubmit = async (values) => {
    try {
      setLoader(true);

      const res = await axios({
        method: "GET",
        url: ApiConfig.forgotPassword,
        params: {
          email: values.email,
        },
      });
      if (res.data.status === 200) {
        toast.success(res.data.message);
        window.localStorage.setItem("email", values.email);

        setLoader(false);
        setIsSubmit(true);
        auth.setEndtime(moment().add(3, "m").unix());

        history.push({
          pathname: "/verify-password-otp",
          search: values.email,
          state: { email: values.email },
        });
      } else {
        setLoader(false);
        toast.warn(res.data.message);
      }
    } catch (error) {
      setLoader(false);
      if (error.response) {
        if (error.response.data.status == 500) {
          toast.error("Your email does not found in database");
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error(error.message);
      }
    }
  };
  const validationFormSchema = yep.object().shape({
    email: yep
      .string()
      .email("You have entered an invalid email address. Please try again")
      .max(250, "Only 250 character are allowed.")

      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
      .required("Email address is required"),
  });
  return (
    <Box>
      <Box my={2} className={classes.mainLoginContainer}>
        <Box>
          <Box>
            <Typography variant="h1">Forgot Password</Typography>
            <Box py={2}>
              <Typography variant="body1">
                If you forgot your password, well then we’ll email you
                instructions to reset your password.
              </Typography>
            </Box>
            <Formik
              onSubmit={(values) => handleFormSubmit(values)}
              initialValues={{
                email: "",
              }}
              validationSchema={validationFormSchema}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values,
                setFieldValue,
              }) => (
                <Form>
                  <Box className={classes.formBox}>
                    <Box>
                      <Typography variant="body2">Email</Typography>
                      <TextField
                        placeholder="Enter your email"
                        variant="outlined"
                        name="email"
                        type="email"
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText error>
                        {touched.email && errors.email}
                      </FormHelperText>
                    </Box>
                  </Box>
                  <Box pt={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      // onClick={() => history.push("/verify-otp")}
                      type="submit"
                      disabled={isLoading}
                    >
                      Send OTP To Email
                      {isLoading && <ButtonCircularProgress />}
                    </Button>
                  </Box>

                  <Box
                    className={classes.BaseBox}
                    style={{ paddingTop: "20px" }}
                  >
                    <Typography variant="body2">
                      Back to.
                      <span onClick={() => history.push("/login")}> Login</span>
                    </Typography>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
