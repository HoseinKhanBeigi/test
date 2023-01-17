import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { SnackbarProvider, useSnackbar } from "notistack";
import "./index.css";
import { AxiosInterceptor } from "./services/http";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ThemeProvider from "./theme";
import store from "./store";
import "./i18n";
import { BaseOptionChartStyle } from "./components/chart";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AxiosInterceptor>
        <SnackbarProvider maxSnack={6} autoHideDuration={3000}>
          <ThemeProvider>
          {/* <BaseOptionChartStyle /> */}
            <App />
          </ThemeProvider>
        </SnackbarProvider>
      </AxiosInterceptor>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
