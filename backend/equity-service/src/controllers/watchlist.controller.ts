import { Request, Response } from "express";

import { pool } from "../db";



/* ======================================================
   GET WATCHLIST
====================================================== */

export const getWatchlist =
async(
  req:Request,
  res:Response
) => {

  try {

    const { investorId } = req.params;



    const watchlist =
    await pool.query(
      `
      SELECT
        w.id,
        w.investor_id,
        w.stock_symbol,
        w.added_at,

        m.company_name,
        m.current_price,
        m.day_change_percent,
        m.exchange

      FROM equity_watchlist w

      LEFT JOIN equity_market_prices m
      ON w.stock_symbol = m.stock_symbol

      WHERE w.investor_id = $1

      ORDER BY w.added_at DESC
      `,
      [investorId]
    );



    return res.status(200).json({

      success:true,

      investor_id:investorId,

      watchlist:
      watchlist.rows
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success:false,

      message:"Failed to fetch watchlist"
    });
  }
};



/* ======================================================
   ADD TO WATCHLIST
====================================================== */

export const addToWatchlist =
async(
  req:Request,
  res:Response
) => {

  try {

    const {

      investor_id,

      stock_symbol

    } = req.body;



    const existingStock =
    await pool.query(
      `
      SELECT *
      FROM equity_watchlist

      WHERE investor_id = $1
      AND stock_symbol = $2
      `,
      [
        investor_id,
        stock_symbol
      ]
    );



    if(
      existingStock.rows.length > 0
    ){

      return res.status(400).json({

        success:false,

        message:
        "Stock already exists in watchlist"
      });
    }



    const watchlistItem =
    await pool.query(
      `
      INSERT INTO equity_watchlist
      (
        investor_id,
        stock_symbol
      )

      VALUES
      (
        $1,$2
      )

      RETURNING *
      `,
      [
        investor_id,
        stock_symbol
      ]
    );



    return res.status(201).json({

      success:true,

      message:
      "Added to watchlist successfully",

      watchlist_item:
      watchlistItem.rows[0]
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success:false,

      message:"Failed to add stock to watchlist"
    });
  }
};



/* ======================================================
   DELETE WATCHLIST ITEM
====================================================== */

export const deleteWatchlistItem =
async(
  req:Request,
  res:Response
) => {

  try {

    const { id } = req.params;



    const deletedItem =
    await pool.query(
      `
      DELETE FROM equity_watchlist

      WHERE id = $1

      RETURNING *
      `,
      [id]
    );



    if(
      deletedItem.rows.length === 0
    ){

      return res.status(404).json({

        success:false,

        message:
        "Watchlist item not found"
      });
    }



    return res.status(200).json({

      success:true,

      message:
      "Watchlist item deleted successfully"
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success:false,

      message:
      "Failed to delete watchlist item"
    });
  }
};