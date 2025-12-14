import { Role } from '#prisma/enums';
import { Request } from 'express';

export interface JwtPayload {
  userId: number;
  role: Role;
  iat: number;
}

export interface RequestUser extends Request {
  user: JwtPayload;
}
