import { Request, Response } from "express";

import { pool } from "../db";



/* ======================================================
   COMPLIANCE REPORTS
====================================================== */

export const getComplianceReports =
async(
  req:Request,
  res:Response
) => {

  try {

    const reports =
    await pool.query(
      `
      SELECT
        id,
        action_type,
        action_status,
        endpoint,
        request_method,
        created_at

      FROM audit_logs

      ORDER BY created_at DESC
      `
    );

    return res.status(200).json({

      success:true,

      reports:reports.rows
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to fetch compliance reports"
    });
  }
};



/* ======================================================
   ACCESS LOGS
====================================================== */

export const getAccessLogs =
async(
  req:Request,
  res:Response
) => {

  try {

    const accessLogs =
    await pool.query(
      `
      SELECT
        id,
        user_id,
        role_id,
        endpoint,
        request_method,
        ip_address,
        created_at

      FROM audit_logs

      ORDER BY created_at DESC
      `
    );

    return res.status(200).json({

      success:true,

      access_logs:
      accessLogs.rows
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to fetch access logs"
    });
  }
};



/* ======================================================
   ACTIVITY LOGS
====================================================== */

export const getActivityLogs =
async(
  req:Request,
  res:Response
) => {

  try {

    const activityLogs =
    await pool.query(
      `
      SELECT
        id,
        user_id,
        action_type,
        action_status,
        description,
        endpoint,
        created_at

      FROM audit_logs

      ORDER BY created_at DESC
      `
    );

    return res.status(200).json({

      success:true,

      activity_logs:
      activityLogs.rows
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to fetch activity logs"
    });
  }
};



/* ======================================================
   EXPORT REPORTS
====================================================== */

export const exportReports =
async(
  req:Request,
  res:Response
) => {

  try {

    const { type } = req.params;

    const exportData =
    await pool.query(
      `
      SELECT *
      FROM audit_logs

      ORDER BY created_at DESC
      `
    );

    return res.status(200).json({

      success:true,

      export_type:type,

      exported_records:
      exportData.rows.length,

      data:
      exportData.rows
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to export compliance reports"
    });
  }
};