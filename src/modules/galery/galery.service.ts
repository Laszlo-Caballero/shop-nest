import { PrismaService } from '@/common/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class GaleryService {
  private path = join(__dirname, '../../../public');
  constructor(private prisma: PrismaService) {}

  async uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }

    if (!existsSync(this.path)) {
      await mkdir(this.path);
    }

    const filePath = join(this.path, file.originalname);
    await writeFile(filePath, file.buffer);

    const galery = await this.prisma.galery.create({
      data: {
        imageUrl: `/public/${file.originalname}`,
        mimeType: file.mimetype,
        size: file.size,
      },
    });

    return galery;
  }

  async getAllFiles() {
    return this.prisma.galery.findMany();
  }
}
