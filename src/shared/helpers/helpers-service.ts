// import { Injectable } from '@nestjs/common';
// import * as AWS from "aws-sdk";
// import * as dotenv from "dotenv";
// import { ProductImageDto, UploadFileDto } from "../client-pb";
// import * as sharp from 'sharp';
// import * as path from 'path';
// dotenv.config();
//
// @Injectable()
// export class HelpersService {
//   private bucketName = `${process.env.EBS_S3_BUCKET_NAME}`;
//   private s3: AWS.S3;
//
//   constructor(
//   ) {
//     AWS.config.update({
//       accessKeyId: `${process.env.MINI_ECOMMERCE_IAM_ACCESS_KEY}`,
//       secretAccessKey: `${process.env.MINI_ECOMMERCE_IAM_SECRET_ACCESS_KEY}`,
//       region: `${process.env.EBS_S3_BUCKET_REGION}`,
//     });
//     this.s3 = new AWS.S3();
//   }
//
//   async uploadFileToS3Bucket(file: UploadFileDto): Promise<any> {
//     try {
//       console.log('in uploadFileToS3Bucket', file);
//       const fileName = file.originalname.split('-')[0]
//       const originalName = file.originalname.replace(/\s+/g, '_');
//       console.log('originalName', originalName)
//
//       const uploadParams = {
//         Bucket: this.bucketName,
//         Body: file.buffer,
//         Key: `${process.env.UPLOADS_DIRECTORY}/${originalName}`,
//         ContentType: file.mimetype,
//         ContentDisposition: 'inline',
//       };
//       const response = await this.s3.upload(uploadParams).promise();
//
//       console.log('file response', response);
//       console.log('file.buffer', file.buffer);
//
//       if (response?.Location) {
//         return response.Location;
//       }
//
//       return null;
//
//     } catch (error) {
//       return error
//     }
//
//   }
//
//   async uploadPDFBufferToS3Bucket({ fileName, pdfBuffer }: { fileName: string, pdfBuffer: any }): Promise<any> {
//     try {
//
//       const uploadParams = {
//         Bucket: this.bucketName,
//         Body: pdfBuffer,
//         Key: `uploads/pdfs/${fileName}`,
//         ContentType: 'application/pdf',
//         ContentDisposition: 'attachment',
//       };
//
//       return this.s3.upload(uploadParams).promise();
//
//     } catch (error) {
//       return error
//     }
//
//   }
//
//   async uploadContentToS3Bucket({ keyName, mimeType, content }: { keyName: string, mimeType: string, content: any }): Promise<any> {
//     try {
//       const originalName = keyName.replace(/\s+/g, '_');
//       console.log('originalName', originalName)
//
//       const uploadParams = {
//         Bucket: this.bucketName,
//         Body: content,
//         Key: originalName,
//         ContentType: mimeType,
//         ContentDisposition: 'inline',
//       };
//       const response = await this.s3.upload(uploadParams).promise();
//
//       console.log('file response', response);
//
//       if (response?.Location) {
//         return response.Location;
//       }
//
//       return null;
//
//     } catch (error) {
//       return error
//     }
//
//   }
//
//   async deleteFileFromS3Bucket(urls: string[]): Promise<any> {
//     try {
//       for (const url of urls) {
//         let tokenize = url.split('/');
//         if (tokenize.length > 0) {
//           let s3FileKey = tokenize[tokenize.length - 1];
//           const deleteParams = {
//             Bucket: this.bucketName,
//             Key: `${s3FileKey}`,
//           }
//           await this.s3.deleteObject(deleteParams).promise();
//         }
//       }
//     } catch (error) {
//       console.log('deleteFileFromS3Bucket error', error);
//     }
//   }
//
//   async uploadImageBase64ToS3Bucket(file: ProductImageDto): Promise<any> {
//     try {
//
//       const size = file.size;
//       const type = file.type;
//       const originalName = file.name.replace(/\s+/g, '_');
//
//       // Decode base64 file content
//       const base64Data = file.content.replace(/^data:.+;base64,/, '');
//       let buffer: any = Buffer.from(base64Data, 'base64');
//
//       if (size > 1024 * 1024) {
//
//         if (type === 'image/jpeg' || type === 'image/jpg') {
//           buffer = await sharp(buffer)
//             .resize({ width: 692 }) // Resize if needed
//             .jpeg({ quality: 80 })   // Compress JPEG
//             .toBuffer();
//         }
//         else {
//           buffer = await sharp(buffer)
//             .resize({ width: 692 }) // Resize if needed
//             .png({ compressionLevel: 9 }) // Compress PNG
//             .toBuffer();
//         }
//
//       }
//
//       console.log('buffer', buffer)
//
//       const uploadParams = {
//         Bucket: this.bucketName,
//         Body: buffer,
//         Key: `${process.env.UPLOADS_DIRECTORY}/${originalName}`,
//         ContentType: type,
//         ContentDisposition: 'inline',
//       };
//
//       return this.s3.upload(uploadParams).promise();
//
//     } catch (error) {
//       console.log('uploadImageBase64ToS3Bucket error', error);
//     }
//
//   }
//
//   getBaseDir = () => {
//     if (__dirname.includes('src')) {
//       return path.join(__dirname, '..', '..'); // Development
//     }
//
//     return path.join(__dirname, '..'); // Production (dist)
//   };
//
//
// }
