import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  TextField,
  IconButton,
  Link,
  Checkbox,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { RiHeadphoneFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yep from "yup";
import { toast } from "react-toastify";
import ApiConfig from "src/config/ApiConfig";
import axios from "axios";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
const useStyles = makeStyles((theme) => ({
  contactbox: {
    padding: "30px 0px",
    position: "relative",
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.025)",
    [theme.breakpoints.down("sm")]: {
      padding: "60px 0px",
    },
    "& .textbox": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      bottom: "200px",
      zIndex: "1",
      position: "absolute",
      width: "100%",
      "@media(max-width:1236px)": {
        bottom: "110px",
      },
      "@media(max-width:669px)": {
        bottom: "135px",
      },
    },
  },
  rightdetailbox: {
    padding: "50px",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 20px 30px 20px",
    },
    "@media(max-width:415px)": {
      padding: "20px 5px 30px 5px",
    },
    "& h1": {
      margin: "40px 0px 40px",
    },
    "& label": {
      fontFamily: "'Sora', sans-serif",
      fontSize: "16px",
      fontWeight: "300",
    },

    "& .supportdetails": {
      "& h3": {
        marginBottom: "10px",
      },
      "& p": {
        fontWeight: "400",
      },
      "& h6": {
        color: "rgba(255, 255, 255, 0.87)",
        fontWeight: "300",
        fontSize: "14px",
        wordBreak: "break-word",
      },
      "& a": {
        color: "rgba(255, 255, 255, 0.87)",
        fontWeight: "300",
        fontSize: "14px",
        wordBreak: "break-word",
        cursor: "pointer",
      },
    },
    "& .supportleft": {
      position: "relative",
      "&::after": {
        top: "6%",
        right: "0%",
        width: "37px",
        height: "149px",
        content: "''",
        position: "absolute",
        borderRight: "1px solid rgba(255, 255, 255, 0.25)",
        [theme.breakpoints.down("sm")]: {
          height: "0px",
        },
      },
    },
    "& .phoneflex": {
      display: "flex",
      alignItems: "center",
      "@media(max-width:415px)": {
        display: "block",
      },
    },
    "& .textcontrol": {
      width: "100%",
      textAlign: "center",
      maxWidth: "155px",
      marginBottom: "3px",
      "& span": {
        fontSize: "40px",
        color: theme.palette.text.icontext,
      },
    },
    "& .checkboxfield": {
      "& span": {
        fontSize: "16px",
        fontWeight: "300",
        color: "rgba(255, 255, 255, 0.87)",
      },
      "& a": {
        marginLeft: "4px !important",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "400",
        fontSize: "16px",
      },
    },
  },
  textfieldbox: {
    border: "none",
    color: "#fff",
    background: "none !important",

    "& input": {
      marginTop: "8px",
      marginBottom: "4px",
    },
    "& .MuiOutlinedInput-inputMultiline": {
      background: "none",
    },
  },
}));
function ConnectUs() {
  const classes = useStyles();
  const [agree, setAgree] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const inistialValues = {
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    message: "",
  };
  const validationSchema = yep.object().shape({
    firstName: yep
      .string()
      .required("First name is required.")
      .matches(/^[A-Za-z]+$/, "Only alphabets are allowed.")
      .min(3, "Please enter atleast 3 characters.")
      .max(24, "You can enter only 24 characters."),
    lastName: yep
      .string()
      .required("Last name is required.")
      .matches(/^[A-Za-z]+$/, "Only alphabets are allowed.")
      .min(3, "Please enter atleast 3 characters.")
      .max(24, "You can enter only 24 characters."),
    email: yep
      .string()
      .email("Please enter a valid email address.")
      .required("Email is required."),
    message: yep
      .string()
      .required("Message is required.")
      .min(50, "Please enter atleast 50 charchters.")
      .max(300, "You can not enter more than 300 charachters."),
    number: yep

      .string()
      // .matches(
      //   /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      //   "Please enter a valid number."
      // )
      .required("Mobile number is required.")
      .min(6, "Please enter a valid phone number.")
      .max(13, "Please enter a valid phone number."),
  });

  const submitHandler = async (values) => {
    try {
      setIsSending(true);

      const res = await axios({
        method: "POST",
        url: ApiConfig.contactUs,
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.number?.toString(),
          message: values.message,
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
    <Box className={classes.contactbox}>
      <Box>
        <Container>
          <Box className={classes.topmargin}>
            <Grid container alignItems="center">
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <img src="images/contactimg.webp" alt="" width="100%" />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Box className={classes.rightdetailbox}>
                  <Box className="supportdetails">
                    <Grid container spacing={2}>
                      {/* <Grid item lg={6} md={6} sm={4} xs={6}>
                        <Box className="supportleft">
                          <Box className="textcontrol">
                            <IconButton>
                              <RiHeadphoneFill
                                style={{ color: "rgba(255, 255, 255, 0.6)" }}
                              />
                            </IconButton>
                            <Typography variant="h3" color="secondary">
                              Phone
                            </Typography>
                          </Box>
                          <Box className="phoneflex">
                            <Typography variant="body2" color="secondary">
                              Phone
                            </Typography>
                            <Typography variant="h6" color="secondary">
                              &nbsp;&nbsp;+87 563 245 521
                            </Typography>
                          </Box>
                          <Box className="phoneflex">
                            <Typography variant="body2" color="secondary">
                              Phone
                            </Typography>
                            <Typography variant="h6" color="secondary">
                              &nbsp;&nbsp;+87 563 245 521
                            </Typography>
                          </Box>
                        </Box>
                      </Grid> */}
                      <Grid item lg={12} md={12} sm={12} xs={12} align="center">
                        <Box className="supportright">
                          <Box className="textcontrol">
                            <IconButton>
                              <MdEmail
                                style={{ color: "rgba(255, 255, 255, 0.6)" }}
                              />
                            </IconButton>
                            <Typography variant="h3" color="secondary">
                              Email
                            </Typography>
                          </Box>

                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            href="mailto:Contact@fierex.com"
                          >
                            <Link variant="h6" color="secondary">
                              Contact@fierex.com
                            </Link>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box mb={3}>
                    <Typography variant="h1">Connect With Us</Typography>
                  </Box>
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
                          <Grid container spacing={2}>
                            <Grid item lg={6} md={6} sm={6} xs={12}>
                              <Box>
                                <label>FIRST NAME</label>

                                <TextField
                                  id="standard-basic"
                                  placeholder="Enter your first name"
                                  name="firstName"
                                  fullWidth
                                  className={classes.textfieldbox}
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
                            <Grid item lg={6} md={6} sm={6} xs={12}>
                              <Box>
                                <label>LAST NAME</label>
                                <TextField
                                  id="standard-basic"
                                  placeholder="Enter your last name"
                                  name="lastName"
                                  fullWidth
                                  className={classes.textfieldbox}
                                  value={values.lastName}
                                  onChange={handleChange}
                                  error={Boolean(
                                    touched.lastName && errors.lastName
                                  )}
                                  onBlur={handleBlur}
                                />
                                <FormHelperText error>
                                  {touched.lastName && errors.lastName}
                                </FormHelperText>
                              </Box>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={12}>
                              <Box mt={2}>
                                <label>EMAIL</label>
                                <TextField
                                  id="standard-basic"
                                  placeholder="Enter your email Id"
                                  name="email"
                                  fullWidth
                                  className={classes.textfieldbox}
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
                            <Grid item lg={6} md={6} sm={6} xs={12}>
                              <Box mt={2}>
                                <label>PHONE</label>
                                <TextField
                                  id="standard-basic"
                                  placeholder="Enter your contact details"
                                  name="number"
                                  type="number"
                                  className={`${classes.textfieldbox} webkitcss`}
                                  fullWidth
                                  value={values.number}
                                  onChange={handleChange}
                                  error={Boolean(
                                    touched.number && errors.number
                                  )}
                                  onBlur={handleBlur}
                                />
                                <FormHelperText error>
                                  {touched.number && errors.number}
                                </FormHelperText>
                              </Box>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={12}>
                              <Box mt={2}>
                                <label>MESSAGE</label>
                                <TextField
                                  id="standard-basic"
                                  placeholder="Enter your message..."
                                  className={classes.textfieldbox}
                                  name="message"
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
                            <Box className="checkboxfield">
                              <Typography variant="body2">
                                <Checkbox
                                  color="green"
                                  type="checkbox"
                                  id="acceptTerms"
                                  inputProps={{
                                    "aria-label": "secondary checkbox",
                                  }}
                                  checked={agree}
                                  onChange={(e) => setAgree(e.target.checked)}
                                  style={{ color: "#9b01b1" }}
                                />
                                <span>Opt in for marketing communication</span>
                                &nbsp;
                                <Link
                                  to="images/privacy-policy.pdf"
                                  target="_blank"
                                  style={{ textDecoration: "underline" }}
                                >
                                  Privacy Policy
                                </Link>
                              </Typography>
                            </Box>
                          </Grid>
                          <Box mt={6}>
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                              disabled={isSending}
                            >
                              {isSending ? (
                                <>
                                  Please wait...
                                  <ButtonCircularProgress />
                                </>
                              ) : (
                                "Let’s Talk"
                              )}
                            </Button>
                          </Box>
                        </>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default ConnectUs;
