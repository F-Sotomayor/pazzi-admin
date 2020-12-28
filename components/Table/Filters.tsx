import {Stack, Flex, Heading, Select, Button} from "@chakra-ui/react";
import React from "react";

interface Props {
  selected;
  handleSelect;
  handleSelectSubmit;
}

const TableFilters: React.FC<Props> = ({selected, handleSelect, handleSelectSubmit}) => {
  return (
    <Stack align="center" h="40vh" justify="center" marginY={2} w="100%">
      <Heading color="primary.800" letterSpacing={4} marginBottom={4}>
        ACCIONES
      </Heading>
      <Flex direction="column" w="100%">
        <Select
          bg="primary.200"
          margin="auto"
          placeholder="Mover a..."
          w={256}
          onChange={handleSelect}
        >
          <option value="cancelled">Pedidos Cancelados</option>
          <option value="pending">Pedidos Pendientes</option>
          <option value="completed">Pedidos Completados</option>
        </Select>
        <Button colorScheme="blue" margin="auto" marginTop={2} w={256} onClick={handleSelectSubmit}>
          Mover
        </Button>
      </Flex>
    </Stack>
  );
};

export default TableFilters;
