import {Heading, Stack, Text, Flex, Button} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
const Header = () => {
  return (
    <Stack align="center" h="30vh" w="100%">
      <Heading color="primary.800" letterSpacing={4} marginBottom={4} marginTop={4}>
        PANEL DE ADMINISTRACTION
      </Heading>
      <Flex direction="row" justify="space-evenly" width="1000px">
        <Link href="/cancelled">
          <Text color="primary.800" fontSize={20} fontWeight={500}>
            <Button colorScheme="blue">Pedidos Cancelados</Button>
          </Text>
        </Link>
        <Link href="/pending">
          <Text color="primary.800" fontSize={20} fontWeight={500}>
            <Button colorScheme="blue">Pedidos Pendientes</Button>
          </Text>
        </Link>
        <Link href="/completed">
          <Text color="primary.800" fontSize={20} fontWeight={500}>
            <Button colorScheme="blue">Pedidos Completados</Button>
          </Text>
        </Link>
        <Link href="/daily">
          <Text color="primary.800" fontSize={20} fontWeight={500}>
            <Button colorScheme="blue">Pedidos para Imprimir</Button>
          </Text>
        </Link>
        <Link href="/products">
          <Text color="primary.800" fontSize={20} fontWeight={500}>
            <Button colorScheme="blue">Productos</Button>
          </Text>
        </Link>
      </Flex>
    </Stack>
  );
};

export default Header;
