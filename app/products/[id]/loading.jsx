import ProductSkeleton from "@/app/_components/content/productsCardSkeleton";
import React from "react";

export default function loading() {
  return (
    <div className="container mx-auto p-4">
      <ProductSkeleton />
    </div>
  );
}
