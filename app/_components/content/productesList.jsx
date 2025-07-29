// pages/products.js
import React, { useContext } from "react";
import Product from "./productCard";
import ProductsGridSkeleton from "./productsListSkeleton";
import { MyContext } from "@/app/api/productsApis";
export default function ProductsPage({ products }) {
  const { loading } = useContext(MyContext);
  if (loading) {
    return <ProductsGridSkeleton count={8} />;
  }
  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">No Products Available</h1>
        <p>Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 ">
      <h1>Products</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products !== null ? (
          products.map((item) => {
            return (
              <li key={item.id}>
                <Product product={item} />
              </li>
            );
          })
        ) : (
          <li>
            <p>No products available</p>
          </li>
        )}
      </ul>
    </div>
  );
}
