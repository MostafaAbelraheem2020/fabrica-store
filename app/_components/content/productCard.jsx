import React from "react";
import ProductImagesSlider from "./productImagesSlider";
function Product({ product }) {
  return (
    <a
      href={`/products/${product.id}`}
      className="block rounded-xl p-4 shadow-md bg-white relative transition hover:shadow-lg"
    >
      {/* معرض الصور */}
      <ProductImagesSlider
        product={product}
        imageWidth={200}
        imageHeight={200}
      />
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
