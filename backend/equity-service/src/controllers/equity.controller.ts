import { Request, Response } from "express";

import { pool } from "../db/index";



/* ======================================================
   GET ALL EQUITY USERS
====================================================== */

export const getEquityUsers =
async(
  req:Request,
  res:Response
) => {

  try {

    const users =
    await pool.query(
      `
      SELECT
        investor_id,
        full_name,
        email,
        pan_number,
        demat_account,
        created_at

      FROM equity_users

      ORDER BY created_at DESC
      `
    );

    return res.status(200).json({

      success:true,

      users:users.rows
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to fetch equity users"
    });
  }
};



/* ======================================================
   GET EQUITY USER BY ID
====================================================== */

export const getEquityUserById =
async(
  req:Request,
  res:Response
) => {

  try {

    const { id } = req.params;

    const user =
    await pool.query(
      `
      SELECT
        investor_id,
        full_name,
        email,
        pan_number,
        demat_account,
        created_at

      FROM equity_users

      WHERE investor_id = $1
      `,
      [id]
    );

    if(user.rows.length === 0){

      return res.status(404).json({
        success:false,
        message:"Equity user not found"
      });
    }

    return res.status(200).json({

      success:true,

      user:user.rows[0]
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to fetch equity user"
    });
  }
};