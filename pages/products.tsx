import {Heading, Stack, Thead, Table, Td, Tr, Tbody, Input, Button} from "@chakra-ui/react";
import {GetServerSideProps} from "next";
import React from "react";

import serverApi from "../product/api/server";
import ProductStockForm from "../product/forms/Stock";
import {Product} from "../product/types";
import clientApi from "../product/api/client";

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
      <Heading marginBottom={12}>Productos</Heading>
      <Table colorScheme="blue" maxWidth="1000px">
        <Thead backgroundColor="primary.200">
          <Tr fontSize={18} fontWeight={500}>
            <Td>Productos</Td>
            <Td>Stock Actual</Td>
            <Td>Agregar Stock</Td>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => {
            return (
              <Tr key={product.id} backgroundColor="primary.100">
                <Td>{product.title}</Td>
                <Td>{product.stock}</Td>
                <Td>
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
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
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
