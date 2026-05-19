import { Request, Response } from "express";

import { pool } from "../db";



/* ======================================================
   LOGIN ACTIVITY
====================================================== */

export const getLoginActivity =
async(
  req:Request,
  res:Response
) => {

  try {

    const loginLogs =
    await pool.query(
      `
      SELECT
        id,
        user_id,
        action_type,
        action_status,
        ip_address,
        endpoint,
        created_at

      FROM audit_logs

      WHERE action_type = 'LOGIN'

      ORDER BY created_at DESC
      `
    );

    return res.status(200).json({

      success:true,

      login_activity:
      loginLogs.rows
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to fetch login activity"
    });
  }
};



/* ======================================================
   ACTIVE SESSIONS
====================================================== */

export const getSessions =
async(
  req:Request,
  res:Response
) => {

  try {

    const activeUsers =
    await pool.query(
      `
      SELECT
        p.id,
        p.full_name,
        p.email,
        p.employee_code,
        r.role_name

      FROM platform_users p

      JOIN roles r
      ON p.role_id = r.id

      WHERE p.is_active = true
      `
    );

    return res.status(200).json({

      success:true,

      active_sessions:
      activeUsers.rows
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to fetch active sessions"
    });
  }
};



/* ======================================================
   FAILED LOGIN ATTEMPTS
====================================================== */

export const getFailedAttempts =
async(
  req:Request,
  res:Response
) => {

  try {

    const failedAttempts =
    await pool.query(
      `
      SELECT
        id,
        user_id,
        action_status,
        description,
        ip_address,
        created_at

      FROM audit_logs

      WHERE action_status = 'FAILED'

      AND action_type = 'LOGIN'

      ORDER BY created_at DESC
      `
    );

    return res.status(200).json({

      success:true,

      failed_attempts:
      failedAttempts.rows
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to fetch failed login attempts"
    });
  }
};



/* ======================================================
   TOKEN ACTIVITY
====================================================== */

export const getTokenActivity =
async(
  req:Request,
  res:Response
) => {

  try {

    const tokenActivity =
    await pool.query(
      `
      SELECT
        id,
        user_id,
        action_type,
        action_status,
        endpoint,
        created_at

      FROM audit_logs

      WHERE action_type IN
      (
        'LOGIN',
        'REFRESH_TOKEN',
        'LOGOUT'
      )

      ORDER BY created_at DESC
      `
    );

    return res.status(200).json({

      success:true,

      token_activity:
      tokenActivity.rows
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to fetch token activity"
    });
  }
};