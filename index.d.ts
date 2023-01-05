import { S3Client } from '@aws-sdk/client-s3';
import multer from "multer";

export interface Options {
  s3: S3Client;
  bucket: ((req: Express.Request, file: Express.Multer.File, callback: (error: any, bucket?: string) => void) => void) | string;
  key?(req: Express.Request, file: Express.Multer.File, callback: (error: any, key?: string) => void): void;
  acl?: ((req: Express.Request, file: Express.Multer.File, callback: (error: any, acl?: string) => void) => void) | string;
  contentType?(req: Express.Request, file: Express.Multer.File, callback: (error: any, mime?: string, stream?: NodeJS.ReadableStream) => void): void;
  contentDisposition?: ((req: Express.Request, file: Express.Multer.File, callback: (error: any, contentDisposition?: string) => void) => void) | string;
  metadata?(req: Express.Request, file: Express.Multer.File, callback: (error: any, metadata?: any) => void): void;
  cacheControl?: ((req: Express.Request, file: Express.Multer.File, callback: (error: any, cacheControl?: string) => void) => void) | string;
  serverSideEncryption?: ((req: Express.Request, file: Express.Multer.File, callback: (error: any, serverSideEncryption?: string) => void) => void) | string;
  shouldTransform?(req: Express.Request, file: Express.Multer.File, callback: (error: any, metadata?: any) => void): void;
  transforms?: {
    id: string; 
    key(req: Express.Request, file: Express.Multer.File, callback: (error: any, metadata?: any) => void): void; 
    transform(req: Express.Request, file: Express.Multer.File, callback: (error: any, metadata?: any) => void): void
  }[];
}

declare global {
  namespace Express {
    namespace MulterS3 {
      interface File extends Multer.File {
        bucket: string;
        key: string;
        acl: string;
        contentType: string;
        contentDisposition: null;
        storageClass: string;
        serverSideEncryption: null;
        metadata: any;
        location: string;
        etag: string;
        transforms: {
          id: string;
          size: string;
          bucket: string;
          key: string;
          acl: string;
          contentType: string;
          contentDisposition: null;
          storageClass: string;
          serverSideEncryption: null;
          metadata: any;
          location: string;
          etag: string;
        }[];
      }
    }
  }
}

export interface S3StorageTransforms {
  (options?: Options): multer.StorageEngine;

  AUTO_CONTENT_TYPE(req: Express.Request, file: Express.Multer.File, callback: (error: any, mime?: string, stream?: NodeJS.ReadableStream) => void): void;
  DEFAULT_CONTENT_TYPE(req: Express.Request, file: Express.Multer.File, callback: (error: any, mime?: string) => void): void;
}

declare const s3Storage: S3StorageTransforms;
export default s3Storage;
