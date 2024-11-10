import { Loader } from "lucide-react";
import React from "react";

const Load = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-bg-lightGreen to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <Loader className="animate-spin w-16 h-16 text-white" />
    </div>
  );
};

export default Load;
