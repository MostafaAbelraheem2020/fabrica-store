// context/AuthContext.js
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../_utilties/firebaseConfig";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        // جلب بيانات المستخدم من Firestore
        await fetchUserData(user.uid);
      } else {
        setUserData(null);
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // جلب بيانات المستخدم من Firestore
  const fetchUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));

      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData(data);
        setIsAdmin(data.userType === "admin");
        console.log(`المستخدم: ${data.email}, النوع: ${data.userType}`);
      } else {
        // إنشاء مستخدم جديد بنوع عميل افتراضياً
        const newUserData = {
          uid: uid,
          email: auth.currentUser?.email || "",
          displayName: auth.currentUser?.displayName || "",
          userType: "customer",
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await setDoc(doc(db, "users", uid), newUserData);
        setUserData(newUserData);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("خطأ في جلب بيانات المستخدم:", error);
    }
  };

  // تسجيل دخول
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
      return { success: true, user: result.user };
    } catch (error) {
      let errorMessage = "خطأ في تسجيل الدخول";

      if (error.code === "auth/user-not-found") {
        errorMessage = "البريد الإلكتروني غير مسجل";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "كلمة مرور خاطئة";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "البريد الإلكتروني غير صحيح";
      }

      return { success: false, error: errorMessage };
    }
  };

  // إنشاء حساب جديد
  const register = async (
    email,
    password,
    displayName,
    userType = "customer"
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // حفظ بيانات المستخدم في Firestore
      const newUserData = {
        uid: result.user.uid,
        email: email,
        displayName: displayName,
        userType: userType,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "users", result.user.uid), newUserData);

      router.push("/login");
      return { success: true, user: result.user };
    } catch (error) {
      let errorMessage = "خطأ في إنشاء الحساب";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "البريد الإلكتروني مستخدم بالفعل";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "كلمة المرور ضعيفة";
      }

      return { success: false, error: errorMessage };
    }
  };

  // تسجيل خروج
  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // جلب جميع المستخدمين (للأدمن فقط)
  const getAllUsers = async () => {
    if (!isAdmin) return [];

    try {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const users = [];

      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });

      return users;
    } catch (error) {
      console.error("خطأ في جلب المستخدمين:", error);
      return [];
    }
  };

  // تحديث نوع المستخدم (للأدمن فقط)
  const updateUserType = async (uid, newUserType) => {
    if (!isAdmin) {
      throw new Error("ليس لديك صلاحية لتحديث المستخدمين");
    }

    try {
      const userRef = doc(db, "users", uid);
      await setDoc(
        userRef,
        {
          userType: newUserType,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      return { success: true };
    } catch (error) {
      console.error("خطأ في تحديث نوع المستخدم:", error);
      throw error;
    }
  };

  // تحديث حالة المستخدم (تفعيل/إلغاء تفعيل)
  const updateUserStatus = async (uid, isActive) => {
    if (!isAdmin) {
      throw new Error("ليس لديك صلاحية لتحديث المستخدمين");
    }

    try {
      const userRef = doc(db, "users", uid);
      await setDoc(
        userRef,
        {
          isActive: isActive,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      return { success: true };
    } catch (error) {
      console.error("خطأ في تحديث حالة المستخدم:", error);
      throw error;
    }
  };

  const value = {
    currentUser,
    userData,
    isAdmin,
    loading,
    login,
    register,
    logout,
    getAllUsers,
    updateUserType,
    updateUserStatus,
    isLoggedIn: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth يجب استخدامه داخل AuthProvider");
  }
  return context;
}
