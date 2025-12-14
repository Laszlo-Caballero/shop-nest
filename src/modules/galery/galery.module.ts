import { Module } from '@nestjs/common';
import { GaleryService } from './galery.service';
import { GaleryController } from './galery.controller';
import { PrismaModule } from '@/common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GaleryController],
  providers: [GaleryService],
})
export class GaleryModule {}
