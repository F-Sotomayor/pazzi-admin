import {
  Heading,
  Stack,
  Thead,
  Table,
  Td,
  Tr,
  Tbody,
  Input,
  Button,
  Box,
  StackDivider,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";
import {GetServerSideProps} from "next";
import React from "react";

import serverApi from "../product/api/server";
import {Product} from "../product/types";
import clientApi from "../product/api/client";
import ProductStockForm from "../product/forms/Stock";

interface Props {
  products: Product[];
}

const ProductsPage: React.FC<Props> = ({products}) => {
  const [isLoading, toggleLoading] = React.useState(false);

  function handleSubmit(id: Product["id"], value: number) {
    toggleLoading(true);
    clientApi.product.stock.update(id, value).then(() => window.location.reload());
  }

  return (
    <Stack align="center" maxH="auto" maxW="100vw" minH="100vh" w="100vw">
      <Heading>Productos</Heading>
      {products
        .sort((a, b) => {
          if (a.test > b.test) {
            return -1;
          }
        })
        .map((product, productIndex) => {
          return (
            <Stack
              key={product.id}
              backgroundColor="gray.50"
              borderColor="gray.100"
              borderRadius="lg"
              borderWidth={1}
              boxShadow="2xl"
              divider={<StackDivider />}
              flex={1}
              padding={4}
              spacing={4}
              w="80vw"
            >
              <Stack direction="row" spacing={4}>
                <Box height="auto" maxHeight="100%">
                  <Image borderRadius="lg" height={24} src={`${product.type}.jpeg`} w={40} />
                </Box>
                <Stack spacing={2}>
                  <Stack spacing={0}>
                    <Text fontSize="2xl" fontWeight={500} lineHeight="normal">
                      {product.title}
                    </Text>
                    <Text fontSize="lg">{product.test}</Text>
                  </Stack>
                </Stack>
              </Stack>
              <Stack spacing={0}>
                <Flex justifyContent="space-between" width="100%">
                  <Box flex={0.2}>
                    <Text fontSize="xs" fontWeight={500} textAlign="left" textTransform="uppercase">
                      Unidades
                    </Text>
                  </Box>
                  <Box display="flex" flex={0.33} justifyContent="center">
                    <Text fontSize="xs" fontWeight={500} textAlign="left" textTransform="uppercase">
                      Precio
                    </Text>
                  </Box>
                  <Box display="flex" flex={0.33} justifyContent="center">
                    <Text fontSize="xs" fontWeight={500} textAlign="left" textTransform="uppercase">
                      Nuevo Precio
                    </Text>
                  </Box>
                </Flex>
                <Stack divider={<StackDivider />} spacing={1}>
                  {product.presentations.map((presentation, presentationIndex) => {
                    return (
                      <Flex
                        key={presentation.units}
                        alignItems="center"
                        justifyContent="space-between"
                        width="100%"
                      >
                        <Text flex={0.2} fontSize={[12, 12, 12, 16]}>
                          {presentation.units} unidad(es)
                        </Text>
                        <Text
                          display="flex"
                          flex={0.33}
                          fontSize={[12, 12, 12, 16]}
                          justifyContent="center"
                        >
                          {presentation.price.toLocaleString("es-AR", {
                            style: "currency",
                            currency: "ARS",
                          })}
                        </Text>
                        <Box display="flex" flex={0.33} justifyContent="center">
                          <ProductStockForm product={product.id} onSubmit={handleSubmit}>
                            {({form, submit, value}) => (
                              <Stack direction="row" justify="space-between">
                                {form}
                                <Button
                                  colorScheme={`${!value ? "red" : "blue"}`}
                                  isDisabled={!value || isLoading}
                                  marginTop={2}
                                  w={256}
                                  onClick={submit}
                                >
                                  Actualizar
                                </Button>
                              </Stack>
                            )}
                          </ProductStockForm>
                        </Box>
                      </Flex>
                    );
                  })}
                </Stack>
              </Stack>
            </Stack>
          );
        })}
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps = async function ({res}) {
  try {
    const products = await serverApi.product.list();

    return {props: {products}};
  } catch (error) {
    return {props: {statusCode: error?.status || res?.statusCode}};
  }
};

export default ProductsPage;
