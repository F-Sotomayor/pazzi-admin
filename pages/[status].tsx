import React from "react";
import {GetServerSideProps} from "next";
import {Button, Heading, Stack} from "@chakra-ui/react";

import serverApi from "../product/api/server";
import {Order} from "../product/types";
import TableContent from "../components/Table/TableContent";
import TableFilters from "../components/Table/Filters";
import clientApi from "../product/api/client";

interface Props {
  orders: Order[];
}

const IndexPage: React.FC<Props> = ({orders}) => {
  const [selected, setSelected] = React.useState([]);

  function handleSelectSubmit(value: string) {
    if (!value) {
      return;
    }

    clientApi.move(selected, value).then(() => window.location.reload());
  }

  return (
    <>
      <Stack height="auto" maxWidth="100%" minHeight="100vh" padding={4} width="100vw">
        {selected.length && (
          <TableFilters onSubmit={handleSelectSubmit}>
            {({form, submit, value}) => (
              <Stack align="center" margin="auto" marginBottom={12} maxW={480}>
                <Heading color="primary.800" letterSpacing={4} marginBottom={4}>
                  ACCIONES
                </Heading>
                <Stack direction="row">
                  {form}
                  <Button
                    colorScheme="blue"
                    isDisabled={!value}
                    margin="auto"
                    marginTop={2}
                    w={256}
                    onClick={submit}
                  >
                    Mover
                  </Button>
                </Stack>
              </Stack>
            )}
          </TableFilters>
        )}
        <TableContent orders={orders} value={selected} onChange={setSelected} />
      </Stack>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async function ({res, query}) {
  try {
    const orders = await serverApi.order.list(query.status as Order["status"]);

    return {props: {orders}};
  } catch (error) {
    return {props: {statusCode: error?.status || res?.statusCode}};
  }
};

export default IndexPage;
