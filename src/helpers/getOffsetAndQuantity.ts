import { Request } from "express";

const MAX_QUANTITY_FILTER = 100;

const getOffsetAndQuantity = (req: Request) => {
  let { offset, quantity } = req.query;

  const formatedOffset = Number(offset);
  const formatedQuantity = Number(quantity) > MAX_QUANTITY_FILTER ? MAX_QUANTITY_FILTER : Number(quantity);

  return {
    offset: isNaN(formatedOffset) ? 0 : formatedOffset,
    quantity: isNaN(formatedQuantity) ? MAX_QUANTITY_FILTER : formatedQuantity,
  }
}

export default getOffsetAndQuantity;