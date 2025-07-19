import React from "react";
import UseUserRole from "../../../hook/UseUserRole";
import Loader from "../../../Loader/Loader";
import UserDashboard from "./UserDashboard";
import MemberDashboard from "./MemberDashboard";
import AdminDashboard from "./AdminDashboard";
import Forbidden from "../Forbidden/Forbidden";

const DashboardHome = () => {
  const { role, roleLoading } = UseUserRole();

  if (roleLoading) {
    return <Loader></Loader>;
  }

  if (role === "user") {
    return <UserDashboard></UserDashboard>;
  } else if (role === "member") {
    return <MemberDashboard></MemberDashboard>;
  } else if (role === "admin") {
    return <AdminDashboard></AdminDashboard>;
  } else {
    return <Forbidden></Forbidden>;
  }
};

export default DashboardHome;
