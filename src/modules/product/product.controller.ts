import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from '@/common/decorator/auth/auth.decorator';
import { Role } from '#prisma/enums';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Auth([Role.ADMIN])
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Auth([Role.ADMIN])
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Auth([Role.ADMIN])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Auth([Role.ADMIN])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Auth([Role.ADMIN])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
