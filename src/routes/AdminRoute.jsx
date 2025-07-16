import React, { use } from "react";




import { AuthContext } from "../contexts/AuthContext";
import UseUserRole from "../Hook/UseUserRole";
import Loader from "../Loader/Loader";

const AdminRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const { role, roleLoading } = UseUserRole();
  if (loading || roleLoading) {
    return <Loader></Loader>;
  }

  if (!user || role === "admin") {
    return children;
  }
  return children;
};

export default AdminRoute;
