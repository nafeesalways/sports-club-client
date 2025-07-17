import React from "react";
import { Link } from "react-router";
import { FiAlertTriangle } from "react-icons/fi";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-center p-6">
      <div className="text-red-600">
        <FiAlertTriangle size={80} className="mx-auto mb-4" />
      </div>
      <h1 className="text-5xl font-bold text-error mb-2">403 Forbidden</h1>
      <p className="text-lg text-gray-600 mb-6">
        You do not have permission to access this page.
      </p>
      <Link to="/" className="btn bg-yellow-500 hover:bg-yellow-600">
        Go to Homepage
      </Link>
    </div>
  );
};

export default Forbidden;
