import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "store";
import { ThemeProvider } from "@mui/material";
import { theme } from "theme.ts";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
