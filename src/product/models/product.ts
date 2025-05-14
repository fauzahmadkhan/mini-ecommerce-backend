import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Query } from 'mongoose';
import { BaseModel } from "../../shared/base-model";
import mongoose from "mongoose";
// import { Category } from "../../classification/models/category.model";
// import { ProductStatus } from "../../shared/enums";
// import { ProductGroup } from "./group.model";


export type ProductDocument = HydratedDocument<Product>;

@Schema({
  autoIndex: true,
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
})
export class Product extends BaseModel {
  
  @Prop({ trim: true })
  name: string;
  
  @Prop({ default: null })
  price: number;
  
  @Prop()
  description: string;
  
  @Prop([String])
  productImages: string[];
  
  /*
  @Prop({ trim: true })
  barcode: string;

  @Prop()
  internalReference: number;

  @Prop()
  size: number;

  @Prop()
  gender: string;

  @Prop()
  brand: string;

  @Prop()
  garmentType: string;

  @Prop()
  printing: string;

  @Prop()
  composition: string;

  @Prop()
  color: string;

  @Prop()
  season: string;

  @Prop()
  year: number;

  @Prop({ default: null })
  cost: number;

  @Prop({ default: null })
  salesValue: number;

  @Prop({ default: false })
  rental: boolean;

  @Prop({ default: false })
  secondHandSale: boolean;

  @Prop({ default: null })
  salePrice: number;

  @Prop({ default: false })
  inStock: boolean;

  @Prop()
  outOfStockReason: string;

  @Prop({ default: false })
  available: boolean;

  @Prop({ default: 1 })
  units: number;

  @Prop()
  picture: string;

  @Prop({ default: 0 })
  discount: number;

  @Prop()
  sizeGuideImageLink: string;

  @Prop()
  care: string;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ default: false })
  isBestSeller: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  categoryId: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProductGroup' })
  productGroupId: ProductGroup;

  @Prop()
  groupNum: number;

  @Prop({ default: false })
  makeNewGroup: boolean;

  @Prop({ default: null })
  featuredImage: string;
  */
  
}

const ProductSchema = SchemaFactory.createForClass(Product);
// ProductSchema.index({ barcode: 1 }, { unique: true });


// Adding a virtual field to automatically fetch the group
// ProductSchema.virtual('productGroup', {
//   ref: 'ProductGroup',  // Reference to the ProductGroup model
//   localField: 'productGroupId', // The field in Product
//   foreignField: '_id', // The field in ProductGroup
//   justOne: true // Get only one ProductGroup
// });

// Pre-find hook to populate the virtual field
// ProductSchema.pre(/^find/, function (next) {
//   const doc = this as Query<any, ProductDocument>;
//   doc.populate('productGroupId');
//   next();
// });

export { ProductSchema };
