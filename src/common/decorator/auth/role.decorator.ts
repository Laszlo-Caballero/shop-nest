import { Role as RoleEnum } from '#prisma/enums';
import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'role';

export const Role = (roles: RoleEnum[]) => SetMetadata(ROLE_KEY, roles);
