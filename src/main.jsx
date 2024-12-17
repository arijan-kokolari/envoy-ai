import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Web3ModalProvider } from "../src/wallet/Wallet.jsx";
import { ChakraProvider } from "@chakra-ui/react";

// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "",
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Web3ModalProvider>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </Web3ModalProvider>
);
