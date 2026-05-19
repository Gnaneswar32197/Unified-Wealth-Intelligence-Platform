import { Request, Response } from "express";
import { mutualFunds } from "../data/mfData";

export const getFunds = (
  req: Request,
  res: Response
) => {

  const customerRef =
    req.params.customerRef;

  const funds =
    mutualFunds.filter(
      fund =>
        fund.customerRef === customerRef
    );

  const totalValue =
    funds.reduce(
      (sum, fund) => sum + fund.value,
      0
    );

  return res.status(200).json({

    customerRef,

    total_value: totalValue,

    funds
  });
};