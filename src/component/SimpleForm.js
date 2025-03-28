import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";

import { useState } from "react";
import { Form, Formik } from "formik";
import * as yep from "yup";
import { toast } from "react-toastify";
import ApiConfig from "src/config/ApiConfig";
import axios from "axios";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const useStyles = makeStyles((theme) => ({
  mainContactusContainer: {
    border: "solid 2px transparent",
    backgroundImage:
      "linear-gradient(#0b0b0b, #0b0b0b),\n    linear-gradient(90deg, #833ab4, #fd1d1d, #fcb045)",
    backgroundOrigin: "border-box",
    backgroundClip: "content-box, border-box",
    borderRadius: "10px",
  },
  mainContainer: {
    background: "rgba(255, 255, 255, 0.025)",
    padding: "20px 30px",

    [theme.breakpoints.down("sm")]: {
      padding: "10px",
    },

    "& h1": {
      fontWeight: "100",
      fontSize: "32px",
    },
  },
  formBox: {
    "& span": {
      color: "#EB5A2C",
      fontWeight: "400",
    },
    paddingTop: "30px",
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
    padding: "20px 0px",
    "& p": {
      color: "#FFFFFF99",
    },

    "& span": {
      color: "#FF564D",
      fontWeight: "400",
    },
  },
  outlineborder1: {
    "& .react-tel-input .form-control": {
      width: "100%",
      color: "#6D6D6D",
      borderRadius: "5px",
      height: "55px",
      background: "#FFFFFF06",
      border: "1px solid #ffffff00",
    },
    "& .react-tel-input .country-list .country": {
      padding: "7px 9px",
      textAlign: "left",
      backgroundColor: "#2D2D2D",
      color: "#fff",
      "&:hover": {
        background: "#000000e3",
      },
    },
    "& .react-tel-input .selected-flag:hover, .react-tel-input .selected-flag:focus":
      {
        backgroundColor: "transparent !important",
      },
    "& .react-tel-input .selected-flag": {
      "&:hover": {
        backgroundColor: "none",
      },
      backgroundColor: "#202020",
    },
    "& .react-tel-input .selected-flag .arrow": {
      left: "20px",
    },

    "& .react-tel-input .country-list .country.highlight": {
      backgroundColor: "#000000e3",
    },
    "& .react-tel-input .flag-dropdown ": {
      backgroundColor: "transparent",
      //   borderRight: "1px solid #949494",
      border: "none",
      height: "44px",
      position: "absolute",
      top: "5px",
    },
    "& .react-tel-input .flag-dropdown.open .selected-flag": {
      background: "#FFFFFF06",
    },
  },
  mainclass: {
    padding: "50px 0px",
  },
}));
export default function SimpleForm({ type }) {
  const classes = useStyles();
  const [countryCode, setCountryCode] = useState("");
  const [isSending, setIsSending] = useState(false);
  const inistialValues = {
    firstName: "",
    email: "",
    phoneNo: "",
    message: "",
  };
  const validationSchema = yep.object().shape({
    firstName: yep
      .string()
      .required("Please enter first name")
      // .matches(/^[A-Za-z]+$/, "Only alphabets are allowed.")
      .min(3, "Please enter atleast 3 characters.")
      .max(24, "You can enter only 35 characters."),
    email: yep
      .string()
      .email("Please enter a valid email address.")
      .required("Please enter a valid email"),
    message: yep
      .string()
      .required("Please enter a message.")
      .min(3, "Please enter atleast 3 charchters.")
      .max(300, "You can not enter more than 300 charachters."),
    phoneNo: yep

      .string()
      // .matches(
      //   /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      //   "Please enter a valid number."
      // )
      .required("Please enter a valid number.")
      .min(6, "Please enter a valid phone number.")
      .max(13, "Please enter a valid phone number."),
  });

  const submitHandler = async (values) => {
    setIsSending(true);

    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.contactUs,
        data: {
          firstName: values.firstName,
          lastName: "string",
          email: values.email,
          phoneNumber: values.phoneNo?.toString(),
          description: values.message,
        },
      });
      if (res.data.status === 200) {
        setIsSending(false);
        toast.success("Your message has been sent successfully.");
      } else {
        setIsSending(false);
      }
    } catch (error) {
      console.log(error);
      setIsSending(false);
    }
  };

  return (
    <Box className={classes.mainclass}>
      <Container maxWidth="sm">
        <Box my={2} className={classes.mainContactusContainer}>
          <Box className={classes.mainContainer}>
            <Box style={{ padding: "20px 0px" }}>
              {type === "contactus" ? (
                <>
                  <Typography variant="h1">contact us</Typography>
                </>
              ) : (
                <Typography variant="h1">Get In Touch</Typography>
              )}

              <Formik
                initialValues={inistialValues}
                initialStatus={{
                  success: false,
                  successMsg: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                  submitHandler(values);
                  resetForm("");
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
                    <>
                      <Box className={classes.formBox}>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Box>
                              <Typography variant="body2">
                                Name <span>* </span>
                              </Typography>
                              <TextField
                                placeholder="Enter your first name"
                                variant="outlined"
                                name="firstName"
                                fullWidth
                                value={values.firstName}
                                onChange={handleChange}
                                error={Boolean(
                                  touched.firstName && errors.firstName
                                )}
                                onBlur={handleBlur}
                              />

                              <FormHelperText error>
                                {touched.firstName && errors.firstName}
                              </FormHelperText>
                            </Box>
                          </Grid>

                          <Grid item xs={12}>
                            <Box>
                              <Typography variant="body2">
                                Email <span>* </span>
                              </Typography>
                              <TextField
                                placeholder="Enter your email"
                                variant="outlined"
                                name="email"
                                fullWidth
                                value={values.email}
                                onChange={handleChange}
                                error={Boolean(touched.email && errors.email)}
                                onBlur={handleBlur}
                              />
                              <FormHelperText error>
                                {touched.email && errors.email}
                              </FormHelperText>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box>
                              <Typography variant="body2">
                                Mobile Number<span> *</span>
                              </Typography>
                              <FormControl
                                fullWidth
                                variant="filled"
                                className={classes.outlineborder1}
                              >
                                <PhoneInput
                                  country={"gb"}
                                  name="phoneNo"
                                  value={values.phoneNo}
                                  error={Boolean(
                                    touched.phoneNo && errors.phoneNo
                                  )}
                                  onBlur={handleBlur}
                                  onChange={(phone, e) => {
                                    setCountryCode(e.dialCode);
                                    setFieldValue("phoneNo", phone);
                                  }}
                                />
                                <FormHelperText
                                  error
                                  style={{ margin: "0px", fontSize: "12px" }}
                                >
                                  {touched.phoneNo && errors.phoneNo}
                                </FormHelperText>
                              </FormControl>
                            </Box>
                          </Grid>

                          <Grid item xs={12}>
                            <Box>
                              <Typography variant="body2">
                                Message <span>* </span>
                              </Typography>
                              <TextField
                                placeholder="Type your message here..."
                                variant="outlined"
                                name="message"
                                multiline
                                rows={6}
                                fullWidth
                                value={values.message}
                                onChange={handleChange}
                                error={Boolean(
                                  touched.message && errors.message
                                )}
                                onBlur={handleBlur}
                              />
                              <FormHelperText error>
                                {touched.message && errors.message}
                              </FormHelperText>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box style={{ paddingTop: "40px" }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          type="submit"
                          disabled={isSending}
                        >
                          {isSending ? (
                            <>
                              Please wait...
                              <ButtonCircularProgress />
                            </>
                          ) : (
                            "Submit"
                          )}
                        </Button>
                      </Box>
                    </>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
