import { Request, Response } from "express";

import { pool } from "../db";



export const getTransactionsByInvestor =
async(
  req:Request,
  res:Response
) => {

  try {

    const { investorId } = req.params;

    const transactions =
    await pool.query(
      `
      SELECT
        id,
        investor_id,
        stock_symbol,
        transaction_type,
        quantity,
        price,
        exchange,
        realized_gain,
        executed_at

      FROM equity_transactions

      WHERE investor_id = $1

      ORDER BY executed_at DESC
      `,
      [investorId]
    );



    return res.status(200).json({

      success:true,

      investor_id:investorId,

      transactions:
      transactions.rows
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success:false,

      message:"Failed to fetch transactions"
    });
  }
};



export const createTransaction =
async(
  req:Request,
  res:Response
) => {

  try {

    const {

      investor_id,

      stock_symbol,

      transaction_type,

      quantity,

      price,

      exchange,

      realized_gain

    } = req.body;



    const transaction =
    await pool.query(
      `
      INSERT INTO equity_transactions
      (
        investor_id,
        stock_symbol,
        transaction_type,
        quantity,
        price,
        exchange,
        realized_gain,
        executed_at
      )

      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,NOW()
      )

      RETURNING *
      `,
      [
        investor_id,
        stock_symbol,
        transaction_type,
        quantity,
        price,
        exchange || "NSE",
        realized_gain || null
      ]
    );



    return res.status(201).json({

      success:true,

      message:"Transaction created successfully",

      transaction:
      transaction.rows[0]
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success:false,

      message:"Failed to create transaction"
    });
  }
};




export const getTransactionHistory =
async(
  req:Request,
  res:Response
) => {

  try {

    const { investorId } = req.params;



    const history =
    await pool.query(
      `
      SELECT
        id,
        investor_id,
        stock_symbol,
        transaction_type,
        quantity,
        price,
        exchange,
        realized_gain,
        executed_at,

        (
          quantity * price
        ) AS transaction_value

      FROM equity_transactions

      WHERE investor_id = $1

      ORDER BY executed_at DESC
      `,
      [investorId]
    );



    const totalTransactionValue =
    history.rows.reduce(

      (sum,item) => {

        return (
          sum +
          Number(item.transaction_value)
        );
      },

      0
    );



    return res.status(200).json({

      success:true,

      investor_id:investorId,

      total_transaction_value:
      totalTransactionValue,

      transaction_count:
      history.rows.length,

      history:history.rows
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success:false,

      message:"Failed to fetch transaction history"
    });
  }
};