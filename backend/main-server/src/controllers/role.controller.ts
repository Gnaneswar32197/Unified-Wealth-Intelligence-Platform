import { Request, Response } from "express";
import { pool } from "../db";




export const getRoles =
async(
  req:Request,
  res:Response
) => {

  try {

    const roles =
    await pool.query(
      `
      SELECT *
      FROM roles
      ORDER BY id
      `
    );

    return res.status(200).json({
      success:true,
      roles:roles.rows
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Internal server error"
    });
  }
};




export const createRole =
async(
  req:Request,
  res:Response
) => {

  try {

    const { role_name } = req.body;

    if(!role_name){

      return res.status(400).json({
        success:false,
        message:"Role name required"
      });
    }

    const existingRole =
    await pool.query(
      `
      SELECT *
      FROM roles
      WHERE role_name = $1
      `,
      [role_name]
    );

    if(existingRole.rows.length > 0){

      return res.status(400).json({
        success:false,
        message:"Role already exists"
      });
    }

    const newRole =
    await pool.query(
      `
      INSERT INTO roles(role_name)

      VALUES($1)

      RETURNING *
      `,
      [role_name]
    );

    return res.status(201).json({
      success:true,
      message:"Role created successfully",
      role:newRole.rows[0]
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Internal server error"
    });
  }
};



export const updateRole =
async(
  req:Request,
  res:Response
) => {

  try {

    const { id } = req.params;

    const { role_name } = req.body;

    const updatedRole =
    await pool.query(
      `
      UPDATE roles

      SET role_name = $1

      WHERE id = $2

      RETURNING *
      `,
      [role_name,id]
    );

    if(updatedRole.rows.length === 0){

      return res.status(404).json({
        success:false,
        message:"Role not found"
      });
    }

    return res.status(200).json({
      success:true,
      message:"Role updated successfully",
      role:updatedRole.rows[0]
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Internal server error"
    });
  }
};



export const deleteRole =
async(
  req:Request,
  res:Response
) => {

  try {

    const { id } = req.params;

    const roleUsers =
    await pool.query(
      `
      SELECT *
      FROM platform_users
      WHERE role_id = $1
      `,
      [id]
    );

    if(roleUsers.rows.length > 0){

      return res.status(400).json({
        success:false,
        message:"Cannot delete role assigned to users"
      });
    }

    await pool.query(
      `
      DELETE FROM roles
      WHERE id = $1
      `,
      [id]
    );

    return res.status(200).json({
      success:true,
      message:"Role deleted successfully"
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Internal server error"
    });
  }
};