import {Heading, Stack, Text, Flex, Button} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
const Header = () => {
  return (
    <Stack align="center" h={{base: "100vh", lg: "30vh"}} w="100%">
      <Heading
        color="primary.800"
        letterSpacing={4}
        marginBottom={4}
        marginTop={4}
        textAlign={{base: "center"}}
      >
        PANEL DE ADMINISTRACTION
      </Heading>
      <Flex
        align={{base: "center"}}
        direction={{base: "column", lg: "row"}}
        height={{base: "50vh"}}
        justify="space-evenly"
        width={{base: "100%", lg: "1000px"}}
      >
        <Link href="/cancelled">
          <Text color="primary.800" fontSize={20} fontWeight={500}>
            <Button colorScheme="blue" marginY={{base: "0.5rem"}} w={{base: "300px"}}>
              Pedidos Cancelados
            </Button>
          </Text>
        </Link>
        <Link href="/pending">
          <Text color="primary.800" fontSize={20} fontWeight={500}>
            <Button colorScheme="blue" marginY={{base: "0.5rem"}} w={{base: "300px"}}>
              Pedidos Pendientes
            </Button>
          </Text>
        </Link>
        <Link href="/completed">
          <Text color="primary.800" fontSize={20} fontWeight={500}>
            <Button colorScheme="blue" marginY={{base: "0.5rem"}} w={{base: "300px"}}>
              Pedidos Completados
            </Button>
          </Text>
        </Link>
        <Link href="/daily">
          <Text color="primary.800" fontSize={20} fontWeight={500}>
            <Button colorScheme="blue" marginY={{base: "0.5rem"}} w={{base: "300px"}}>
              Pedidos para Imprimir
            </Button>
          </Text>
        </Link>
        <Link href="/products">
          <Text color="primary.800" fontSize={20} fontWeight={500}>
            <Button colorScheme="blue" marginY={{base: "0.5rem"}} w={{base: "300px"}}>
              Productos
            </Button>
          </Text>
        </Link>
      </Flex>
    </Stack>
  );
};

export default Header;
