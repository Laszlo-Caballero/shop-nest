import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ProductModule, AuthModule],
})
export class AppModule {}
