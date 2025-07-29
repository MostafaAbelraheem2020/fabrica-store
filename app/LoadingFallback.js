import React from "react";

export default function LoadingFallback() {
  return (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto mb-4"></div>
      <p className="text-right">/Loading..</p>
    </div>
  );
}
