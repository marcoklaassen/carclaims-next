"use client";

import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import { brandConfig, darken } from "@/config/brand";

const { primaryColor, secondaryColor } = brandConfig;

const theme = createTheme({
  palette: {
    primary: { main: primaryColor, contrastText: '#ffffff' },
    secondary: { main: secondaryColor, contrastText: '#ffffff' },
    error: { main: darken(primaryColor, 0.2), contrastText: '#ffffff' },
    success: { main: '#63993d', contrastText: '#ffffff' },
  },
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
          borderTopRightRadius: '0px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover:not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
            borderColor: secondaryColor,
          },
          "&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
            borderColor: secondaryColor,
          },
        },
        input: {
          color: "rgba(0, 0, 0, 0.87)",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: "#C4C4C4",
        },
        bar: {
          backgroundColor: primaryColor,
        },
      },
    },
  },
});

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
