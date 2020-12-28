import {Stack, Text} from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Stack align="center" h={12} justify="center" w="100%">
      <Text fontWeight={500}>
        @ <em>Pazzi, 2021</em>
      </Text>
    </Stack>
  );
};

export default Footer;
