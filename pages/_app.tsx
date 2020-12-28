import {AppProps} from "next/app";
import React from "react";
import {ChakraProvider} from "@chakra-ui/react";

import theme from "../theme";
import {Provider as SessionProvider} from "../session/context";
import Header from "../components/Header";
import Footer from "../components/Footer";

const App: React.FC<AppProps> = ({Component, pageProps}) => (
  <ChakraProvider resetCSS theme={theme}>
    <SessionProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  </ChakraProvider>
);

export default App;
