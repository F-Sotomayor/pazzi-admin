import {Order} from "../../product/types";

export function getOrderTotal(order: Order): string {
  const total = order.order.reduce((total, item) => {
    return total + item.presentations.reduce((total, {count, price}) => total + count * price, 0);
  }, 0);

  return total.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
}
