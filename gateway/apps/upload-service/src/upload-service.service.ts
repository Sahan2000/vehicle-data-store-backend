import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import * as path from 'path';
import { FileUpload } from 'graphql-upload-ts';

@Injectable()
export class UploadServiceService {
    constructor(@InjectQueue('file-queue') private readonly fileQueue: Queue) {}

    async savetoLocalDirectory(file: any ): Promise<boolean> {
        // discribe file
        const { filename, createReadStream } =await file.promise;
        // const { filename } = file.file;
        // const createReadStream = file.promise;

        // Define the upload directory path
        const uploadPath = path.join(process.cwd(),'uploads');

        // Check if the directory exists, if not create it
        if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
        }
        console.log(filename);
        // Set the complete file path
        const filePath = path.join(uploadPath, filename);
        console.log('filePath', filePath);

        const writeStream = createWriteStream(filePath);
        return new Promise((resolve, reject) => {
            // Create a write stream to save the file locally
            const writeStream = createWriteStream(filePath);

            createReadStream()
                .pipe(writeStream)
                .on('finish', async () => {
                    // File upload is finished, now add to the queue
                    await this.fileQueue.add('read-file', { filePath });
                    console.log('File successfully added to queue:', filePath);

                    resolve(true);
                })
                .on('error', (err) => {
                    console.error('File upload error:', err);
                    reject(false);
                });
        });
    }
}
