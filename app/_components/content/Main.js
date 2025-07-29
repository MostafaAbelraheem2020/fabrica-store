"use client";
import React, { useState, useEffect, useContext } from "react";
import ProductsPage from "./productesList";
import HeroSection from "./HeroSection";
import { MyContext } from "@/app/api/productsApis";

function Main() {
  const { products, setProducts, loading, fetchProducts } =
    useContext(MyContext);

  const [productsList, setProductsList] = useState([]);
  useEffect(() => {
    if (products && products.length > 0) {
      setProductsList(products);
      localStorage.setItem("productsList", JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (!products || products.length === 0) {
      const productsList =
        JSON.parse(localStorage.getItem("productsList")) || [];
      setProductsList(productsList);
    }
    // تنفيذ دالة جلب المنتجات من Firebase
    fetchProducts();
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
