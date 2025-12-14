import { Role } from '#prisma/enums';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ROLE_KEY } from './role.decorator';
import { JwtAuthGuard } from '@/common/auth/jwt-auth.guard';
import { RoleGuard } from '@/common/auth/role.guard';

export const Auth = (role?: Role[]) => {
  return applyDecorators(
    SetMetadata(ROLE_KEY, role),
    UseGuards(JwtAuthGuard, RoleGuard),
  );
};
