import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

// RTL
import { create } from "jss";
import rtl from "jss-rtl";
import { createMuiTheme } from "@material-ui/core/styles";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThemeProvider, StylesProvider, jssPreset } from "@material-ui/styles";
import { isRTL } from "./helpers/constants";

const AppProvider: React.FC = ({ children }) => {
  const theme = createMuiTheme({
    direction: isRTL ? "rtl" : "ltr",
  });

  const presets = [...jssPreset().plugins];
  const rtlPresets = [...presets, rtl()];

  const jss = create({ plugins: isRTL ? rtlPresets : presets });

  document.body.style.direction = isRTL ? "rtl" : "ltr";

  return (
    <Router>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </StylesProvider>
    </Router>
  );
};

export default AppProvider;
