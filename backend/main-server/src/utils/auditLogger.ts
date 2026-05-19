import { pool } from "../db";



interface AuditLogParams {

  user_id?: number;

  role_id?: number;

  action_type: string;

  entity_type?: string;

  entity_id?: string;

  action_status: string;

  description?: string;

  endpoint?: string;

  request_method?: string;

  ip_address?: string;

  old_data?: any;

  new_data?: any;

  metadata?: any;
}



export const createAuditLog =
async(
  params: AuditLogParams
) => {

  try {

    await pool.query(
      `
      INSERT INTO audit_logs
      (
        user_id,
        role_id,
        action_type,
        entity_type,
        entity_id,
        action_status,
        description,
        endpoint,
        request_method,
        ip_address,
        old_data,
        new_data,
        metadata
      )

      VALUES
      (
        $1,$2,$3,$4,$5,
        $6,$7,$8,$9,$10,
        $11,$12,$13
      )
      `,
      [
        params.user_id || null,
        params.role_id || null,
        params.action_type,
        params.entity_type || null,
        params.entity_id || null,
        params.action_status,
        params.description || null,
        params.endpoint || null,
        params.request_method || null,
        params.ip_address || null,
        params.old_data || null,
        params.new_data || null,
        params.metadata || null
      ]
    );

  } catch (error) {

    console.log(
      "AUDIT LOG ERROR:",
      error
    );
  }
};