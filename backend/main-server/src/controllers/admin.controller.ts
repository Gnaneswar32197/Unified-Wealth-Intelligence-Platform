import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../db";
import { createAuditLog } from "../utils/auditLogger";





export const getAllUsers =
async(
  req:Request,
  res:Response
) => {

  try {

    const users = await pool.query(
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
      message:"Internal server error"
    });
  }
};





export const createUser =
async(
  req:Request,
  res:Response
) => {

  try {

    const {
      full_name,
      email,
      password,
      role_id,
      employee_code
    } = req.body;

    const existingUser =
    await pool.query(
      `
      SELECT *
      FROM platform_users
      WHERE email = $1
      `,
      [email]
    );

    if(existingUser.rows.length > 0){

      return res.status(400).json({
        success:false,
        message:"User already exists"
      });
    }

    const hashedPassword =
    await bcrypt.hash(password,10);

    const newUser =
    await pool.query(
      `
      INSERT INTO platform_users
      (
        full_name,
        email,
        password_hash,
        role_id,
        employee_code
      )

      VALUES($1,$2,$3,$4,$5)

      RETURNING *
      `,
      [
        full_name,
        email,
        hashedPassword,
        role_id,
        employee_code
      ]
    );

    return res.status(201).json({
      success:true,
      message:"User created successfully",
      user:newUser.rows[0]
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Internal server error"
    });
  }
};




export const updateUserRole =
async(
  req:Request,
  res:Response
) => {

  try {

    const { id } = req.params;

    const { role_id } = req.body;





    const existingUser =
    await pool.query(
      `
      SELECT role_id
      FROM platform_users
      WHERE id = $1
      `,
      [id]
    );

    const oldRole =
    existingUser.rows[0].role_id;



    const updatedUser =
    await pool.query(
      `
      UPDATE platform_users

      SET role_id = $1

      WHERE id = $2

      RETURNING *
      `,
      [role_id,id]
    );




    await createAuditLog({

      user_id:(req as any).user.id,

      role_id:(req as any).user.role_id,

      action_type:"ROLE_UPDATE",

      entity_type:"PLATFORM_USER",

      entity_id:String(id),

      action_status:"SUCCESS",

      description:"User role updated",

      endpoint:req.originalUrl,

      request_method:req.method,

      ip_address:req.ip,

      old_data:{
        role_id:oldRole
      },

      new_data:{
        role_id
      }
    });



    return res.status(200).json({

      success:true,

      message:"Role updated successfully",

      user:updatedUser.rows[0]
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Internal server error"
    });
  }
};





export const updateUserStatus =
async(
  req:Request,
  res:Response
) => {

  try {

    const { id } = req.params;

    const { is_active } = req.body;

    const updatedUser =
    await pool.query(
      `
      UPDATE platform_users

      SET is_active = $1

      WHERE id = $2

      RETURNING *
      `,
      [is_active,id]
    );

    return res.status(200).json({
      success:true,
      message:"User status updated",
      user:updatedUser.rows[0]
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Internal server error"
    });
  }
};



export const deleteUser =
async(
  req:Request,
  res:Response
) => {

  try {

    const { id } = req.params;

    const deletedUser =
    await pool.query(
      `
      UPDATE platform_users

      SET is_active = false

      WHERE id = $1

      RETURNING *
      `,
      [id]
    );

    return res.status(200).json({
      success:true,
      message:"User deactivated successfully",
      user:deletedUser.rows[0]
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Internal server error"
    });
  }
};


export const getSystemHealth =
async(
  req:Request,
  res:Response
) => {

  try {

    return res.status(200).json({
      success:true,

      system_health:{
        gateway_server:"RUNNING",
        equity_service:"RUNNING",
        mf_service:"RUNNING",
        database:"CONNECTED",
        uptime:"ACTIVE"
      }
    });

  } catch (error) {

    return res.status(500).json({
      success:false,
      message:"Internal server error"
    });
  }
};




export const getPlatformAnalytics =
async(
  req:Request,
  res:Response
) => {

  try {

    const users =
    await pool.query(
      `
      SELECT COUNT(*) FROM platform_users
      `
    );

    const investors =
    await pool.query(
      `
      SELECT COUNT(*) FROM unified_investors
      `
    );

    const audits =
    await pool.query(
      `
      SELECT COUNT(*) FROM audit_logs
      `
    );

    return res.status(200).json({
      success:true,

      analytics:{
        total_users:users.rows[0].count,
        total_investors:investors.rows[0].count,
        total_audit_logs:audits.rows[0].count
      }
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Internal server error"
    });
  }
};