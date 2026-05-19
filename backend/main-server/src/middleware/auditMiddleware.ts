import { pool } from "../db";

export const auditMiddleware =
(actionType:string) => {

  return async(
    req:any,
    res:any,
    next:any
  ) => {

    res.on("finish", async() => {

      try {

        await pool.query(
          `
          INSERT INTO audit_logs
          (
            user_id,
            role_id,
            action_type,
            action_status,
            endpoint,
            request_method,
            ip_address
          )
          VALUES
          ($1,$2,$3,$4,$5,$6,$7)
          `,
          [
            req.user?.id || null,
            null,
            actionType,
            res.statusCode < 400
              ? "SUCCESS"
              : "FAILED",
            req.originalUrl,
            req.method,
            req.ip
          ]
        );

      } catch (error) {
        console.log(error);
      }
    });

    next();
  };
};