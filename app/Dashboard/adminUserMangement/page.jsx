// components/UserManagement.js
"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/api/authenticationApi";

export default function UserManagement() {
  const { getAllUsers, updateUserType, updateUserStatus, isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    if (!isAdmin) return;

    setLoading(true);
    try {
      const usersData = await getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("خطأ في جلب المستخدمين:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserTypeChange = async (uid, newType) => {
    try {
      await updateUserType(uid, newType);
      alert("تم تحديث نوع المستخدم بنجاح");
      fetchUsers(); // إعادة تحميل البيانات
    } catch (error) {
      alert("خطأ في تحديث نوع المستخدم: " + error.message);
    }
  };

  const handleStatusChange = async (uid, newStatus) => {
    try {
      await updateUserStatus(uid, newStatus);
      alert(`تم ${newStatus ? "تفعيل" : "إلغاء تفعيل"} المستخدم بنجاح`);
      fetchUsers(); // إعادة تحميل البيانات
    } catch (error) {
      alert("خطأ في تحديث حالة المستخدم: " + error.message);
    }
  };

  if (!isAdmin) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-bold text-red-600 mb-2">غير مسموح</h2>
        <p className="text-gray-600">هذه الصفحة مخصصة للإدمن فقط</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">جاري تحميل المستخدمين...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">إدارة المستخدمين</h1>
          <p className="text-gray-600 mt-1">
            إجمالي المستخدمين: {users.length}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  المستخدم
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  النوع
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  تاريخ التسجيل
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.uid} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {user.displayName?.charAt(0) ||
                            user.email?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="mr-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.displayName || "غير محدد"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={user.userType}
                      onChange={(e) =>
                        handleUserTypeChange(user.uid, e.target.value)
                      }
                      className="text-sm border border-gray-300 rounded-md px-2 py-1"
                    >
                      <option value="customer">عميل</option>
                      <option value="admin">إدمن</option>
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.isActive ? "نشط" : "معطل"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString("ar-EG")}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        handleStatusChange(user.uid, !user.isActive)
                      }
                      className={`text-sm px-3 py-1 rounded-md ${
                        user.isActive
                          ? "bg-red-100 text-red-600 hover:bg-red-200"
                          : "bg-green-100 text-green-600 hover:bg-green-200"
                      }`}
                    >
                      {user.isActive ? "تعطيل" : "تفعيل"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
