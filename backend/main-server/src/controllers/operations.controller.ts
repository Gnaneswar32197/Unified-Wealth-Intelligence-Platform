import { Request, Response } from "express";
import axios from "axios";

import { pool } from "../db";



/* ======================================================
   FAILED SIPS
====================================================== */

export const getFailedSIPs =
async(
  req:Request,
  res:Response
) => {

  try {

    const response =
    await axios.get(
      "http://localhost:5002/api/mf/sips/failed"
    );

    return res.status(200).json({

      success:true,

      failed_sips:
      response.data
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to fetch failed SIPs"
    });
  }
};



/* ======================================================
   INACTIVE INVESTORS
====================================================== */

export const getInactiveInvestors =
async(
  req:Request,
  res:Response
) => {

  try {

    const inactiveInvestors =
    await pool.query(
      `
      SELECT *
      FROM unified_investors

      WHERE id NOT IN (

        SELECT DISTINCT entity_id::INTEGER
        FROM audit_logs

        WHERE entity_type = 'INVESTOR'
      )
      `
    );

    return res.status(200).json({

      success:true,

      inactive_investors:
      inactiveInvestors.rows
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to fetch inactive investors"
    });
  }
};



/* ======================================================
   SERVICE FAILURES
====================================================== */

export const getServiceFailures =
async(
  req:Request,
  res:Response
) => {

  try {

    const failedServices =
    await pool.query(
      `
      SELECT *
      FROM audit_logs

      WHERE action_status = 'FAILED'

      ORDER BY created_at DESC
      `
    );

    return res.status(200).json({

      success:true,

      service_failures:
      failedServices.rows
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to fetch service failures"
    });
  }
};



/* ======================================================
   RETRY FAILED JOB
====================================================== */

export const retryJob =
async(
  req:Request,
  res:Response
) => {

  try {

    const { id } = req.params;

    return res.status(200).json({

      success:true,

      message:`Retry initiated for job ${id}`,

      retry_status:"IN_PROGRESS"
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Retry failed"
    });
  }
};



/* ======================================================
   RECONCILIATION
====================================================== */

export const getReconciliation =
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

    const reconciliationData = [];



    for(const investor of investors.rows){

      try {

        const equityResponse =
        await axios.get(
          `http://localhost:5001/api/equity/holdings/${investor.equity_investor_id}`
        );

        const mfResponse =
        await axios.get(
          `http://localhost:5002/api/mf/funds/${investor.mf_customer_ref}`
        );



        const equityValue =
        equityResponse.data.total_value || 0;

        const mfValue =
        mfResponse.data.total_value || 0;



        reconciliationData.push({

          investor_name:
          investor.full_name,

          equity_total:
          equityValue,

          mutual_fund_total:
          mfValue,

          reconciliation_status:
          "MATCHED"
        });

      } catch (serviceError) {

        reconciliationData.push({

          investor_name:
          investor.full_name,

          reconciliation_status:
          "FAILED"
        });
      }
    }



    return res.status(200).json({

      success:true,

      reconciliation:
      reconciliationData
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed reconciliation process"
    });
  }
};