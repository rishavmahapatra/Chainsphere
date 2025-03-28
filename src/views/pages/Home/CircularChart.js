import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    width: "100%",
    "& path": {
      strokeWidth: "10px",

      [theme.breakpoints.down("sm")]: {
        strokeWidth: "5px",
      },
    },
  },
}));

export default function CircularChart() {
  const classes = useStyles();
  const options = {
    series: [24, 15, 15, 10, 10, 10, 5, 5, 4, 2],

    options: {
      chart: {
        type: "radialBar",
        height: "100%",
        width: "100%",
        // offsetY: -10, // Adjust offsetY to move the chart up
      },
      colors: [
        "#ef518d",
        "#cdda38",
        "#1ea69d",
        "#19afe7",
        // "#106db8", //
        "#f16122",
        "#9e4798",
        "#41b64d",
        "#fbef14",
        "#ef282e",
        // "#f16122",
        "#106db8", //
      ],
      // annotations: {
      //   position: "front", // Place the annotation in front of the chart
      //   x: "50%", // Center the annotation horizontally
      //   y: "50%", // Center the annotation vertically
      //   text: "0%", // Set the text to the percentage value
      //   fontSize: "0", // Set the font size of the text
      // },
      fill: {
        // opacity: 1.5,
      },

      stroke: {
        lineCap: "round",
        color: "red",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            enabled: false,
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Public Sale",
              formatter: function (w) {
                return "24%";
              },
            },
          },

          size: 50,
          hollow: {
            margin: 0,
            size: "28%",
          },
          track: {
            background: "#FFFFFF0D",
            strokeWidth: "67%",
          },
        },
      },
      labels: [
        "Public Sale",
        "Marketing ",
        "Ecosystem ",
        "Reserve",
        "Private Sale",
        "Pre Sale",
        "Seed Sale",
        "Technical Team",
        "Airdrop",
        "Advisor",
      ],
    },
  };
  return (
    <Box className={classes.mainBox}>
      <ReactApexChart
        options={options.options}
        series={options.series}
        type="radialBar"
        width="100%"
      />
    </Box>
  );
}
