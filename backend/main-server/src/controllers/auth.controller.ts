import { Request, Response } from "express";

import bcrypt from "bcrypt";

import { pool } from "../db";

import { generateToken } from "../utils/jwt";





export const login =
async(
  req: Request,
  res: Response
) => {

  try {

    const { email, password } =
    req.body;




    if (!email || !password) {

      return res.status(400).json({

        success: false,

        message:
        "Email and password required"
      });
    }




    const userQuery =
    await pool.query(
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

        message:
        "Invalid credentials"
      });
    }



    const user =
    userQuery.rows[0];


    if (!user.is_active) {

      return res.status(403).json({

        success: false,

        message:
        "User inactive"
      });
    }



    const isPasswordValid =
    await bcrypt.compare(
      password,
      user.password_hash
    );



    if (!isPasswordValid) {

      return res.status(401).json({

        success: false,

        message:
        "Invalid credentials"
      });
    }




    const token =
    generateToken(user);




    return res.status(200).json({

      success: true,

      message:
      "Login successful",

      token,

      user: {

        id:
        user.id,

        full_name:
        user.full_name,

        email:
        user.email,

        role:
        user.role_name,

        employee_code:
        user.employee_code
      }
    });

  } catch (error) {

    console.log(
      "LOGIN ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
      "Internal server error"
    });
  }
};




export const logout =
async(
  req: Request,
  res: Response
) => {

  try {

    return res.status(200).json({

      success:true,

      message:
      "Logout successful"
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success:false,

      message:
      "Internal server error"
    });
  }
};





export const getCurrentUser =
async(
  req:any,
  res:Response
) => {

  try {

    return res.status(200).json({

      success:true,

      user:req.user
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success:false,

      message:
      "Internal server error"
    });
  }
};


export const refreshToken =
async(
  req:any,
  res:Response
) => {

  try {

    const token =
    generateToken(req.user);

    return res.status(200).json({

      success:true,

      token
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success:false,

      message:
      "Internal server error"
    });
  }
};