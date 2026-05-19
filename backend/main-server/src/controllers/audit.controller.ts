import { Request, Response } from "express";

import { pool } from "../db";



/* ======================================================
   GET ALL AUDIT LOGS
====================================================== */

export const getAuditLogs =
async(
  req:Request,
  res:Response
) => {

  try {

    const logs =
    await pool.query(
      `
      SELECT
        a.id,
        a.user_id,
        p.full_name,
        r.role_name,
        a.action_type,
        a.entity_type,
        a.entity_id,
        a.action_status,
        a.description,
        a.endpoint,
        a.request_method,
        a.ip_address,
        a.created_at

      FROM audit_logs a

      LEFT JOIN platform_users p
      ON a.user_id = p.id

      LEFT JOIN roles r
      ON a.role_id = r.id

      ORDER BY a.created_at DESC
      `
    );

    return res.status(200).json({

      success:true,

      audit_logs:
      logs.rows
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to fetch audit logs"
    });
  }
};



/* ======================================================
   GET SINGLE AUDIT LOG
====================================================== */

export const getAuditLogById =
async(
  req:Request,
  res:Response
) => {

  try {

    const { id } = req.params;

    const log =
    await pool.query(
      `
      SELECT
        a.*,
        p.full_name,
        r.role_name

      FROM audit_logs a

      LEFT JOIN platform_users p
      ON a.user_id = p.id

      LEFT JOIN roles r
      ON a.role_id = r.id

      WHERE a.id = $1
      `,
      [id]
    );

    if(log.rows.length === 0){

      return res.status(404).json({
        success:false,
        message:"Audit log not found"
      });
    }

    return res.status(200).json({

      success:true,

      audit_log:
      log.rows[0]
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to fetch audit log"
    });
  }
};



/* ======================================================
   EXPORT AUDIT LOGS
====================================================== */

export const exportAuditLogs =
async(
  req:Request,
  res:Response
) => {

  try {

    const logs =
    await pool.query(
      `
      SELECT *
      FROM audit_logs

      ORDER BY created_at DESC
      `
    );

    return res.status(200).json({

      success:true,

      exported_records:
      logs.rows.length,

      exported_at:
      new Date(),

      data:
      logs.rows
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to export audit logs"
    });
  }
};