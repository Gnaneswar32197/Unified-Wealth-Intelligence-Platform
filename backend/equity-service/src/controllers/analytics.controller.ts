import { Request, Response } from "express";

import { pool } from "../db";



/* ======================================================
   TOP HOLDINGS
====================================================== */

export const getTopHoldings =
async(
  req:Request,
  res:Response
) => {

  try {

    const holdings =
    await pool.query(
      `
      SELECT
        stock_symbol,

        SUM(quantity) AS total_quantity,

        SUM(
          quantity * current_market_price
        ) AS total_market_value

      FROM equity_holdings

      GROUP BY stock_symbol

      ORDER BY total_market_value DESC

      LIMIT 10
      `
    );



    return res.status(200).json({

      success:true,

      top_holdings:
      holdings.rows
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success:false,

      message:
      "Failed to fetch top holdings"
    });
  }
};



/* ======================================================
   PNL ANALYTICS
====================================================== */

export const getPnLAnalytics =
async(
  req:Request,
  res:Response
) => {

  try {

    const { investorId } =
    req.params;



    const pnlData =
    await pool.query(
      `
      SELECT
        id,
        investor_id,
        stock_symbol,
        quantity,

        avg_buy_price,

        current_market_price,

        (
          quantity *
          avg_buy_price
        ) AS invested_value,

        (
          quantity *
          current_market_price
        ) AS current_value,

        (
          (
            quantity *
            current_market_price
          )
          -
          (
            quantity *
            avg_buy_price
          )
        ) AS profit_loss

      FROM equity_holdings

      WHERE investor_id = $1
      `,
      [investorId]
    );



    const totalPnL =
    pnlData.rows.reduce(

      (sum,item) => {

        return (
          sum +
          Number(item.profit_loss)
        );
      },

      0
    );



    const totalInvestment =
    pnlData.rows.reduce(

      (sum,item) => {

        return (
          sum +
          Number(item.invested_value)
        );
      },

      0
    );



    const totalCurrentValue =
    pnlData.rows.reduce(

      (sum,item) => {

        return (
          sum +
          Number(item.current_value)
        );
      },

      0
    );



    return res.status(200).json({

      success:true,

      investor_id:investorId,

      analytics:{

        total_investment:
        totalInvestment,

        current_portfolio_value:
        totalCurrentValue,

        total_profit_loss:
        totalPnL,

        holdings:
        pnlData.rows
      }
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success:false,

      message:
      "Failed to fetch PnL analytics"
    });
  }
};