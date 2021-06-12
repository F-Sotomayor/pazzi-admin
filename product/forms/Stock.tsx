import {Input} from "@chakra-ui/react";
import React from "react";

import {Presentation, Product} from "../types";

interface Props {
  onSubmit: (product: Product["id"], value: number, presentationId: Presentation["id"]) => void;
  product: Product["id"];
  presentation: Presentation["id"];
  children: (options: {
    form: JSX.Element;
    submit: VoidFunction;
    value: number | undefined;
  }) => JSX.Element;
}

const ProductStockForm: React.FC<Props> = ({onSubmit, children, product, presentation}) => {
  const [value, setValue] = React.useState<number>(undefined);

  function handleSubmit() {
    onSubmit(product, value, presentation);
  }

  return children({
    form: (
      <Input
        borderColor="primary.500"
        type="number"
        w={128}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    ),
    submit: handleSubmit,
    value,
  });
};

export default ProductStockForm;
