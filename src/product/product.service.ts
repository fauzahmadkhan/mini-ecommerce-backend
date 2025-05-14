import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductDocument } from "./models/product";
import {
  CreateProductRequest,
  DefaultResponse,
  ProductCatalogueRequest,
} from "../shared/client-pb";
import * as mongoose from 'mongoose';
// import * as path from 'path';
// import * as XLSX from 'xlsx';
// import * as fs from 'fs';
// import { HelpersService } from "../shared/helpers/helpers-service";
// import { ProductGroupDocument } from "./models/group.model";
// import { IDCountService } from "../shared/id-count/id-count.service";
// import { SubscriptionDocument } from "../subscription/models/subscription.model";
// import { OrderDocument } from "../order/models/order.model";
import { CartDocument } from "../customer/models/cart.model";
// import * as csvParser from 'csv-parser';


@Injectable()
export class ProductService {
  
  // @Inject(HelpersService)
  // private readonly helpersService: HelpersService;
  
  // @Inject(IDCountService)
  // private readonly idCountService: IDCountService;
  
  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductDocument>,
    // @InjectModel('ProductGroup') private readonly productGroupModel: Model<ProductGroupDocument>,
    // @InjectModel('Subscription') private readonly subscriptionModel: Model<SubscriptionDocument>,
    // @InjectModel('Order') private readonly orderModel: Model<OrderDocument>,
    // @InjectModel('Cart') private readonly cartModel: Model<CartDocument>,
  ) {
  }
  
  async create(
    productData: CreateProductRequest,
  )
    : Promise<DefaultResponse> {
    try {
      const isNameSame = await this.productModel.findOne({
        name: productData.name
      }, { _id: 1 })
      if (isNameSame) {
        return {
          success: false,
          statusCode: HttpStatus.OK,
          data: { message: 'Name must be unique.' },
        }
      }
      
      const productCreated = await this.productModel.create({ ...productData });
      
      // product images can be handled later
      
      return {
        success: true,
        statusCode: HttpStatus.CREATED,
        data: productCreated,
      }
    } catch (error) {
      return {
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {},
        error,
      }
    }
  }
  
  
  async getProductById(id: string)
    : Promise<DefaultResponse> {
    try {
      const productRecord = await this.productModel.findById({
        _id: new mongoose.Types.ObjectId(id)
      }).populate('productGroupId');
      if (!productRecord) {
        return {
          success: false,
          statusCode: HttpStatus.NOT_FOUND,
          data: { message: 'Record not found.' }
        }
      }
      
      return {
        success: true,
        statusCode: HttpStatus.OK,
        data: productRecord
      }
    } catch (error) {
      return {
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {},
        error,
      }
    }
  }
  
  
  async catalogue(
    { searchTerm }: ProductCatalogueRequest,
    page: any,
    pageSize: any
  ): Promise<DefaultResponse> {
    try {
      const skip = (Number(page) - 1) * Number(pageSize);
      let matchConditions: any;
      
      if (searchTerm === '') {
        matchConditions = {
          // units: { $gte: 1 },
        };
      } else {
        
        const searchTermRegexFirstMatch = new RegExp(`^${searchTerm}`, 'i'),
          searchTermRegexAny = new RegExp(searchTerm, 'i')
        
        matchConditions = {
          // units: { $gte: 1 },
          $or: [
            { name: searchTermRegexFirstMatch },
            { name: searchTermRegexAny },
            { name: searchTerm },
          ]
        }
      }
      
      const totalUniqueGroups = await this.productModel.aggregate([
        { $match: matchConditions },
        { $group: { _id: "$name" } },
        { $count: "totalCount" }
      ]);
      
      const totalCount = totalUniqueGroups[0]?.totalCount || 0;
      
      const response = await this.productModel.aggregate([
        { $match: matchConditions },
        {
          $group: {
            _id: "$name",
            products: { $push: "$$ROOT" },
            count: { $sum: 1 },
          },
        },
        { $skip: +skip },
        { $limit: +pageSize },
        { $sort: { 'products.createdAt': -1 } },
      ]);
      
      const totalPages = Math.ceil(totalCount / +pageSize);
      const paginatedData = {
        totalCount,
        totalPages,
        currentPage: +page,
        response,
      };
      
      return {
        statusCode: HttpStatus.OK,
        data: paginatedData,
        error: [],
        success: true,
      };
      
    } catch (error) {
      console.log('product search error', error)
      const data = {
        totalCount: 0,
        totalPages: 0,
        currentPage: 1,
        response: [],
        message: 'Operation not performed.'
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        data: data,
        error: error,
        success: false,
      };
    }
  }
  
}
