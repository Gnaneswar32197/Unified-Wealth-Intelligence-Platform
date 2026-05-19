import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createAuditLog } from "../utils/auditLogger";

import { pool } from "../db";

import {
  generateToken
} from "../utils/jwt";



/* ======================================================
   LOGIN
====================================================== */

export const login = async (
  req: Request,
  res: Response
) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message: "Email and password required"
      });
    }

    const userQuery = await pool.query(
      `
      SELECT
        p.id,
        p.full_name,
        p.email,
        p.password_hash,
        p.employee_code,
        p.role_id,
        p.is_active,
        r.role_name

      FROM platform_users p

      JOIN roles r
      ON p.role_id = r.id

      WHERE p.email = $1
      `,
      [email]
    );

    if (userQuery.rows.length === 0) {

      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const user = userQuery.rows[0];

    if (!user.is_active) {

      return res.status(403).json({
        success: false,
        message: "User inactive"
      });
    }

    const isPasswordValid =
    await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isPasswordValid) {

  await createAuditLog({

    user_id:user.id,

    role_id:user.role_id,

    action_type:"LOGIN",

    entity_type:"AUTH",

    entity_id:user.employee_code,

    action_status:"FAILED",

    description:"Invalid password attempt",

    endpoint:req.originalUrl,

    request_method:req.method,

    ip_address:req.ip,

    metadata:{
      email_attempt:email
    }
  });

  return res.status(401).json({
    success: false,
    message: "Invalid credentials"
  });
}

    const token = generateToken(user);

await createAuditLog({

  user_id:user.id,

  role_id:user.role_id,

  action_type:"LOGIN",

  entity_type:"AUTH",

  entity_id:user.employee_code,

  action_status:"SUCCESS",

  description:"User logged in successfully",

  endpoint:req.originalUrl,

  request_method:req.method,

  ip_address:req.ip,

  metadata:{
    browser:req.headers["user-agent"]
  }
});

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};



/* ======================================================
   LOGOUT
====================================================== */

export const logout = async (
  req: any,
  res: Response
) => {

  try {

    return res.status(200).json({
      success:true,
      message:"Logout successful"
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
   CURRENT USER
====================================================== */

export const getCurrentUser = async (
  req:any,
  res:Response
) => {

  try {

    const userQuery =
    await pool.query(
      `
      SELECT
        p.id,
        p.full_name,
        p.email,
        p.employee_code,
        p.is_active,
        r.role_name

      FROM platform_users p

      JOIN roles r
      ON p.role_id = r.id

      WHERE p.id = $1
      `,
      [req.user.id]
    );

    if(userQuery.rows.length === 0){

      return res.status(404).json({
        success:false,
        message:"User not found"
      });
    }

    return res.status(200).json({
      success:true,
      user:userQuery.rows[0]
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
   REFRESH TOKEN
====================================================== */

export const refreshToken =
async(
  req:any,
  res:Response
) => {

  try {

    const token =
    generateToken(req.user);

    await createAuditLog({

      user_id:req.user.id,

      role_id:req.user.role_id,

      action_type:"REFRESH_TOKEN",

      action_status:"SUCCESS",

      description:"JWT token refreshed",

      endpoint:req.originalUrl,

      request_method:req.method,

      ip_address:req.ip
    });

    return res.status(200).json({
      success:true,
      token
    });

  } catch (error:any) {

    await createAuditLog({

      user_id:req.user?.id,

      role_id:req.user?.role_id,

      action_type:"API_FAILURE",

      action_status:"FAILED",

      description:error.message,

      endpoint:req.originalUrl,

      request_method:req.method,

      ip_address:req.ip
    });

    return res.status(500).json({
      success:false,
      message:"Internal server error"
    });
  }
};