import {Stack, Text, Flex, Box, Heading, Input, Button} from "@chakra-ui/react";
import React from "react";
import admin from "firebase-admin";

const Users = () => {
  return (
    <Stack align="center" h={"80vh"} justify="flex-start" w="100%">
      <Heading>Crear Usuario</Heading>
      <form style={{display: "flex", flexDirection: "column"}}>
        <Input marginTop={2} placeholder="Nombre de usuario" w={256} />
        <Input marginTop={2} placeholder="Contraseña" w={256} />
        <Button colorScheme="green" marginTop={2} type="submit" w={256}>
          Crear
        </Button>
      </form>
    </Stack>
  );
};

export default Users;
