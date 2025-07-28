// components/AuthForm.js
"use client";
import { useState } from "react";
import { useAuth } from "@/app/api/authenticationApi";

export default function AuthForm() {
  const { login, register, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
    confirmPassword: "",
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    if (!isLogin) {
      if (!formData.displayName) {
        alert("يرجى إدخال الاسم");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("كلمات المرور غير متطابقة");
        return;
      }
    }

    setSubmitLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(
          formData.email,
          formData.password,
          formData.displayName
        );
      }

      if (result.success) {
        alert(isLogin ? "تم تسجيل الدخول بنجاح" : "تم إنشاء الحساب بنجاح");
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert("حدث خطأ: " + error.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">جاري التحميل...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"} - متجر فابريكا
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Display Name - للتسجيل فقط */}
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium mb-1">
              الاسم الكامل
            </label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="أدخل اسمك الكامل"
              required={!isLogin}
            />
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="أدخل بريدك الإلكتروني"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">كلمة المرور</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="أدخل كلمة المرور"
            required
          />
        </div>

        {/* Confirm Password - للتسجيل فقط */}
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium mb-1">
              تأكيد كلمة المرور
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="أعد إدخال كلمة المرور"
              required={!isLogin}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={submitLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md font-medium transition-colors disabled:bg-gray-400"
        >
          {submitLoading
            ? "جاري المعالجة..."
            : isLogin
            ? "تسجيل الدخول"
            : "إنشاء حساب"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 hover:text-blue-600 text-sm"
        >
          {isLogin
            ? "ليس لديك حساب؟ إنشاء حساب جديد"
            : "لديك حساب بالفعل؟ تسجيل الدخول"}
        </button>
      </div>

      {/* Test Accounts */}
      <div className="mt-4 p-4 bg-gray-50 rounded-md">
        <p className="text-sm font-medium text-gray-700 mb-2">
          حسابات تجريبية:
        </p>
        <p className="text-xs text-gray-600">
          إدمن: admin@fabrica.com / 123456
        </p>
        <p className="text-xs text-gray-600">
          عميل: customer@fabrica.com / 123456
        </p>
      </div>
    </div>
  );
}
