import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { CartSchema } from "./customer/models/cart.model";
import { ProductSchema } from "./product/models/product";
import { ProductController } from "./product/product.controller";
import { ProductService } from "./product/product.service";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./shared/guards";
import { CustomerController } from "./customer/customer.controller";
import { CustomerService } from "./customer/customer.service";
import { I18nModule, QueryResolver, AcceptLanguageResolver, HeaderResolver } from 'nestjs-i18n';
import * as path from 'path';
import { CacheModule } from '@nestjs/cache-manager';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.DATA_BASE}`),
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      // { name: 'SystemUser', schema: SystemUserSchema },
      { name: 'Cart', schema: CartSchema },
    ]),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/../i18n/'),
        watch: true,
      },
      resolvers: [
        new HeaderResolver(['x-lang', 'accept-language']),
        new QueryResolver(['lang']),
      ],
    }),
    CacheModule.register({
      ttl: 60, // seconds (default time-to-live)
      max: 100, // maximum number of items in cache
    }),
  ],
  controllers: [
    AppController,
    ProductController,
    CustomerController,
  ],
  providers: [
    AppService,
    ProductService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    CustomerService,
  ],
})
export class AppModule {}
