"use client";

import { createTheme, ThemeProvider } from "@mui/material";

export default function FridaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            // "& .MuiOutlinedInput-notchedOutline": {
            //   borderColor: "rgb(26, 179, 185)",
            // },
            "&:hover:not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(34, 217, 220)",
            },
            "&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(34, 217, 224)",
            },
            "&.Mui-filled:not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
              borderColor: "red",
            },
          },
          input: {
            color: "rgba(0, 0, 0, 0.87)",
          },
        },
      },
      // MuiInputLabel: {
      //   styleOverrides: {
      //     root: {
      //       color: "green",
      //       "&.Mui-focused": {
      //         color: "limegreen",
      //       },
      //       "&.MuiInputLabel-shrink": {
      //         color: "orange", // Wenn Wert befüllt, auch ohne Fokus!
      //       },
      //     },
      //   },
      // },
      MuiLinearProgress:{
        styleOverrides: {
          root: {
            backgroundColor: "#C4C4C4", // Hintergrundfarbe der Leiste
          },
          bar: {
            backgroundColor: "#1AB3B9", // Farbe des Fortschrittsbalkens
          },
        },
      }
    },
  });

 return  <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
