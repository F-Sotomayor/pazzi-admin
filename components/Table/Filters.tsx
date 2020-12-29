import {Stack, Flex, Heading, Select} from "@chakra-ui/react";
import React from "react";

interface Props {
  onSubmit: (value: string) => void;
  children: (options: {form: JSX.Element; submit: VoidFunction}) => JSX.Element;
}

const TableFilters: React.FC<Props> = ({onSubmit, children}) => {
  const [value, setValue] = React.useState(undefined);

  function handleSubmit() {
    onSubmit(value);
  }

  return children({
    form: (
      <Stack align="center" h="40vh" justify="center" marginY={2} w="100%">
        <Heading color="primary.800" letterSpacing={4} marginBottom={4}>
          ACCIONES
        </Heading>
        <Flex direction="column" w="100%">
          <Select
            bg="primary.200"
            margin="auto"
            placeholder="Mover a..."
            value={value}
            w={256}
            onChange={(event) => setValue(event.target.value)}
          >
            <option value="cancelled">Pedidos Cancelados</option>
            <option value="pending">Pedidos Pendientes</option>
            <option value="completed">Pedidos Completados</option>
          </Select>
        </Flex>
      </Stack>
    ),
    submit: handleSubmit,
  });
};

export default TableFilters;
