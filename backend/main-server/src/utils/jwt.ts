import jwt, { Secret, SignOptions } from "jsonwebtoken";

export const generateToken = (user: any) => {

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role_name,
    employee_code: user.employee_code
  };

  const secret: Secret =
    process.env.JWT_SECRET || "secret";

  const options: SignOptions = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
};