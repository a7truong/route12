import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import "@mantine/core/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </StrictMode>,
);
