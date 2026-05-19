import { Request, Response } from "express";

import { pool } from "../db";



/* ======================================================
   GET ALL MARKET PRICES
====================================================== */

export const getMarketPrices =
async(
  req:Request,
  res:Response
) => {

  try {

    const marketPrices =
    await pool.query(
      `
      SELECT
        stock_symbol,
        company_name,
        current_price,
        day_change_percent,
        exchange,
        updated_at

      FROM equity_market_prices

      ORDER BY company_name ASC
      `
    );



    return res.status(200).json({

      success:true,

      market_prices:
      marketPrices.rows
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success:false,

      message:"Failed to fetch market prices"
    });
  }
};



/* ======================================================
   GET STOCK BY SYMBOL
====================================================== */

export const getMarketPriceBySymbol =
async(
  req:Request,
  res:Response
) => {

  try {

    const { symbol } = req.params;



    const stock =
await pool.query(
  `
  SELECT
    stock_symbol,
    company_name,
    current_price,
    day_change_percent,
    exchange,
    updated_at

  FROM equity_market_prices

  WHERE stock_symbol = $1
  `,
  [
    String(symbol).toUpperCase()
  ]
);



    if(stock.rows.length === 0){

      return res.status(404).json({

        success:false,

        message:"Stock not found"
      });
    }



    return res.status(200).json({

      success:true,

      stock:
      stock.rows[0]
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success:false,

      message:"Failed to fetch stock data"
    });
  }
};