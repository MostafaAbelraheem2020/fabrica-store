// utils/uploadToCloudinary.js
export const uploadImageToCloudinary = async (
  imageFile,
  folder = "products"
) => {
  try {
    const formData = new FormData();

    formData.append("file", imageFile);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("folder", folder);
    formData.append("resource_type", "image");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("فشل في رفع الصورة");
    }

    const data = await response.json();

    return {
      url: data.secure_url,
      publicId: data.public_id,
      width: data.width,
      height: data.height,
      format: data.format,
      bytes: data.bytes,
    };
  } catch (error) {
    console.error("خطأ في رفع الصورة:", error);
    throw error;
  }
};
