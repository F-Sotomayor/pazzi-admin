import React from "react";
import {Box, Table, Tbody, Td, Th, Thead, Tr, Text, Badge, Checkbox} from "@chakra-ui/react";
import {format} from "date-fns";

import {Order} from "../../product/types";

interface Props {
  orders: Order[];
  selected;
  onChange;
}

const TableContent: React.FC<Props> = ({orders, selected, onChange}) => {
  return (
    <Table colorScheme="blue" marginTop={4} variant="simple">
      <Thead>
        <Tr>
          <Th>Seleccionar</Th>
          <Th>Email</Th>
          <Th>Fecha Realizado</Th>
          <Th>Pedido</Th>
          <Th>Precio Total</Th>
          <Th>Estado del pedido</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((order) => {
          return (
            <Tr key={order.id}>
              <Td>
                <Checkbox
                  border="1px solid gray"
                  borderRadius={2}
                  checked={false}
                  id={order.id}
                  onChange={onChange}
                />
              </Td>
              <Td>{order.email}</Td>
              <Td>{format(order.date, "MM/dd/yyyy / HH:mm:ss")}</Td>
              <Td>
                {order.order.map((test) => {
                  return (
                    <Box key={test.id}>
                      <Badge colorScheme="blue" marginY="0.25rem">
                        {test.title}
                      </Badge>
                      {test.presentations.map((presentation) => {
                        return (
                          <Box key={presentation.count * presentation.units * presentation.price}>
                            <Text>
                              Pack: {presentation.count} : {presentation.units}
                            </Text>
                          </Box>
                        );
                      })}
                    </Box>
                  );
                })}
              </Td>
              <Td>$12.123</Td>
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
  );
};

export default TableContent;
