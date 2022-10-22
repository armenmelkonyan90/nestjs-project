import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { rejects } from 'assert';
import { S3 } from 'aws-sdk'
import { extname, parse, resolve } from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
    private s3: S3;
    private bucket: string;

    constructor(
        private readonly configService: ConfigService
    ) {
        this.bucket = configService.get('AWS_BUCKET');
        const isLocal = configService.get('APP_ENV') == 'local';

        this.s3 = isLocal ? (new S3({
            region: configService.get('AWS_DEFAULT_REGION'),
            accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
        })) : (new S3());
    }

    /**
    * Upload file to S3 bucket
    * @param file
    * @param filePath
    */
    public async upload(file: Express.Multer.File, filePath: string): Promise<any> {
        const file_name = `${filePath}${file.originalname}`;

        try {
            await (new Promise((resolve, reject) => {
                this.s3.putObject({
                    Bucket: this.bucket,
                    Key: file_name,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                    ACL: 'public-read'
                }, (err, data) => {
                    if (err || !data) {
                        console.log("ERROR")
                        console.log(err)
                        reject(err)
                    }
                    console.log("Success")
                    console.log(data);
                    resolve(data);
                })
            }));
        } catch (error) {
            throw error
        }

        return true;
    }

    public async delete(fileName: string): Promise<any> {
        try {
            await (new Promise((resolve, reject) => {
                this.s3.deleteObject({
                    Bucket: this.bucket,
                    Key: fileName
                }, (err, data) => {
                    if (err || !data) {
                        console.log("ERROR")
                        console.log(err)
                        reject(err)
                    }
                    console.log("Success")
                    console.log(data);
                    resolve(data);
                })
            }))
        } catch (err) {
            throw err;
        }

        return true;
    }
}