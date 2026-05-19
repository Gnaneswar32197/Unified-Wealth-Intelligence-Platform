import { Request, Response } from "express";
import { mutualFunds } from "../data/mfData";

export const getAUM = (
  req: Request,
  res: Response
) => {

  const totalAUM =
    mutualFunds.reduce(
      (sum, fund) => sum + fund.value,
      0
    );

  return res.status(200).json({

    total_aum: totalAUM
  });
};