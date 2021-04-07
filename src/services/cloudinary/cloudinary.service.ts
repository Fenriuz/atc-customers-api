import { Inject, Injectable } from '@nestjs/common';
import { Cloudinary } from './cloudinary.provider';
import * as CloudinaryLib from 'cloudinary';
import { UploadApiOptions } from 'cloudinary';
import { cloudinaryFolders } from '@shared/constants/cloudinary.constants';

const uploadOptions = (id: string, selectedOption: string) => {
  const options = {
    restaurantCover: {
      overwrite: true,
      invalidate: true,
      width: 1000,
      height: 550,
      crop: 'fill',
      folder: cloudinaryFolders.restaurantCovers,
      public_id: id,
      format: 'jpeg',
    },
    restaurantLogo: {
      overwrite: true,
      invalidate: true,
      width: 750,
      height: 750,
      crop: 'fill',
      folder: cloudinaryFolders.restaurantLogos,
      public_id: id,
      format: 'png',
    },
  };
  return options[selectedOption];
};

@Injectable()
export class CloudinaryService {
  private v2: typeof CloudinaryLib.v2;
  constructor(
    @Inject(Cloudinary)
    private cloudinary: typeof CloudinaryLib,
  ) {
    this.cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
    this.v2 = cloudinary.v2;
  }
  async upload(
    file: string,
    options: 'restaurantCover' | 'restaurantLogo',
    id: string,
  ) {
    try {
      return await this.v2.uploader.upload(file, uploadOptions(id, options));
    } catch (e) {
      console.log(e);
    }
  }
}
