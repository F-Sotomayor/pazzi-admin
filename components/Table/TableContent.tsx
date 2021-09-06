import React from "react";
import {
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Badge,
  Checkbox,
  Stack,
  Heading,
  Flex,
} from "@chakra-ui/react";
import {format} from "date-fns";

import {Order} from "../../product/types";
import order from "../../pages/api/order";
import {useOrderOverview} from "../../product/hooks";
import server from "../../product/api/server";
import client from "../../product/api/client";

import {getOrderTotal} from "./selectors";

interface Props {
  orders: Order[];
  value: string[];
  onChange: (value: Props["value"]) => void;
}

const TableContent: React.FC<Props> = ({orders, value, onChange}) => {
  const overview = useOrderOverview(orders);

  function handleChange(checked, id) {
    if (checked) {
      onChange(value.concat(id));
    } else {
      onChange(value.filter((item) => item !== id));
    }
  }

  return (
    <>
      <Table colorScheme="blue" marginTop={4} variant="simple">
        <Thead>
          <Tr>
            <Th>Seleccionar</Th>
            <Th>Orden</Th>
            <Th>Usuario</Th>
            <Th>Fecha Realizado</Th>
            <Th>Pedido</Th>
            <Th>Precio Total</Th>
            <Th>Estado del pedido</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order: Order) => {
            return (
              <Tr key={order.id}>
                <Td>
                  <Checkbox
                    border="1px solid gray"
                    borderRadius={2}
                    checked={value.includes(order.id)}
                    onChange={(event) => handleChange(event.target.checked, order.id)}
                  />
                </Td>
                <Td>{order.ordernumber}</Td>
                <Td>{order.email.split("@").shift()}</Td>
                <Td>{format(order.date, "MM/dd/yyyy / HH:mm:ss")}</Td>
                <Td>
                  {order.order.map((item) => {
                    return (
                      <Box key={item.id}>
                        {item.presentations.map((presentation, index) => {
                          if (presentation.count > 0)
                            return (
                              <Box key={index}>
                                <Badge colorScheme="blue" marginY="0.25rem">
                                  {item.title2}
                                  {/* {presentation.units < 10
                                    ? `(Pack de ${presentation.units} unidades)`
                                    : `(Pack de ${presentation.units} unidades)`} */}
                                  (
                                  {presentation.units < 10
                                    ? `Pack de ${presentation.units} unidades`
                                    : presentation.units < 44
                                    ? `Bandeja de ${presentation.units} unidades`
                                    : presentation.units < 50
                                    ? `Caja de ${presentation.units} unidades`
                                    : `Caja de ${presentation.units} unidades`}
                                  )
                                </Badge>
                                <Text>{presentation.count}</Text>
                              </Box>
                            );
                        })}
                      </Box>
                    );
                  })}
                </Td>
                <Td>{getOrderTotal(order)}</Td>

                <Td>
                  <Badge
                    alignItems="center"
                    backgroundColor="green.200"
                    borderRadius={6}
                    display="flex"
                    h="30px"
                    justifyContent="center"
                    w="100px"
                  >
                    {order.status}
                  </Badge>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Stack h="auto" marginTop={6} textAlign="center" w="100%">
        <Heading>Resumen</Heading>

        {overview.map(({title, count}) => (
          <Box key={title} alignItems="center" display="flex" flexDirection="column">
            <Badge colorScheme="blue" marginY="0.25rem" w={256}>
              {title}
            </Badge>
            <Box>{count}</Box>
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default TableContent;
