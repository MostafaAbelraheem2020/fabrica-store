"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import ProfileMenu from "./ProfileMenu";
import { useAuth } from "@/app/api/authenticationApi";
import { useRouter } from "next/navigation";
function Header() {
  const { isAdmin, isLoggedIn, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isWishlistHover, setIsWishlistHover] = useState(false);
  const [isCartHover, setIsCartHover] = useState(false);

  const closeTimeout = useRef(null);
  //
  const router = useRouter();
  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setIsOpen(true);
    setIsProfileOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsOpen(false);
      setIsProfileOpen(false);
    }, 300);
  };

  return (
    <header className="bg-white shadow-md relative">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className=" md:flex md:items-center md:gap-12 mr-10">
            <a className="block text-teal-600" href="#">
              <Image
                src="/logo.png"
                alt="Logo Fabrica"
                width={100}
                height={30}
                className="h-8 w-auto sm:h-12 lg:h-16 md:h-14 "
                priority
              />
            </a>
          </div>
          {/* navigation*/}
          <div className="md:flex flex-1 justify-between md:items-center md:gap-12">
            <nav
              aria-label="Global"
              className="hidden md:flex flex-1 justify-start md:justify-start md:gap-8"
            >
              <ul className="flex  justify-between  items-center gap-8 text-sm ">
                <li>
                  <a
                    className="text-gray-500 font-bold transition hover:text-gray-500/75 items-center"
                    href="#"
                  >
                    {" "}
                    Men{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 font-bold transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Women{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 font-bold transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Kids{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 font-bold transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Beauty tools{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 font-bold transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Genz{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 font-bold transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Home{" "}
                  </a>
                </li>
              </ul>
            </nav>

            <div className="hidden md:relative md:block">
              {isLoggedIn ? (
                <div
                  className="relative flex flex-col items-center"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* زر البروفايل */}
                  <div className="flex flex-col justify-center items-center px-2 relative cursor-pointer">
                    <button
                      type="button"
                      className="overflow-hidden relative flex items-center cursor-pointer"
                      tabIndex={-1}
                      style={{ pointerEvents: "none" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-gray-600 hover:text-gray-600/75"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                      </svg>
                    </button>
                    <h6 className="text-gray-600 font-bold text-sm cursor-pointer hover:text-gray-600/75">
                      Profile
                    </h6>
                    {isProfileOpen && (
                      <span
                        className="absolute left-0 right-0 mx-auto mt-14"
                        style={{
                          height: "3px ",
                          width: "100%",
                          backgroundColor: "steelblue",
                          transition: "width 0.5s ease-in-out",
                          transform: isProfileOpen ? "scaleX(1)" : "scaleX(0)",
                        }}
                      ></span>
                    )}
                  </div>
                  {/* القائمة المنسدلة */}
                  {isOpen && (
                    <ProfileMenu
                      isOpen={isOpen}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    />
                  )}
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center px-2 relative cursor-pointer">
                  <button
                    type="button"
                    className="overflow-hidden relative flex items-center cursor-pointer"
                    tabIndex={-1}
                    onClick={() => router.push("/login")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <h6 className="text-gray-600 font-bold text-sm cursor-pointer hover:text-gray-600/75">
                    Login
                  </h6>
                </div>
              )}
            </div>
          </div>
          {/*washlist icons */}
          <div className="hidden md:relative md:block">
            <div
              className="flex flex-col justify-center items-center px-2 relative cursor-pointer"
              onMouseEnter={() => setIsWishlistHover(true)}
              onMouseLeave={() => setIsWishlistHover(false)}
            >
              <button
                type="button"
                className="overflow-hidden relative flex items-center cursor-pointer"
                tabIndex={-1}
                style={{ pointerEvents: "none" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={isWishlistHover ? "steelblue" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke={isWishlistHover ? "steelblue" : "currentColor"}
                  style={{ transition: "fill 0.3s, stroke 0.3s" }}
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </button>
              <h6
                style={{ transition: "fill 0.3s, stroke 0.3s" }}
                className="text-gray-600 font-bold text-sm cursor-pointer hover:text-gray-600/75"
              >
                Wishlist
              </h6>
            </div>
          </div>
          {/* Cart icon */}
          <div className="hidden md:relative md:block">
            <div
              className="flex flex-col justify-center items-center px-2 relative cursor-pointer"
              onMouseEnter={() => setIsCartHover(true)}
              onMouseLeave={() => setIsCartHover(false)}
            >
              <button
                type="button"
                className="overflow-hidden relative flex items-center cursor-pointer"
                tabIndex={-1}
                style={{ pointerEvents: "none" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={isCartHover ? "steelblue" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke={isCartHover ? "steelblue" : "currentColor"}
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </button>
              <h6
                style={{ transition: "fill 0.3s, stroke 0.3s" }}
                className="text-gray-600 font-bold text-sm cursor-pointer hover:text-gray-600/75"
              >
                Bag
              </h6>
            </div>
          </div>
          {/* Hamburger menu للشاشات الصغيرة والموبايل */}
          <div className="flex justify-self-end md:hidden relative">
            <button className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
