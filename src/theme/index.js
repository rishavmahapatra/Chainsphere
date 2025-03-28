import _ from "lodash";
import { colors, createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import typography from "./typography";

const baseOptions = {
  typography,
  overrides: {
    MuiFormLabel: {
      root: { color: "#222" },
      colorSecondary: {
        "&.Mui-focused": {
          color: "#222",
        },
      },
    },
    MuiListSubheader: {
      root: {
        color: "#000000",
        fontSize: "22px !important",
        fontWeight: "600 !important",
        lineHeight: "33px !important",
      },
    },

    MuiPickersModal: {
      dialogRoot: {
        backgroundColor: "#1d1d1d",
      },
    },
    MuiPickersCalendarHeader: {
      dayLabel: {
        color: "#fff",
      },
      iconButton: {
        padding: "6px",
      },
    },
    MuiPickersDay: {
      day: {
        color: "#fff",
      },
      dayDisabled: {
        color: "#52565c",
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: "8px",
        background: "#FFFFFF06",
      },
      input: {
        padding: "20.5px 14px",
        color: "#fff",

        borderRadius: "8px",
        "&:-webkit-autofill": {
          transitionDelay: "9999s",
          transitionProperty: "background-color, color",
        },
      },
      notchedOutline: {
        borderColor: "rgb(0 0 0 / 11%)",
      },
    },
    MuiPaper: {
      outlined: {
        padding: "20px",
        width: "100%",
      },
      root: {
        color: "#fff",
        backgroundColor: "#2D2D2D",
      },
    },
    MuiFormHelperText: {
      contained: {
        marginLeft: "0px",
        marginRight: "0px",
      },
    },
    MuiPopover: {
      root: {
        zIndex: 99999,
      },
    },

    MuiListItem: {
      root: {
        alignItems: "self-start",
      },
      gutters: {
        paddingLeft: 0,
      },
    },
    MuiCheckbox: {
      root: {
        padding: "4px",
        fontSize: "12px",
      },
      colorSecondary: {
        "&.Mui-checked": { color: "#000" },
      },
    },
    MuiFormControlLabel: {
      root: {
        paddingBottom: "0",
      },
    },
    MuiListItemSecondaryAction: {
      root: {
        right: 0,
      },
    },
    MuiDialog: {
      paperScrollPaper: {
        Width: 450,
        maxWidth: "100%",
      },
      paper: {
        overflowY: "unset",
      },
      paperWidthSm: {
        maxWidth: "600px !important",
        background: "#2D2D2D",
        borderRadius: "8px",
      },
    },
    MuiTimelineConnector: {
      root: {
        width: "2px",
        height: "108px",
        flexGrow: "1",
        backgroundColor: "transparent",
        backgroundImage: "url(./images/line.png)",
      },
    },
    MuiInputBase: {
      input: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.25)",
        height: "1.1876em",
      },
    },
    MuiInput: {
      underline: {
        "&::before": {
          borderBottom: "1px solid rgba(255, 255, 255, 0.25)",
        },
        "&::after": {},
      },
    },
    MuiBackdrop: {
      root: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
    },
    MuiButton: {
      root: {
        "&:hover": {
          backgroundColor: "none",
        },
      },
      containedSecondary: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(12.5px)",
        borderRadius: "50px",
        color: "#fff",
        fontSize: "14px",
        padding: "7px 19px",
        "&:hover": {
          color: "#ffffff",
          background: "linear-gradient(180deg, #FDA645 0%, #FF00CD 100%)",
          filter: "drop-shadow(0px 13px 27px rgba(0, 0, 0, 0.25))",
          backgroundOrigin: "border-box",
        },
      },
      containedSizeSmall: {
        fontSize: "10px",
        fontWeight: "400",
        lineHeight: "12px",
      },
      containedPrimary: {
        background:
          "linear-gradient(93.34deg, #FFC000 6.82%, #FF9500 35.9%)",
        filter: "drop-shadow(0px 13px 27px rgba(0, 0, 0, 0.25))",
        color: "black",
        borderRadius: "100px",
        whiteSpace: "pre",
        fontSize: "14px",
        lineHeight: " 21px",
        padding: "11px 35px",

        "&:hover": {
          color: "#ffffff",
          // background: "transparent",
          boxShadow:
            "0 1px 0 0 #ff00cd, 0 -1px 0 0 #7d00b9, 1px 0 0 0 #f5673f, -1px 0 0 0 #f5673f, 1px -1px 0 0 #f5673f, -1px 1px 0 0 #f5673f, 1px 1px 0 0 #f5673f, -1px -1px 0 0 #f5673f",
          // backgroundColor: "transparent",
        },
      },
      contained: {
        borderRadius: "50px",
        color: "#ffffff",
        fontWeight: 500,
        padding: "5px 19px",
        "&.Mui-disabled": {
          color: "rgb(42 22 21) !important",
          boxShadow: "none",
          backgroundColor: "rgb(101 96 96 / 88%) !important",
          // background: "rgb(101 96 96 / 88%) !important",
        },
      },
      containedSizeLarge: {
        height: "47px",
        padding: "8px 36px",
        fontSize: "16px",
      },
      outlinedPrimary: {
        color: "#ffffff",
        border: "1px solid #5F5F5F",
        lineHeight: " 21px",
        padding: "11px 35px",
        fontSize: "14px",
        background: "transparent",
        boxShadow: "none",
        whiteSpace: "pre",
        borderRadius: "100px",

        "&:hover": {
          color: "#ffffff",
          border: "1px solid transparent",
          background:
            "linear-gradient(93.34deg, #FFC000 6.82%, #FF9500 35.9%)",
          backgroundOrigin: "border-box",
        },
      },
      outlinedSizeSmall: {
        padding: "6px 23px",
        fontSize: "16px",
        lineHeight: " 24px",
      },
      outlinedSizeLarge: {
        height: "48px",
        padding: "8px 36px",
        fontSize: "16px",
        borderRadius: "50px",
      },
    },
    MuiDrawer: {
      paperAnchorDockedLeft: {
        borderRight: "0",
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "rgba(255, 255, 255, 0.25)",
      },
    },
    MuiMenu: {
      // paper: { top: "47px" },
      paper: {
        backgroundColor: "#2D2D2D",
      },
    },
    MuiMenuItem: {
      root: {
        paddingLeft: "12px",
      },
    },
    MuiSelect: {
      selectMenu: {
        paddingBottom: "20px",
        paddingTop: "20px",
      },
    },
    // MuiFormControl: {
    //   marginDense: {
    //     marginTop: "8px",
    //     marginBottom: "4px",
    //   },
    // },
    MuiTableHead: {
      root: {
        background: "linear-gradient(135deg, #FF0098 0.75%, #5D00C1 100%)",
      },
    },
    MuiTableCell: {
      head: {
        color: "#fff",
        whiteSpace: "pre",
      },
      root: {
        borderBottom: "none",
        padding: "9px 6px 9px 16px",
        textAlign: "start",
      },
      body: {
        color: "#fff",
        whiteSpace: "pre",
        fontSize: "12px",
        paddingTop: "16px",
      },
    },
    MuiTableContainer: {
      root: {
        borderRadius: "10px",
      },
    },
    MuiTypography: {
      subtitle1: {
        color: "#fff",

        fontSize: "14px",
        fontWeight: 500,
        lineHeight: " 16px",
        colorSecondary: {
          color: "#8d8989",
        },
      },
    },
  },
};

const themesOptions = {
  typography: {
    fontWeight: 400,
    fontFamily: "'Sora', sans-serif",
  },
  palette: {
    type: "light",
    action: {
      primary: "#20509e",
    },
    background: {
      default: "#FBFBFD",
      dark: "#f3f7f9",
      paper: colors.common.white,
    },
    primary: {
      main: "#898989",
      dark: "#de0d0d",
      light: "#de0d0d",
    },
    secondary: {
      main: "#fff",
    },
    warning: {
      main: "#ffae33",
      dark: "#ffae33",
      light: "#fff1dc",
    },
    success: {
      main: "#54e18c",
      dark: "#54e18c",
      light: "#e2faec",
    },
    error: {
      main: "#ff7d68",
      dark: "#ff7d68",
      light: "#ffe9e6",
    },
    text: {
      primary: "#52565c",
      secondary: "#999999",
    },
    common: {
      black: "#222222",
    },
  },
};

export const createTheme = (config = {}) => {
  let theme = createMuiTheme(_.merge({}, baseOptions, themesOptions));

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
