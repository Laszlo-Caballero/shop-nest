import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { photoId, ...rest } = createProductDto;
    const findPhoto = await this.prisma.galery.findUnique({
      where: {
        galleryId: photoId,
      },
    });

    if (!findPhoto) {
      throw new HttpException('Photo not found', 404);
    }

    return this.prisma.product.create({
      data: {
        ...rest,
        photo: {
          connect: {
            galleryId: photoId,
          },
        },
      },
    });
  }

  async findAll(query: QueryProductDto) {
    const { page, limit } = query;

    const skip = (page - 1) * limit;

    const [data, totalItems] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        skip,
        take: Number(limit),
      }),
      this.prisma.product.count(),
    ]);

    return {
      data,
      metadata: {
        totalItems,
        itemCount: data.length,
        totalPages: Math.ceil(totalItems / limit),
      },
    };
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        productId: id,
      },
    });

    if (!product) {
      throw new HttpException('Product not found', 404);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { photoId, ...rest } = updateProductDto;

    const findPhoto = await this.prisma.galery.findUnique({
      where: {
        galleryId: photoId,
      },
    });

    if (!findPhoto) {
      throw new HttpException('Photo not found', 404);
    }

    const findProduct = await this.prisma.product.findUnique({
      where: {
        productId: id,
      },
    });

    if (!findProduct) {
      throw new HttpException('Product not found', 404);
    }

    return this.prisma.product.update({
      where: {
        productId: id,
      },
      data: {
        ...rest,
        photo: {
          connect: {
            galleryId: photoId,
          },
        },
      },
    });
  }

  async remove(id: number) {
    const findProduct = await this.prisma.product.findUnique({
      where: {
        productId: id,
      },
    });

    if (!findProduct) {
      throw new HttpException('Product not found', 404);
    }
    return this.prisma.product.update({
      where: {
        productId: id,
      },
      data: {
        status: false,
      },
    });
  }
}
