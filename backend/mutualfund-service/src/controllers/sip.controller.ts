import { Request, Response } from "express";
import { sips } from "../data/mfData";

export const getFailedSips = (
  req: Request,
  res: Response
) => {

  const failed =
    sips.filter(
      sip => sip.status === "FAILED"
    );

  return res.status(200).json(failed);
};

export const getSips = (
  req: Request,
  res: Response
) => {

  const customerRef =
    req.params.customerRef;

  const customerSips =
    sips.filter(
      sip =>
        sip.customerRef === customerRef
    );

  return res.status(200).json(customerSips);
};