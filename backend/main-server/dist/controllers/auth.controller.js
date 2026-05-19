"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../db");
const jwt_1 = require("../utils/jwt");
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password required"
            });
        }
        const userQuery = await db_1.pool.query(`
      SELECT
        p.id,
        p.full_name,
        p.email,
        p.password_hash,
        p.employee_code,
        p.is_active,
        r.role_name
      FROM platform_users p
      JOIN roles r
      ON p.role_id = r.id
      WHERE p.email = $1
      `, [email]);
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
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password_hash);
        if (!isPasswordValid) {
            await db_1.pool.query(`
        INSERT INTO audit_logs
        (
          user_id,
          role_id,
          action_type,
          action_status,
          description,
          endpoint,
          request_method
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        `, [
                user.id,
                null,
                "LOGIN",
                "FAILED",
                "Invalid password attempt",
                "/api/auth/login",
                "POST"
            ]);
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        const token = (0, jwt_1.generateToken)(user);
        await db_1.pool.query(`
      INSERT INTO audit_logs
      (
        user_id,
        role_id,
        action_type,
        action_status,
        description,
        endpoint,
        request_method
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      `, [
            user.id,
            null,
            "LOGIN",
            "SUCCESS",
            "User logged in successfully",
            "/api/auth/login",
            "POST"
        ]);
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role_name,
                employee_code: user.employee_code
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
exports.login = login;
