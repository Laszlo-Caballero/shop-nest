import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';
import { GaleryModule } from './modules/galery/galery.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    ProductModule,
    AuthModule,
    GaleryModule,
  ],
})
export class AppModule {}
