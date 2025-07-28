// components/admin/Dashboard.js
"use client";
import { useContext } from "react";
import { MyContext } from "../api/productsApis";
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const { products, loading } = useContext(MyContext);
  const router = useRouter();
  // إحصائيات تجريبية
  const stats = [
    {
      title: "إجمالي المنتجات",
      value: products?.length || 0,
      change: "+12%",
      trend: "up",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
          />
        </svg>
      ),
      color: "bg-blue-500",
    },
    {
      title: "الطلبات اليوم",
      value: 127,
      change: "+8%",
      trend: "up",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      color: "bg-green-500",
    },
    {
      title: "إجمالي العملاء",
      value: 1243,
      change: "+15%",
      trend: "up",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
      color: "bg-purple-500",
    },
    {
      title: "المبيعات الشهر",
      value: "45,280 ج.م",
      change: "+23%",
      trend: "up",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
        </svg>
      ),
      color: "bg-yellow-500",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "طلب جديد من أحمد محمد",
      time: "منذ 5 دقائق",
      type: "order",
    },
    {
      id: 2,
      action: 'تم إضافة منتج جديد "فستان صيفي"',
      time: "منذ 15 دقيقة",
      type: "product",
    },
    {
      id: 3,
      action: "عميل جديد سجل في النظام",
      time: "منذ 30 دقيقة",
      type: "customer",
    },
    { id: 4, action: "تم شحن الطلب #1234", time: "منذ ساعة", type: "shipping" },
    {
      id: 5,
      action: 'تحديث معلومات المنتج "قميص أبيض"',
      time: "منذ ساعتين",
      type: "product",
    },
  ];

  const topProducts = products?.slice(0, 5) || [];

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
          ))}
        </div>
        <div className="bg-gray-200 h-64 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          مرحباً بك في لوحة إدارة فابريكا! 👋
        </h1>
        <p className="text-blue-100">إليك نظرة سريعة على أداء متجرك اليوم</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-sm font-medium ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 mr-1">
                    من الشهر الماضي
                  </span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-full text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            الأنشطة الأخيرة
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div
                  className={`w-3 h-3 rounded-full mr-3 ${
                    activity.type === "order"
                      ? "bg-green-500"
                      : activity.type === "product"
                      ? "bg-blue-500"
                      : activity.type === "customer"
                      ? "bg-purple-500"
                      : "bg-yellow-500"
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">أهم المنتجات</h2>
          <div className="space-y-4">
            {topProducts.length > 0 ? (
              topProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-200 rounded-md mr-3 flex items-center justify-center">
                    {product.image?.url ? (
                      <img
                        src={product.image.url}
                        alt={product.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <span className="text-xs text-gray-500">
                        #{index + 1}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {product.title}
                    </p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-green-600">
                      {product.price} ج.م
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                لا توجد منتجات حالياً
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">إجراءات سريعة</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            className="flex flex-col items-center p-4 bg-blue-50
           hover:bg-blue-100 rounded-lg transition-colors"
            onClick={() => router.push("/Dashboard/AddProductForm")}
          >
            <svg
              className="w-8 h-8 text-blue-600 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="text-sm font-medium text-blue-800">
              إضافة منتج
            </span>
          </button>

          <button className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <svg
              className="w-8 h-8 text-green-600 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-sm font-medium text-green-800">
              عرض الطلبات
            </span>
          </button>

          <button className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <svg
              className="w-8 h-8 text-purple-600 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-sm font-medium text-purple-800">
              إدارة العملاء
            </span>
          </button>

          <button className="flex flex-col items-center p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
            <svg
              className="w-8 h-8 text-yellow-600 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span className="text-sm font-medium text-yellow-800">
              التقارير
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
