import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GaleryService } from './galery.service';
import { Auth } from '@/common/decorator/auth/auth.decorator';
import { Role } from '#prisma/enums';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('galery')
export class GaleryController {
  constructor(private readonly galeryService: GaleryService) {}

  @Auth([Role.ADMIN])
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.galeryService.uploadFile(file);
  }

  @Auth([Role.ADMIN])
  @Get()
  getAllFiles() {
    return this.galeryService.getAllFiles();
  }
}
