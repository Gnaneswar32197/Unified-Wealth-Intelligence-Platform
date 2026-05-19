import { Request, Response } from "express";
import axios from "axios";

import { pool } from "../db";



/* ======================================================
   GET ALL INVESTORS
====================================================== */

export const getAllInvestors =
async(
  req:Request,
  res:Response
) => {

  try {

    const investors =
    await pool.query(
      `
      SELECT *
      FROM unified_investors
      ORDER BY id
      `
    );

    return res.status(200).json({
      success:true,
      investors:investors.rows
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Internal server error"
    });
  }
};



/* ======================================================
   GET SINGLE INVESTOR
====================================================== */

export const getInvestorById =
async(
  req:Request,
  res:Response
) => {

  try {

    const { id } = req.params;

    const investor =
    await pool.query(
      `
      SELECT *
      FROM unified_investors
      WHERE id = $1
      `,
      [id]
    );

    if(investor.rows.length === 0){

      return res.status(404).json({
        success:false,
        message:"Investor not found"
      });
    }

    return res.status(200).json({
      success:true,
      investor:investor.rows[0]
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Internal server error"
    });
  }
};



/* ======================================================
   UNIFIED PORTFOLIO
====================================================== */

export const getUnifiedPortfolio =
async(
  req:Request,
  res:Response
) => {

  try {

    const { id } = req.params;

    const investorQuery =
    await pool.query(
      `
      SELECT *
      FROM unified_investors
      WHERE id = $1
      `,
      [id]
    );

    if(investorQuery.rows.length === 0){

      return res.status(404).json({
        success:false,
        message:"Investor not found"
      });
    }

    const investor =
    investorQuery.rows[0];



    /* ==========================================
       EQUITY SERVER API CALL
    ========================================== */

    const equityResponse =
    await axios.get(
      `http://localhost:5001/api/equity/holdings/${investor.equity_investor_id}`
    );



    /* ==========================================
       MF SERVER API CALL
    ========================================== */

    const mfResponse =
    await axios.get(
      `http://localhost:5002/api/mf/funds/${investor.mf_customer_ref}`
    );



    return res.status(200).json({

      success:true,

      investor:{
        id:investor.id,
        full_name:investor.full_name,
        pan_number:investor.pan_number
      },

      equity:equityResponse.data,

      mutual_funds:mfResponse.data
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to aggregate portfolio"
    });
  }
};



/* ======================================================
   WEALTH SUMMARY
====================================================== */

export const getWealthSummary =
async(
  req:Request,
  res:Response
) => {

  try {

    const { id } = req.params;

    const investorQuery =
    await pool.query(
      `
      SELECT *
      FROM unified_investors
      WHERE id = $1
      `,
      [id]
    );

    if(investorQuery.rows.length === 0){

      return res.status(404).json({
        success:false,
        message:"Investor not found"
      });
    }

    const investor =
    investorQuery.rows[0];



    /* ==========================================
       EQUITY DATA
    ========================================== */

    const equityResponse =
    await axios.get(
      `http://localhost:5001/api/equity/holdings/${investor.equity_investor_id}`
    );



    /* ==========================================
       MF DATA
    ========================================== */

    const mfResponse =
    await axios.get(
      `http://localhost:5002/api/mf/funds/${investor.mf_customer_ref}`
    );



    const equityTotal =
    equityResponse.data.total_value || 0;

    const mfTotal =
    mfResponse.data.total_value || 0;

    const totalWealth =
    equityTotal + mfTotal;



    return res.status(200).json({

      success:true,

      wealth_summary:{

        investor_name:investor.full_name,

        equity_total:equityTotal,

        mutual_fund_total:mfTotal,

        total_wealth:totalWealth
      }
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to fetch wealth summary"
    });
  }
};



/* ======================================================
   INVESTOR ACTIVITY
====================================================== */

export const getInvestorActivity =
async(
  req:Request,
  res:Response
) => {

  try {

    const { id } = req.params;

    const investorQuery =
    await pool.query(
      `
      SELECT *
      FROM unified_investors
      WHERE id = $1
      `,
      [id]
    );

    if(investorQuery.rows.length === 0){

      return res.status(404).json({
        success:false,
        message:"Investor not found"
      });
    }

    const investor =
    investorQuery.rows[0];



    /* ==========================================
       EQUITY TRANSACTIONS
    ========================================== */

    const equityTransactions =
    await axios.get(
      `http://localhost:5001/api/equity/transactions/${investor.equity_investor_id}`
    );



    /* ==========================================
       MF TRANSACTIONS
    ========================================== */

    const mfTransactions =
    await axios.get(
      `http://localhost:5002/api/mf/transactions/${investor.mf_customer_ref}`
    );



    return res.status(200).json({

      success:true,

      investor:investor.full_name,

      activity:{

        equity_transactions:
        equityTransactions.data,

        mutual_fund_transactions:
        mfTransactions.data
      }
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to fetch investor activity"
    });
  }
};