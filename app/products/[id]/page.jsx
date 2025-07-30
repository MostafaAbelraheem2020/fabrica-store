import ProductImagesSlider from "@/app/_components/content/productImagesSlider";
import { ProductDetailsApi } from "@/app/api/productDetailsApi";
import { notFound } from "next/navigation";

export default async function getProductsDetails({ params }) {
  const { id } = await params;
  const product = await ProductDetailsApi(id);
  if (!product) {
    notFound("❌ No such document! ");
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row gap-8 p-6 md:p-10">
        {/* معرض الصور */}
        <div className="md:w-1/2 w-full flex items-center justify-center">
          <ProductImagesSlider
            product={product}
            imageWidth={300}
            imageHeight={300}
          />
        </div>
        {/* بيانات المنتج */}
        <div className="md:w-1/2 w-full flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
              {product.title}
            </h1>
            <p className="text-gray-500 mb-4">{product.category}</p>
            <div className="mb-4">
              <span className="text-3xl font-bold text-indigo-600">
                ${product.price}
              </span>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>
            {/* تفاصيل إضافية */}
            {/* <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-6">
              <span>
                تاريخ الإضافة:{" "}
                {new Date(product.createdAt).toLocaleDateString()}
              </span>
              <span>
                آخر تحديث: {new Date(product.updatedAt).toLocaleDateString()}
              </span>
            </div> */}
          </div>
          {/* أزرار التفاعل */}
          <div className="flex gap-4 mt-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition">
              أضف إلى السلة
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold transition">
              أضف للمفضلة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
