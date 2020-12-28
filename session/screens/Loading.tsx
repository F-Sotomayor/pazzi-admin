import React from "react";
import {Flex, Spinner} from "@chakra-ui/react";

const LoadingScreen: React.FC = () => (
  <Flex alignItems="center" height="100vh" justifyContent="center" width="100vw">
    <Spinner color="primary.500" />
  </Flex>
);

export default LoadingScreen;
