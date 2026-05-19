import { Request, Response } from "express";
import axios from "axios";

import { pool } from "../db";



/* ======================================================
   RM DASHBOARD
====================================================== */

export const getRMDashboard =
async(
  req:any,
  res:Response
) => {

  try {

    const totalInvestors =
    await pool.query(
      `
      SELECT COUNT(*)
      FROM unified_investors
      `
    );

    const totalUsers =
    await pool.query(
      `
      SELECT COUNT(*)
      FROM platform_users
      `
    );

    const recentAudits =
    await pool.query(
      `
      SELECT *
      FROM audit_logs
      ORDER BY created_at DESC
      LIMIT 5
      `
    );

    return res.status(200).json({

      success:true,

      dashboard:{

        total_investors:
        totalInvestors.rows[0].count,

        total_platform_users:
        totalUsers.rows[0].count,

        recent_activity:
        recentAudits.rows
      }
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to load RM dashboard"
    });
  }
};



/* ======================================================
   RM INVESTORS
====================================================== */

export const getRMInvestors =
async(
  req:Request,
  res:Response
) => {

  try {

    const investors =
    await pool.query(
      `
      SELECT
        id,
        full_name,
        pan_number,
        email,
        equity_investor_id,
        mf_customer_ref

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
      message:"Failed to fetch investors"
    });
  }
};



/* ======================================================
   RM PERFORMANCE
====================================================== */

export const getRMPerformance =
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
      `
    );

    let totalWealth = 0;

    const performanceData = [];



    /* ==========================================
       LOOP INVESTORS
    ========================================== */

    for(const investor of investors.rows){

      try {

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



        const equityValue =
        equityResponse.data.total_value || 0;

        const mfValue =
        mfResponse.data.total_value || 0;

        const investorWealth =
        equityValue + mfValue;

        totalWealth += investorWealth;



        performanceData.push({

          investor_name:
          investor.full_name,

          equity_value:
          equityValue,

          mutual_fund_value:
          mfValue,

          total_wealth:
          investorWealth
        });

      } catch (serviceError) {

        console.log(serviceError);
      }
    }



    return res.status(200).json({

      success:true,

      performance:{

        total_investor_count:
        investors.rows.length,

        total_managed_wealth:
        totalWealth,

        investor_performance:
        performanceData
      }
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to fetch RM performance"
    });
  }
};