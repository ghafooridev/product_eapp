'use client';
import * as React from 'react';

import { useEffect, useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import { getImagesByProductId } from '@/modules/products/services/image';
import Image from 'next/image';
import { Image as ImageType } from '@prisma/client';

function CatalogList() {
  const params = useSearchParams();
  const id = params.get('id');
  const [images, setImages] = useState([]);

  useEffect(() => {
    getImagesByProductId(id as string).then((_images) => {
      setImages(_images.images);
    });
  }, [id]);

  return (
    <div className="flex flex-wrap justify-center mb-4">
      {images?.map((_image: ImageType, index) => {
        return (
          <div className="p-1" key={index}>
            <Card>
              <CardContent className="flex w-[400px] h-[400px] items-center justify-center p-6">
                <Image
                  src={_image?.image}
                  alt="gallery"
                  width={400}
                  height={400}
                  className="hover:scale-105 transform transition-transform duration-300"
                />
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default CatalogList;
