import { Request, Response } from "express";

import { pool } from "../db";



/* ======================================================
   GET HOLDINGS BY INVESTOR
====================================================== */

export const getHoldingsByInvestor =
async(
  req:Request,
  res:Response
) => {

  try {

    const { investorId } = req.params;

    const holdings =
    await pool.query(
      `
      SELECT
        id,
        investor_id,
        stock_symbol,
        quantity,
        avg_buy_price,
        current_market_price,
        exchange,
        updated_at,

        (
          quantity * current_market_price
        ) AS holding_value

      FROM equity_holdings

      WHERE investor_id = $1
      `,
      [investorId]
    );



    const totalValue =
    holdings.rows.reduce(

      (sum,item) => {

        return (
          sum +
          Number(item.holding_value)
        );
      },

      0
    );



    return res.status(200).json({

      success:true,

      investor_id:investorId,

      total_value:totalValue,

      holdings:holdings.rows
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success:false,

      message:"Failed to fetch holdings"
    });
  }
};



/* ======================================================
   CREATE HOLDING
====================================================== */

export const createHolding =
async(
  req:Request,
  res:Response
) => {

  try {

    const {

      investor_id,

      stock_symbol,

      quantity,

      avg_buy_price,

      current_market_price,

      exchange

    } = req.body;



    const holding =
    await pool.query(
      `
      INSERT INTO equity_holdings
      (
        investor_id,
        stock_symbol,
        quantity,
        avg_buy_price,
        current_market_price,
        exchange
      )

      VALUES
      (
        $1,$2,$3,$4,$5,$6
      )

      RETURNING *
      `,
      [
        investor_id,
        stock_symbol,
        quantity,
        avg_buy_price,
        current_market_price,
        exchange || "NSE"
      ]
    );



    return res.status(201).json({

      success:true,

      message:"Holding created successfully",

      holding:holding.rows[0]
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success:false,

      message:"Failed to create holding"
    });
  }
};



/* ======================================================
   UPDATE HOLDING
====================================================== */

export const updateHolding =
async(
  req:Request,
  res:Response
) => {

  try {

    const { id } = req.params;

    const {

      quantity,

      avg_buy_price,

      current_market_price

    } = req.body;



    const updatedHolding =
    await pool.query(
      `
      UPDATE equity_holdings

      SET

        quantity = $1,

        avg_buy_price = $2,

        current_market_price = $3,

        updated_at = NOW()

      WHERE id = $4

      RETURNING *
      `,
      [
        quantity,
        avg_buy_price,
        current_market_price,
        id
      ]
    );



    if(
      updatedHolding.rows.length === 0
    ){

      return res.status(404).json({

        success:false,

        message:"Holding not found"
      });
    }



    return res.status(200).json({

      success:true,

      message:"Holding updated successfully",

      holding:
      updatedHolding.rows[0]
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success:false,

      message:"Failed to update holding"
    });
  }
};



/* ======================================================
   DELETE HOLDING
====================================================== */

export const deleteHolding =
async(
  req:Request,
  res:Response
) => {

  try {

    const { id } = req.params;



    const deletedHolding =
    await pool.query(
      `
      DELETE FROM equity_holdings

      WHERE id = $1

      RETURNING *
      `,
      [id]
    );



    if(
      deletedHolding.rows.length === 0
    ){

      return res.status(404).json({

        success:false,

        message:"Holding not found"
      });
    }



    return res.status(200).json({

      success:true,

      message:"Holding deleted successfully"
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success:false,

      message:"Failed to delete holding"
    });
  }
};