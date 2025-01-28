import { StrictMode } from "react";
import React from 'react';
import { createRoot } from 'react-dom/client';

import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import App from "./App.jsx";

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "./styles/global.css";
import theme from "./styles/theme.js";
import { BrowserRouter } from "react-router-dom";
import SessionContextProvider from "./context/SessionContext.jsx";



createRoot(document.getElementById("root")).render(
   <StrictMode>
      <BrowserRouter>
          <SessionContextProvider>
            <App />
          </SessionContextProvider>
      </BrowserRouter>
   </StrictMode>
);