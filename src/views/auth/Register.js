import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Typography,
  Link,
} from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { BsEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Select from "@material-ui/core/Select";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

import MenuItem from "@material-ui/core/MenuItem";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useHistory } from "react-router-dom";
import ApiConfig from "src/config/ApiConfig";
import { toast } from "react-toastify";
import moment from "moment";
import { AuthContext } from "src/context/Auth";
import { checkNumber } from "src/utils";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
const useStyles = makeStyles((theme) => ({
  mainLoginContainer: {
    background: "rgba(255, 255, 255, 0.025)",
    padding: "20px 30px",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px",
    },

    "& h1": {
      fontWeight: "100",
      fontSize: "32px",
    },
  },
  formBox: {
    paddingTop: "30px",
    "& .dateFields": {
      "& input": {
        "&::before": {
          color: "red", // Change this color to your desired one
        },
        cursor: "pointer",
        font: "inherit",
        color: "#fff",
        // width: "100%",
        border: 0,
        height: "1.1876em",
        margin: "0",
        display: "block",
        padding: "6px 0 7px",
        fontSize: "14px",
        minWidth: 0,
        boxSizing: "content-box",
        letterSpacing: "inherit",
        animationDuration: "10ms",
        padding: "20.5px 14px",
        borderRadius: "8px",
        background: "#FFFFFF06",
      },
      "& svg": {
        fontSize: "16px",
        color: "#555352",
      },
    },
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
    "& .MuiSelect-icon": {
      color: "#fff !important",
    },
    "& .MuiSvgIcon-root": {
      color: "#fff !important",
    },
  },
  BaseBox: {
    padding: "20px 0px",
    "& p": {
      color: "#FFFFFF99",
    },

    "& span": {
      color: "#FF564D",
      fontWeight: "500",
      cursor: "pointer",
      paddingLeft: "4px",
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
      backgroundColor: "#202020",
      "&:hover": {
        backgroundColor: "none",
      },
    },
    "& .react-tel-input .selected-flag .arrow": {
      left: "20px",
    },

    "& .react-tel-input .country-list .country.highlight": {
      backgroundColor: "#000000e3",
    },
    "& .react-tel-input .flag-dropdown ": {
      backgroundColor: "transparent",
      border: "none",
      height: "44px",
      position: "absolute",
      top: "5px",
    },
    "& .react-tel-input .flag-dropdown.open .selected-flag": {
      background: "#FFFFFF06",
    },
  },
  mainregister: {
    padding: "50px 0px",
  },
  CheckboxContainer: {
    display: "flex",
    maxWidth: "600px",
    "& svg": {
      color: "#FF0098",
    },
    "& p": {
      paddingLeft: "10px",
    },
    "& a": {
      color: "#FF564D",
    },
  },
  layoutBox: {
    padding: "40px 0px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px",
    },
  },
}));
export default function Register() {
  const classes = useStyles();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [states, setStates] = useState([]);
  const [showCities, setShowCities] = useState([]);
  const [showStates, setShowStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidNumber, setIsValidNumber] = useState(true);
  const [selectedDate, setSelectedDate] = React.useState(
    moment().subtract(18, "Year")
  );
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 18);

  const [checked, setChecked] = React.useState(true);
  const [agree, setAgree] = useState(false);

  const auth = useContext(AuthContext);

  const changeCountry = (e) => {
    const name = e.target.value;
    changeCountryList(name);
  };

  const changeStateList = (name) => {
    const selectted = states.filter((cont) => {
      return cont.name === name;
    });

    if (selectted.length !== 0) {
      const contId = selectted[0]?.id;
      const allCity = cities.filter((city) => {
        return city.state_id === contId;
      });
      setShowCities(allCity);
    }
  };

  const changeState = (e) => {
    const name = e.target.value;
    changeStateList(name);
  };

  const changeCountryList = (name) => {
    const selectted = countries?.filter((cont) => {
      return cont.name === name;
    });

    const contId = selectted[0]?.id;
    const allState = states?.filter((state) => {
      return state.country_id === contId;
    });
    setShowStates(allState);
  };
  useEffect(() => {
    axios.get("/json/countries.json").then(function (response) {
      setCountries(response.data.countries);
      axios.get("/json/states.json").then(function (response) {
        setStates(response.data.states);
        axios.get("/json/cities.json").then(function (response) {
          setCities(response.data.cities);
        });
      });
    });
  }, []);

  // console.log(
  //   selectedDate,
  //   " ----- selectedDate ",
  //   new Date(selectedDate).toISOString().split("T")[0]
  // );
  const AccountRegister = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.userSignUp,
        data: {
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNo: values?.phoneNo?.toString(),
          dob: new Date(selectedDate).toISOString().split("T")[0],
          country: values.country,
          state: values.state,
          ibiName: values.IBIName,
          zipCode: values.zipcode,
          ibiId: values.IBIID,
          address: values.address,
          city: values.cities,
          // volumeAccount: values.volume,
        },
      });

      if (res.data.status === 200) {
        setIsLoading(false);
        toast.success("Your account created successfully");
        auth.setEndtime(moment().add(3, "m").unix());
        window.sessionStorage.setItem("email", values.email);
        history.push({
          pathname: "/verify-otp",
          state: {
            email: values.email,
          },
        });
      } else {
        toast.error(res?.data?.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
      if (error) {
        toast.error(error.res.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };
  const initialFormValues = {
    firstName: "",
    lastName: "",
    IBIName: "",
    IBIID: "",
    email: "",
    address: "",
    zipcode: "",
    phoneNo: "",
    password: "",
    country: "",
    state: "",
    cities: "",
    confirmPassword: "",
    // volume: "",
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
      .min(6, "Please enter at least 6 characters")
      .max(20, "You can enter only 20 characters"),
    confirmPassword: yup
      .string()
      .required("Confirmation of your password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    lastName: yup
      .string("Please enter valid last name")
      .required("Last name is required  ")
      .strict(true)
      .nullable()

      .min(3, "Please enter atleast 3 characters.")
      .max(35, "You can enter only 35 characters.")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
        "Only alphabets and white spaces are allowed for this field . "
      ),
    firstName: yup
      .string("Please enter valid first name")
      .required("First name is required  ")
      .strict(true)
      .nullable()

      .min(3, "Please enter atleast 3 characters.")
      .max(35, "You can enter only 35 characters.")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
        "Only alphabets and white spaces are allowed for this field . "
      ),
    IBIID: yup.string().required("IBI ID is required"),
    IBIName: yup
      .string("Please enter valid last name")
      .required("IBN name is required  ")
      .strict(true)
      .nullable()
      .min(2, "IBN name should be at least 2 characters long")
      .max(35, "IBN name should not be more than 35 characters"),
    // .matches(
    //   /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
    //   "Only alphabets and white spaces are allowed for this field . "
    // ),
    // phoneNo: yup
    //   .string()
    //   .required("Mobile number is required")
    //   .matches(
    //     /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    //     "Must be a valid mobilie"
    //   )
    //   .max(13, "Should not exceeds 13 digits")
    //   .min(9, "Must be only 9 digits"),
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Email address is required")
      .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
    country: yup.string().required("Country is required"),
    state: yup.string().required("State name is required"),
    // volume: yup.string().required("Volume allocation is required"),
    cities: yup.string().required("cities is required"),
    address: yup
      .string("Please enter valid address")
      .required("Address is required ")
      .min(10, "Please enter at least 10 characters")
      .max(350, "You can enter only 350 characters"),
    zipcode: yup
      .string("Please enter valid ZipCode")
      .required("ZipCode is required  "),
  });
  const handleChange1 = (event) => {
    setChecked(event.target.checked);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    // console.log(date.target.value);
  };

  return (
    <Box className={classes.mainregister}>
      <Container>
        <Box className={classes.mainLoginContainer}>
          <IconButton
            onClick={() => history.goBack()}
            style={{ background: "#1b1b1b" }}
          >
            <MdOutlineKeyboardBackspace style={{ color: "#fff" }} />
          </IconButton>
          <Box className={classes.layoutBox}>
            <Typography variant="h1">Register</Typography>
            <Formik
              initialValues={initialFormValues}
              validationSchema={validationFormSchema}
              onSubmit={AccountRegister}
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
                    <Grid container spacing={3}>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box>
                          <Typography variant="body1">First Name</Typography>
                          <TextField
                            placeholder="Enter your first name"
                            variant="outlined"
                            name="firstName"
                            fullWidth
                            value={values.firstName}
                            error={Boolean(
                              touched.firstName && errors.firstName
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <FormHelperText error>
                            {touched.firstName && errors.firstName}
                          </FormHelperText>
                        </Box>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box>
                          <Typography variant="body1">Last Name</Typography>
                          <TextField
                            placeholder="Enter your last name"
                            variant="outlined"
                            name="lastName"
                            fullWidth
                            value={values.lastName}
                            error={Boolean(touched.lastName && errors.lastName)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <FormHelperText error>
                            {touched.lastName && errors.lastName}
                          </FormHelperText>
                        </Box>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box>
                          <Typography variant="body1">Email</Typography>
                          <TextField
                            placeholder="Enter your email"
                            variant="outlined"
                            name="email"
                            fullWidth
                            value={values.email}
                            error={Boolean(touched.email && errors.email)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <FormHelperText error>
                            {touched.email && errors.email}
                          </FormHelperText>
                        </Box>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box>
                          <Typography variant="body1">Mobile Number</Typography>
                          <FormControl
                            fullWidth
                            variant="filled"
                            className={classes.outlineborder1}
                          >
                            <PhoneInput
                              country={"it"}
                              name="phoneNo"
                              value={values.phoneNo}
                              error={Boolean(touched.phoneNo && errors.phoneNo)}
                              onBlur={handleBlur}
                              onChange={(phone, e) => {
                                setCountryCode(e.dialCode);
                                setFieldValue("phoneNo", phone);
                                const number = phone.slice(
                                  e.dialCode.length,
                                  phone.length
                                );
                                const check = checkNumber(number);
                                setIsValidNumber(check);
                              }}
                            />
                            <FormHelperText
                              error
                              style={{ margin: "0px", fontSize: "12px" }}
                            >
                              {touched.phoneNo && errors.phoneNo}
                            </FormHelperText>
                            {!isValidNumber && (
                              <FormHelperText error>
                                Please enter a valid number.
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box>
                          <Typography variant="body1">Country</Typography>
                          <FormControl fullWidth>
                            <Select
                              variant="outlined"
                              name="country"
                              error={Boolean(touched.country && errors.country)}
                              onBlur={handleBlur}
                              value={values?.country}
                              onChange={(e) => {
                                handleChange(e);
                                changeCountry(e);
                              }}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {countries.map((countries) => {
                                return (
                                  <MenuItem
                                    key={countries.name + countries.id}
                                    value={countries.name}
                                  >
                                    {countries.name}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                          <FormHelperText error>
                            {touched.country && errors.country}
                          </FormHelperText>
                        </Box>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box>
                          <Typography variant="body1">State</Typography>
                          <TextField
                            placeholder="Enter your state"
                            variant="outlined"
                            name="state"
                            fullWidth
                            value={values.state}
                            error={Boolean(touched.state && errors.state)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {/* <FormControl fullWidth>
                            <Select
                              fullWidth
                              variant="outlined"
                              name="state"
                              value={values?.state}
                              error={Boolean(touched.state && errors.state)}
                              onBlur={handleBlur}
                              onChange={(e) => {
                                changeState(e);
                                handleChange(e);
                              }}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {showStates.length !== 0 &&
                                showStates.map((state) => {
                                  return (
                                    <MenuItem
                                      key={state.name + state.id}
                                      value={state.name}
                                    >
                                      {state.name}
                                    </MenuItem>
                                  );
                                })}
                            </Select>
                          </FormControl> */}
                          <FormHelperText error>
                            {touched.state && errors.state}
                          </FormHelperText>
                        </Box>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box>
                          <Typography variant="body1">City</Typography>
                          {/* {showCities.length == 0 && values?.state ? ( */}
                          <TextField
                            placeholder="Enter your city"
                            variant="outlined"
                            name="cities"
                            fullWidth
                            value={values.cities}
                            error={Boolean(touched.cities && errors.cities)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {/* ) : (
                            <FormControl fullWidth>
                              <Select
                                fullWidth
                                name="cities"
                                variant="outlined"
                                value={values?.cities}
                                error={Boolean(touched.cities && errors.cities)}
                                onBlur={handleBlur}
                                onChange={(e) => {
                                  setCities(e);
                                  handleChange(e);
                                }}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                {showCities.length !== 0 &&
                                  showCities.map((cities) => {
                                    return (
                                      <MenuItem
                                        key={cities.name + cities.id}
                                        value={cities.name}
                                      >
                                        {cities.name}
                                      </MenuItem>
                                    );
                                  })}
                              </Select>
                            </FormControl>
                          )} */}
                          <FormHelperText error>
                            {touched.cities && errors.cities}
                          </FormHelperText>
                        </Box>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box>
                          <Typography variant="body1">Address</Typography>
                          <TextField
                            placeholder="Enter your address"
                            variant="outlined"
                            name="address"
                            fullWidth
                            value={values.address}
                            error={Boolean(touched.address && errors.address)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <FormHelperText error>
                            {touched.address && errors.address}
                          </FormHelperText>
                        </Box>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box>
                          <Typography variant="body1">Zipcode</Typography>
                          <TextField
                            placeholder="Enter zipcode"
                            variant="outlined"
                            className="webkitcss"
                            name="zipcode"
                            // type="number"
                            fullWidth
                            value={values.zipcode}
                            error={Boolean(touched.zipcode && errors.zipcode)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{ maxLength: 10 }}
                            onKeyPress={(event) => {
                              if (
                                event?.key === "-" ||
                                event?.key === "+" ||
                                event?.key === "#" ||
                                event?.key === "("
                              ) {
                                event.preventDefault();
                              }
                            }}
                          />
                          <FormHelperText error>
                            {touched.zipcode && errors.zipcode}
                          </FormHelperText>
                        </Box>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box>
                          <Typography variant="body1">Date of Birth</Typography>
                          <FormControl fullWidth className="">
                            <KeyboardDatePicker
                              // disableToolbar
                              inputVariant="outlined"
                              format="DD/MM/YYYY"
                              disableFuture
                              fullWidth
                              name="selectedDate"
                              error={Boolean(
                                touched.selectedDate && errors.selectedDate
                              )}
                              onBlur={handleBlur}
                              value={selectedDate}
                              onChange={handleDateChange}
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                              InputProps={{
                                readOnly: true, // Make the input field read-only
                              }}
                              maxDate={moment().subtract(18, "Year")}
                            />
                            {/* <input
                              type="date"
                              name="selectedDate"
                              error={Boolean(
                                touched.selectedDate && errors.selectedDate
                              )}
                              format="DD/MM/YYYY"
                              onBlur={handleBlur}
                              value={selectedDate}
                              onChange={handleDateChange}
                              //  max={new Date().toISOString().split("T")[0]} // Set a maximum date (e.g., today)
                              max={minDate.toISOString().split("T")[0]} // Set a minimum date (18 years ago)
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                              InputProps={{
                                readOnly: true, // Make the input field read-only
                              }}
                            /> */}
                          </FormControl>
                          <FormHelperText error>
                            {!selectedDate && "Date of birth is required"}
                          </FormHelperText>
                          {/* <FormHelperText error>
                            {touched.selectedDate && errors.selectedDate}
                          </FormHelperText> */}
                        </Box>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box>
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
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box>
                          <Typography variant="body1">
                            Confirm Password
                          </Typography>
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
                                  onClick={() =>
                                    setShowPassword1(!showPassword1)
                                  }
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
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box>
                          <Typography variant="body1">IBI Name</Typography>
                          <TextField
                            placeholder="Enter IBI Name"
                            type="name"
                            variant="outlined"
                            name="IBIName"
                            fullWidth
                            inputProps={{ maxLength: 35 }}
                            value={values.IBIName}
                            error={Boolean(touched.IBIName && errors.IBIName)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <FormHelperText error>
                            {touched.IBIName && errors.IBIName}
                          </FormHelperText>
                        </Box>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box>
                          <Typography variant="body1">IBI ID</Typography>
                          <TextField
                            placeholder="Enter IBI ID"
                            variant="outlined"
                            name="IBIID"
                            type="number"
                            fullWidth
                            onInput={(e) => {
                              e.target.value = Math.max(
                                0,
                                parseInt(e.target.value)
                              )
                                .toString()
                                .slice(0, 16);
                            }}
                            onKeyPress={(event) => {
                              if (event?.key === "-" || event?.key === "+") {
                                event.preventDefault();
                              }
                            }}
                            value={values.IBIID}
                            error={Boolean(touched.IBIID && errors.IBIID)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className="webkitcss"
                          />
                          <FormHelperText error>
                            {touched.IBIID && errors.IBIID}
                          </FormHelperText>
                        </Box>
                      </Grid>
                      {/* <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box>
                          <Typography variant="body1">
                            Volume Allocation
                          </Typography>
                          <FormControl
                            variant="outlined"
                            fullWidth
                            className={classes.forminput}
                          >
                            <Select
                              name="volume"
                              value={values.volume}
                              error={Boolean(touched.volume && errors.volume)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            
                              // onChange={(e) => volume(e.target.value)}
                            >
                              <MenuItem value={0}>-Select Volume -</MenuItem>
                              <MenuItem value="1 month">1 month</MenuItem>
                              <MenuItem value="3 month">3 month</MenuItem>
                              <MenuItem value="6 month">6 month</MenuItem>
                            </Select>
                            <FormHelperText error>
                              {touched.volume && errors.volume}
                            </FormHelperText>
                          </FormControl>
                        </Box>
                      </Grid> */}
                    </Grid>
                  </Box>
                  <Box className={classes.BaseBox}>
                    <Typography variant="body1" style={{ padding: "15px 0px" }}>
                      Already have an account?
                      <span onClick={() => history.push("/login")}>
                        Sign-In
                      </span>
                    </Typography>
                    <Box className={classes.CheckboxContainer}>
                      <Box>
                        <Checkbox
                          checked={agree}
                          onChange={(e) => setAgree(e.target.checked)}
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                      </Box>
                      <Typography variant="body1">
                        By clicking you confirm that, you've read, understood
                        and agreed to the{" "}
                        <Link
                          // target="_blank"
                          href="images/Terms_and_Conditions_1.01-0223.pdf"
                          target="_blank"
                        >
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link href="images/privacy-policy.pdf" target="_blank">
                          Privacy Policy.
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    color="secondary"
                    // onClick={() => history.push("/verify-otp")}
                    disabled={isLoading || !agree}
                  >
                    Register
                    {isLoading && <ButtonCircularProgress />}
                  </Button>
                  <Box
                    className={classes.BaseBox}
                    style={{ paddingTop: "20px" }}
                  ></Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
