import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { BsEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

import { Form, Formik } from "formik";
import * as yup from "yup";
import { useHistory, useLocation } from "react-router-dom";
import ApiConfig from "src/config/ApiConfig";
import axios from "axios";
import { toast } from "react-toastify";
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
    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#BB2C2C !important",
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
    margin: "25px 0px",
    "& p": {
      color: "#FFFFFF99",
    },

    "& span": {
      color: "#FF564D",
      fontWeight: "500",
    },
  },
}));
export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  // const otp = location?.state?.OTP;
  const location = useLocation();

  const resetPaswordHandler = async (values) => {
    try {
      setIsLoading(true);

      const res = await axios({
        method: "POST",
        url: ApiConfig.resetPassword,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        data: {
          email: window.location.search.split("?")[1],
          password: values.password,
          token: otp,
        },
      });

      if (res.data.status === 200) {
        toast.success("Your password has been updated successfully");
        setIsLoading(false);
        setOpen(true);
        history.push("/login");
      } else if (res.status === 500) {
        toast.error("Invalid user");
      }
    } catch (err) {
      // toast.error(err.message)
      toast.error("Invalid user");
      console.log(err);
      setIsLoading(false);
    }
  };

  const initialFormValues = {
    password: "",
    confirmPassword: "",
  };
  const validationFormSchema = yup.object().shape({
    password: yup
      .string()
      .trim()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .required("Password is required")
      .min(6, "Please enter atleast 6 characters")
      .max(20, "You can enter only 30 characters"),
    confirmPassword: yup
      .string()
      .required("Confirmation of your password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  useEffect(() => {
    const data = location.state;
    if (data) {
      setOtp(data?.otp);
      setEmail(data?.email);
    }
  }, [location]);

  return (
    <Box>
      <Box my={2} className={classes.mainLoginContainer}>
        <Box>
          <Typography variant="h1">Reset Password</Typography>

          <Formik
            initialValues={initialFormValues}
            validationSchema={validationFormSchema}
            onSubmit={resetPaswordHandler}
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
                  <Box pt={2}>
                    <Typography variant="body1">Password</Typography>
                    <TextField
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter you password"
                      variant="outlined"
                      fullWidth
                      value={values.password}
                      error={Boolean(touched.password && errors.password)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <BsEyeFill />
                            ) : (
                              <BsFillEyeSlashFill />
                            )}
                          </IconButton>
                        ),
                      }}
                    />
                    <FormHelperText error>
                      {touched.password && errors.password}
                    </FormHelperText>
                  </Box>
                  <Box pt={2}>
                    <Typography variant="body1">Confirm Password</Typography>
                    <TextField
                      type={showPassword1 ? "text" : "password"}
                      placeholder="Enter confirm password"
                      name="confirmPassword"
                      variant="outlined"
                      fullWidth
                      value={values.confirmPassword}
                      error={Boolean(
                        touched.confirmPassword && errors.confirmPassword
                      )}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            onClick={() => setShowPassword1(!showPassword1)}
                          >
                            {showPassword1 ? (
                              <BsEyeFill />
                            ) : (
                              <BsFillEyeSlashFill />
                            )}
                          </IconButton>
                        ),
                      }}
                    />
                    <FormHelperText error>
                      {touched.confirmPassword && errors.confirmPassword}
                    </FormHelperText>
                  </Box>
                </Box>
                <Box py={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    disabled={isLoading}
                  >
                    Submit {isLoading && <ButtonCircularProgress />}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}
