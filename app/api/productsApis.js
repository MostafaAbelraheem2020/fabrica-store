"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../_utilties/firebaseConfig";
import { auth } from "../_utilties/firebaseConfig";
import { uploadImageToCloudinary } from "../_utilties/cloudinaryUpload";
// dummy products
import dummyProductsjson from "./defaultProducts1.json";
// إنشاء الكونتكست
export const MyContext = createContext();

// مزود الكونتكست
export function MyContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dummyProducts, setDummyProducts] = useState([]);

  // جلب المنتجات من Firebase
  useEffect(() => {
    setLoading(true);
    console.log("🔄 جار بيانات المستخدم Firebase...");
    //[Get authentcation from Firebase]
    // const user = auth.currentUser;
    // if (!user) {
    //   console.error("❌ لم يتم تسجيل الدخول. يرجى تسجيل الدخول أولاً.");
    // }
    // console.log("✅ المستخدم الحالي:", user.email);

    // [Get Prodects from Firebase]
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const productsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        localStorage.setItem("productsList", JSON.stringify(productsList));
        setProducts(productsList);
        console.log("✅ تم جلب المنتجات:", productsList);
      } catch (error) {
        console.error("❌ خطأ في جلب البيانات:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // إضافة منتجات افتراضية الى قاعدة البيانات  مستقدمة من ملف JSON
  // // دالة رفع جميع منتجات dummy إلى فايرستور
  //[Get Prodects from Dummy json file ]

  const fetchDummy = async () => {
    setLoading(true);
    console.log("🔄 جاري جلب المنتجات من ملف JSON...");
    const dummyList = await dummyProductsjson.map((product, idx) => ({
      id: product.id || idx + 1,
      title: product.title,
      category: product.category,
      description: product.description,
      price: parseFloat(product.price),
      images: Array.isArray(product.images)
        ? product.images.map((img, i) => ({
            url: img.url,

            width: img.width || 500,
            height: img.height || 500,
            isPrimary: img.isPrimary || false,
          }))
        : [],

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    // حفظ المنتجات في الحالة المحلية

    localStorage.setItem("productsList", JSON.stringify(dummyList));
    for (const product of dummyList) {
      // تجهيز بيانات المنتج بدون id (Firestore ينشئ id تلقائياً)
      const { id, ...productData } = product;
      await addDoc(collection(db, "products"), productData);
    }
    setProducts((prev) => [...prev, ...dummyList]);

    console.log("✅ تم جلب المنتجات من ملف JSON:", dummyList);
  };

  // إضافة منتج جديد مع رفع الصورة إلى Cloudinary
  const addProduct = async (productData, imageFile) => {
    setLoading(true);
    try {
      let imageInfo = null;

      // 1. رفع الصورة إلى Cloudinary أولاً
      if (imageFile) {
        console.log("🔄 جاري رفع الصورة إلى Cloudinary...");
        imageInfo = await uploadImageToCloudinary(imageFile, "products");
        console.log("✅ تم رفع الصورة بنجاح:", imageInfo.url);
      }

      // 2. إعداد بيانات المنتج
      const productToSave = {
        title: productData.title,
        category: productData.category,
        description: productData.description,
        price: parseFloat(productData.price),
        image: imageInfo
          ? {
              url: imageInfo.url,
              publicId: imageInfo.publicId,
              width: imageInfo.width,
              height: imageInfo.height,
            }
          : null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // 3. حفظ في Firestore
      console.log("🔄 جاري حفظ المنتج في Firebase...");
      const docRef = await addDoc(collection(db, "products"), productToSave);

      // 4. إضافة للحالة المحلية
      const newProduct = {
        id: docRef.id,
        ...productToSave,
      };

      setProducts((prev) => [...prev, newProduct]);

      console.log("✅ تم إضافة المنتج بنجاح:", docRef.id);
      return { success: true, productId: docRef.id };
    } catch (error) {
      console.error("❌ خطأ في إضافة المنتج:", error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // حذف منتج
  const deleteProduct = async (productId, imagePublicId) => {
    try {
      // حذف الصورة من Cloudinary إذا كانت موجودة
      if (imagePublicId) {
        // يمكن إضافة API route للحذف من Cloudinary لاحقاً
        console.log("تم تحديد صورة للحذف:", imagePublicId);
      }

      // حذف من Firestore
      await deleteDoc(doc(db, "products", productId));

      // حذف من الحالة المحلية
      setProducts((prev) => prev.filter((product) => product.id !== productId));

      console.log("✅ تم حذف المنتج بنجاح");
      return { success: true };
    } catch (error) {
      console.error("❌ خطأ في حذف المنتج:", error);
      return { success: false, error: error.message };
    }
  };

  return (
    <MyContext.Provider
      value={{
        products,
        setProducts,
        loading,
        addProduct,
        deleteProduct,
        fetchDummy,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

// Hook للاستخدام
export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
}
