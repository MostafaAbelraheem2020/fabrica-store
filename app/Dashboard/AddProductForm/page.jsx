"use client";
import { useState, useContext } from "react";
import { MyContext } from "@/app/api/productsApis";

export default function AddProductForm() {
  const { addProduct, loading, fetchDummy } = useContext(MyContext);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const uploadDummyProductsHandler = async () => {
    try {
      setUploading(true);
      fetchDummy();
    } catch (error) {
      console.error("❌ خطاء في تحميل المنتجات التجريبية:", error);
    } finally {
      setUploading(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // التحقق من نوع الملف
      if (!file.type.startsWith("image/")) {
        alert("يرجى اختيار ملف صورة صحيح");
        return;
      }

      // التحقق من حجم الملف (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert("حجم الصورة كبير جداً. الحد الأقصى 5MB");
        return;
      }

      setSelectedImage(file);

      // عرض معاينة الصورة
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      // التحقق من البيانات المطلوبة
      if (!formData.title || !formData.category || !formData.price) {
        alert("يرجى ملء جميع الحقول المطلوبة");
        return;
      }

      console.log("🔄 بدء عملية إضافة المنتج...");
      const result = await addProduct(formData, selectedImage);

      if (result.success) {
        alert("✅ تم إضافة المنتج بنجاح!");

        // إعادة تعيين النموذج
        setFormData({
          title: "",
          category: "",
          description: "",
          price: "",
        });
        setSelectedImage(null);
        setImagePreview(null);

        // إعادة تعيين input الصورة
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = "";
      } else {
        alert("❌ خطأ: " + result.error);
      }
    } catch (error) {
      console.error("خطأ في النموذج:", error);
      alert("❌ حدث خطأ: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        إضافة منتج جديد
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            اسم المنتج *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="أدخل اسم المنتج"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            الفئة *
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="أدخل فئة المنتج"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            الوصف
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="أدخل وصف المنتج"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            السعر *
          </label>
          <input
            type="number"
            name="price"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="أدخل سعر المنتج"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            صورة المنتج
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            الحد الأقصى: 5MB • الأنواع المدعومة: JPG, PNG, GIF
          </p>

          {imagePreview && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">معاينة الصورة:</p>
              <img
                src={imagePreview}
                alt="معاينة"
                className="w-24 h-24 object-cover rounded border border-gray-300"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={uploading || loading}
          className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
            uploading || loading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white focus:ring-2 focus:ring-blue-500"
          }`}
        >
          {uploading ? "جاري الرفع والحفظ..." : "إضافة المنتج"}
        </button>
      </form>
      <button
        type="submit"
        onClick={uploadDummyProductsHandler}
        disabled={uploading || loading}
        className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
          uploading || loading
            ? "bg-gray-400 cursor-not-allowed text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white focus:ring-2 focus:ring-blue-500"
        }`}
      >
        {uploading ? "جاري الرفع والحفظ..." : "إضافة المنتجات الافتراضية"}
      </button>
    </div>
  );
}
