import {Select} from "@chakra-ui/react";
import React from "react";

interface Props {
  onSubmit: (value: string) => void;
  children: (options: {
    form: JSX.Element;
    submit: VoidFunction;
    value: string | undefined;
  }) => JSX.Element;
}

const TableFilters: React.FC<Props> = ({onSubmit, children}) => {
  const [value, setValue] = React.useState(undefined);

  function handleSubmit() {
    onSubmit(value);
  }

  return children({
    form: (
      <Select
        bg="primary.200"
        placeholder="Mover a..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        <option value="cancelled">Pedidos Cancelados</option>
        <option value="pending">Pedidos Pendientes</option>
        <option value="completed">Pedidos Completados</option>
      </Select>
    ),
    submit: handleSubmit,
    value,
  });
};

export default TableFilters;
