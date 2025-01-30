import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui';
import Image from 'next/image';
import IMG1 from './images/1.webp';
import IMG2 from './images/2.png';
import IMG3 from './images/3.jpg';
import IMG4 from './images/4.webp';

export function Banner() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {[IMG1, IMG2, IMG3, IMG4].map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="relative aspect-square h-[400px] flex items-center justify-center p-6 w-full">
                  <Image
                    alt={`bannerImage-${index}`}
                    src={image}
                    fill
                    className="object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
