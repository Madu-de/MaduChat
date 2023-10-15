import { Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';

@Injectable()
export class SharpPipe
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(image: Express.Multer.File): Promise<string> {
    const originalName = path.parse(image.originalname).name;
    const filename = Date.now() + '-' + originalName + '.webp';
    const filePath = path.join('profilepictures', filename);

    await sharp(image.buffer)
      .resize(250, 250)
      .webp({ effort: 3 })
      .toFile(filePath);

    return filePath;
  }
}
