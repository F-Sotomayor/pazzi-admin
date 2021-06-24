import React from "react";

import {CartItem, CartItemPresentation, Order} from "./types";

interface Overview {
  count: CartItemPresentation["count"];
  title: CartItem["title"];
}

export function useOrderOverview(orders: Order[]): Overview[] {
  return React.useMemo(() => {
    const map = orders.reduce<Record<Overview["title"], Overview["count"]>>((map, order) => {
      order.order.forEach((order) => {
        order.presentations.forEach((presentation) => {
          map[order.title] = (map[order.title] || 0) + presentation.count * presentation.units;
        });
      });

      return map;
    }, {});
    const result = Object.entries(map)
      .map(([title, count]) => ({title, count}))
      .filter(({count}) => count > 0);

    return result;
  }, [orders]);
}
