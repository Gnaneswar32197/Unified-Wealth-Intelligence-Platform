import {
  Response,
  NextFunction
} from "express";

import {
  createAuditLog
} from "../utils/auditLogger";



export const authorizeRoles =
(...roles:string[]) => {

  return async(
    req:any,
    res:Response,
    next:NextFunction
  ) => {

    if (
      !roles.includes(req.user.role)
    ) {

      await createAuditLog({

        user_id:req.user?.id,

        role_id:req.user?.role_id,

        action_type:"UNAUTHORIZED_ACCESS",

        action_status:"DENIED",

        description:"Unauthorized route access",

        endpoint:req.originalUrl,

        request_method:req.method,

        ip_address:req.ip
      });

      return res.status(403).json({
        success:false,
        message:"Access denied"
      });
    }

    next();
  };
};