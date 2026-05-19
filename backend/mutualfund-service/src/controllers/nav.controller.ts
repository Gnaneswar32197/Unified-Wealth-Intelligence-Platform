import { Request, Response } from "express";
import { navs } from "../data/mfData";

export const getNav = (
  req: Request,
  res: Response
) => {

  const schemeCode =
    req.params.schemeCode;

  const nav =
    navs.find(
      n => n.schemeCode === schemeCode
    );

  return res.status(200).json(nav);
};