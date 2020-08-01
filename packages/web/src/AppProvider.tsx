import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

// RTL
import { create } from "jss";
import preset from "jss-preset-default";
import rtl from "jss-rtl";
import { createMuiTheme } from "@material-ui/core/styles";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThemeProvider, StylesProvider } from "@material-ui/styles";
import { isRTL } from "./helpers/constants";

const AppProvider: React.FC = ({ children }) => {
  const theme = createMuiTheme({
    direction: isRTL ? "rtl" : "ltr",
  });

  const presets = preset().plugins;
  const rtlPresets = [...presets, rtl()];

  const jss = create({ plugins: isRTL ? rtlPresets : undefined });

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
