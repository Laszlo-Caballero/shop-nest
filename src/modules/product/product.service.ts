import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  create(createProductDto: CreateProductDto) {
    return {
      data: 'This action adds a new product',
      token: 'asd',
    };
  }

  findAll() {
    return {
      data: 'This action adds a new product',
      metadata: {
        totalItems: 0,
        itemCount: 0,
        totalPages: 0,
      },
    };
  }

  findOne(id: number) {
    throw new HttpException('Not implemented', 501);
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
