"use client";
import React, { useState, useEffect, useContext } from "react";
import ProductsPage from "./productesList";
import HeroSection from "./HeroSection";
import { MyContext } from "@/app/api/productsApis";

function Main() {
  const { products, setProducts, loading } = useContext(MyContext);

  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    // محاولة جلب المنتجات من localStorage
    const storedProducts = localStorage.getItem("productsList");
    setProductsList(storedProducts ? JSON.parse(storedProducts) : []);
  }, []);

  return (
    <>
      {/* <HeroSection /> */}
      <div className="container mx-auto p-4 ">
        <ProductsPage products={productsList} />
      </div>
    </>
  );
}

export default Main;
