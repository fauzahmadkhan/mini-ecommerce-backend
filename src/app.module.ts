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
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.DATA_BASE}`),
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      // { name: 'SystemUser', schema: SystemUserSchema },
      { name: 'Cart', schema: CartSchema },
    ]),
  ],
  controllers: [
    AppController,
    ProductController,
  ],
  providers: [
    AppService,
    ProductService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
