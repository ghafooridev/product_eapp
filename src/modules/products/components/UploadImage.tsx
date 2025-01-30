'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

import { FC, useEffect, useState } from 'react';
import { Button } from '@/components/ui';
import Spinner from '@/components/Spinner';
import {
  deleteImage,
  getImagesByProductId,
  uploadImage,
} from '../services/image';
import { Image as ImageType } from '@prisma/client';
import { CircleX } from 'lucide-react';

const UploadImage: FC<{ productId: string }> = ({ productId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<ImageType[] | null>(null);
  const [loading, setLoading] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  };

  const handleUpload = async () => {
    try {
      if (!file || !productId) {
        alert('Please select a file and product');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('productId', productId);

      const { data } = await uploadImage(formData);
      setFile(null);
      setImages(data);
    } catch (error) {
      console.log(error);
      // alert(e.message)
    }
  };

  const fetchImages = async () => {
    try {
      const data = await getImagesByProductId(productId);
      setImages(data.images);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imageId: string) => {
    try {
      setLoading(true);
      await deleteImage(imageId);
      updateImageList(imageId);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateImageList = (imageId: string) => {
    setImages(
      (prevImages) => prevImages?.filter((img) => img.id !== imageId) || null,
    );
  };

  useEffect(() => {
    fetchImages();
  }, [productId]);

  return (
    <div className="w-full">
      <Label htmlFor="picture"> Product Image</Label>
      <div className="flex gap-2 w-full justify-between">
        <Input
          id="picture"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <Button onClick={handleUpload} disabled={!file || !productId}>
          Upload Image
        </Button>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex gap-2 mt-4 flex-wrap items-center justify-between">
          {images?.map((item) => {
            return (
              <div className="relative group " key={item.id}>
                <CircleX
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-1 right-1 text-red-500  p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                />
                <Image
                  width={100}
                  height={100}
                  src={item.image}
                  alt="product image"
                  className="mt-4 mx-auto rounded-md"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default UploadImage;
