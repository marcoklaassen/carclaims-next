"use client";

import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ReactNode } from "react";

  const theme = createTheme({
    components: {
      MuiAccordion: {
        styleOverrides: {
          root: {
            marginBottom: '16px',
            boxShadow: 'none',
            borderRadius: '10px',
            border: '1px solid rgb(209, 213, 219)',
            transition: 'all 0.2s ease-in-out',
            '&:before': {
              display: 'none',
            },
            '&:hover': {
              backgroundColor: 'rgba(240, 240, 240, 0.3)',
              borderColor: 'rgb(190, 200, 210)',
            },
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            padding: '20px',
            borderTop: '1px solid rgb(209, 213, 219)',
            backgroundColor: 'white',
            borderRadius: '10px',
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px'
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
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
      MuiLinearProgress: {
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

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
