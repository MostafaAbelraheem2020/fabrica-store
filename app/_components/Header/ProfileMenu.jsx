import React, { useState } from "react";
import { useAuth } from "@/app/api/authenticationApi";
import { useRouter } from "next/navigation";
function ProfileMenu({ isOpen }) {
  const [isopen, setIsopen] = useState(isOpen);
  const { isAdmin, logout } = useAuth();
  const router = useRouter();
  return (
    <div
      className="w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg absolute  left--2 top-full mt-2 z-20 transition-all duration-700 ease-in-out opacity-100 scale-100"
      style={{
        transition: "opacity 0.7s, transform 0.7s",
        opacity: isopen ? 1 : 0,
        transform: isopen ? "scale(1)" : "scale(0.95)",
      }}
    >
      <div className="p-2">
        <a
          href="#"
          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          role="menuitem"
        >
          My profile
        </a>
        {isAdmin && (
          <a
            className="block cursor-pointer rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
            onClick={() => {
              router.push("/Dashboard");
              setIsopen(false);
              console.log(isopen);
            }}
          >
            Admin Dashboard
          </a>
        )}
        <a
          href="#"
          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          role="menuitem"
        >
          Billing summary
        </a>
        <a
          href="#"
          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          role="menuitem"
        >
          Team settings
        </a>
      </div>
      <div className="p-2">
        <form method="POST" action="#">
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
            role="menuitem"
            onClick={() => {
              logout();
              setIsopen(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileMenu;
