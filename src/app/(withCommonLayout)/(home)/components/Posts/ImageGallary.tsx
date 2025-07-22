"use client";

import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Image from "next/image";

interface IProps {
  images: string[];
}

export default function ImageGallery({ images }: IProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-2 sm:p-3 mt-4 border border-gray-200 dark:border-gray-700">
      <PhotoProvider>
        <div
          className={`grid gap-2 sm:gap-3 ${
            images.length === 1 ? "grid-cols-1" : "grid-cols-2"
          }`}
        >
          {images.map((image, index) => (
            <PhotoView key={index} src={image}>
              <div
                className={`w-full block rounded-lg overflow-hidden group ${
                  images.length === 3 && index === 0
                    ? "col-span-2"
                    : "col-span-1"
                }`}
              >
                <Image
                  alt={`image-${index}`}
                  className="h-48 sm:h-56 md:h-64 lg:h-72 w-full object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105"
                  height={500}
                  src={image}
                  width={500}
                />
              </div>
            </PhotoView>
          ))}
        </div>
      </PhotoProvider>
    </div>
  );
}
