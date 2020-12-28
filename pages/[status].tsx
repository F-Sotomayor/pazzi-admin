import React from "react";
import {GetServerSideProps} from "next";
import {Stack} from "@chakra-ui/react";

import serverApi from "../product/api/server";
import {Order} from "../product/types";
import TableContent from "../components/Table/TableContent";
import TableFilters from "../components/Table/Filters";

interface Props {
  orders: Order[];
}

const IndexPage: React.FC<Props> = ({orders}) => {
  const [selected, setSelected] = React.useState([]);

  function onChange(event) {
    if (event.target.checked) {
      setSelected(selected.concat(event));
    } else {
      setSelected(selected.filter((item) => item.target.id !== event.target.id));
    }
  }

  function handleSelect(event) {
    console.log(event.target.value);
  }

  function handleSelectSubmit(event) {
    selected.map((item) => {
      if (
        (item.target.id = orders.map((test) => {
          test.id;
        }))
      ) {
        console.log("it matches");
      } else {
        console.log("no match");
      }
    });
  }
  console.log(selected);

  return (
    <>
      <Stack height="auto" maxWidth="100%" minHeight="100vh" padding={4} width="100vw">
        <TableFilters
          handleSelect={handleSelect}
          handleSelectSubmit={handleSelectSubmit}
          selected={selected}
        />
        <TableContent orders={orders} selected={selected} onChange={onChange} />
      </Stack>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async function ({res, query}) {
  try {
    const orders = await serverApi.list(query.status as Order["status"]);

    return {props: {orders}};
  } catch (error) {
    return {props: {statusCode: error?.status || res?.statusCode}};
  }
};

export default IndexPage;
