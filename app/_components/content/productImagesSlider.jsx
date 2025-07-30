"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { auth } from "@/app/_utilties/firebaseConfig";
export default function ProductImagesSlider({
  product,
  imageWidth = 400,
  imageHeight = 400,
}) {
  // استخدم صورة افتراضية إذا لم توجد صورة للمنتج

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [
          {
            url: "/default-image.png",
            width: imageWidth,
            height: imageHeight,
            isPrimary: true,
          },
        ];
  const [selectedImage, setSelectedImage] = useState(
    (product.images &&
      product.images.length > 0 &&
      images.find((img) => img.isPrimary)) ||
      images[0]
  );

  return (
    <div className="relative rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
      <div className="product-gallery w-full">
        {/* الصورة الرئيسية الكبيرة */}
        <div className="main-image mb-2 relative flex items-center justify-center">
          <Image
            src={selectedImage.url}
            width={imageWidth}
            height={imageHeight}
            alt={product.title}
            className="rounded-lg shadow-md object-cover transition-all duration-300 group-hover:scale-105"
            priority
            objectFit="cover"
          />
        </div>

        {/* الصور المصغرة */}
        {images.length > 1 && (
          <div className="thumbnails flex gap-2 w-full  justify-center">
            {images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedImage(image);
                  console.log(product);
                }}
                className={`flex-shrink-0 border-2 h-[20px] w-[20px] rounded-md overflow-hidden transition
                    ${
                      selectedImage.url === image.url
                        ? "border-blue-500"
                        : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                aria-label={`عرض صورة رقم ${index + 1}`}
              >
                <Image
                  src={image.url}
                  width={100}
                  height={100}
                  alt={`${product.title} - ${index + 1}`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
