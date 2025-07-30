import { doc, getDoc } from "firebase/firestore";
import { db } from "../_utilties/firebaseConfig";
import { notFound } from "next/navigation";

// [دالة  جلب تفاصيل المنتج     ]
export async function ProductDetailsApi(id) {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return notFound("❌ No such document! ");
    }
    const productDetails = docSnap.data();
    return {
      id: docSnap.id,
      title: productDetails.title,
      category: productDetails.category,
      price: productDetails.price,
      createdAt: productDetails.createdAt,
      images: productDetails.images || [],
      description: productDetails.description || "",
    };
  } catch (error) {
    console.error("❌ خطاء في جلب تفاصيل المنتج:", error.message);
  }
}
