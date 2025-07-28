import React from "react";
import Image from "next/image";
import { useState } from "react";
function Product({ product }) {
  // استخدم صورة افتراضية إذا لم توجد صورة للمنتج
  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [
          {
            url: "/default-image.png",
            width: 500,
            height: 500,
            isPrimary: true,
          },
        ];

  // الصورة الأساسية أو أول صورة
  const [selectedImage, setSelectedImage] = useState(
    images.find((img) => img.isPrimary) || images[0]
  );

  return (
    <a
      href="#"
      className="block rounded-xl p-4 shadow-md bg-white relative transition hover:shadow-lg"
    >
      {/* معرض الصور */}
      <div className="w-full h-48 relative rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="product-gallery w-full">
          {/* الصورة الرئيسية الكبيرة */}
          <div className="main-image mb-2 w-full h-40 relative flex items-center justify-center">
            <Image
              src={selectedImage.url}
              width={selectedImage.width}
              height={selectedImage.height}
              alt={product.title}
              className="rounded-lg shadow-md object-cover transition-all duration-300 group-hover:scale-105"
              style={{ maxHeight: "160px", maxWidth: "100%" }}
              priority
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
                    width={20}
                    height={20}
                    alt={`${product.title} - ${index + 1}`}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <dl>
          <div>
            <dt className="sr-only">{product.title}</dt>
            <dd className="text-sm text-gray-500">${product.price}</dd>
          </div>
          <div>
            <dt className="sr-only">Title</dt>
            <dd className="font-medium">{product.title}</dd>
          </div>
        </dl>

        <div className="mt-6 flex items-center gap-8 text-xs">
          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <svg
              className="size-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Bathroom</p>
            </div>
          </div>
          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Bedroom</p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export default Product;
