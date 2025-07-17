import React from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaUserCircle,
  FaClipboardList,
  FaBullhorn,
  FaUserShield,
  FaCalendarCheck,
  FaUsersCog,
  FaUsers,
  FaWarehouse,
  FaTags,
  FaHistory,
} from "react-icons/fa";
import { MdAnnouncement, MdAssignmentTurnedIn, MdPayment, MdVerified } from "react-icons/md";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-300  w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-yellow-100 border border-amber-600 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <NavLink className="text-lg text-yellow-500 font-extrabold" to="/">
              <FaHome></FaHome> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-lg text-yellow-500 font-extrabold"
              to="/dashboard/myProfile"
            >
              <FaUserCircle></FaUserCircle> My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-lg text-yellow-500 font-extrabold"
              to="/dashboard/pendingBookings"
            >
              <FaClipboardList></FaClipboardList> Pending Bookings
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-lg text-yellow-500 font-extrabold"
              to="/dashboard/announcements"
            >
              {" "}
              <FaBullhorn></FaBullhorn>Announcements
            </NavLink>
          </li>
          {/* admin routes */}
          <li>
          <NavLink   className="text-lg text-yellow-500 font-extrabold" to='/dashboard/makeAdmin'>
            <FaUserShield></FaUserShield> Make Admin
          </NavLink>
          </li>
          <li>
          <NavLink   className="text-lg text-yellow-500 font-extrabold" to='/dashboard/adminProfile'>
         <FaUserCircle></FaUserCircle>  Admin Profile
          </NavLink>
          </li>
          <li>
          <NavLink   className="text-lg text-yellow-500 font-extrabold" to='/dashboard/manageBookingApproval'>
         <FaCalendarCheck></FaCalendarCheck> Manage Booking Approval
          </NavLink>
          </li>
          <li>
          <NavLink   className="text-lg text-yellow-500 font-extrabold" to='/dashboard/manageMembers'>
           <FaUsersCog></FaUsersCog> Manage Members
          </NavLink>
          </li>
          <li>
          <NavLink   className="text-lg text-yellow-500 font-extrabold" to='/dashboard/allUsers'>
           <FaUsers></FaUsers> All Users
          </NavLink>
          </li>
          <li>
          <NavLink  className="text-lg text-yellow-500 font-extrabold" to='/dashboard/manageCourts'>
           <FaWarehouse></FaWarehouse> Manage Courts
          </NavLink>
          </li>
          <li>
          <NavLink  className="text-lg text-yellow-500 font-extrabold" to='/dashboard/manageBookings'>
          <FaCalendarCheck></FaCalendarCheck> Manage Bookings
          </NavLink>
          </li>
          <li>
          <NavLink  className="text-lg text-yellow-500 font-extrabold" to='/dashboard/manageCoupons'>
          <FaTags></FaTags> Manage Coupons
          </NavLink>
          </li>
          <li>
          <NavLink  className="text-lg text-yellow-500 font-extrabold" to='/dashboard/makeAnnouncement'>
          <FaBullhorn></FaBullhorn> Make Announcements
          </NavLink>
          </li>
        

             <li>
          <NavLink  className="text-lg text-yellow-500 font-extrabold" to='/dashboard/memberProfile'>
          <FaUserCircle></FaUserCircle> Member Profile
          </NavLink>
          </li>
             <li>
          <NavLink  className="text-lg text-yellow-500 font-extrabold" to='/dashboard/memberPendingBookings'>
          <FaCalendarCheck></FaCalendarCheck> Member Pending Bookings
          </NavLink>
          </li>
             <li>
          <NavLink  className="text-lg text-yellow-500 font-extrabold" to='/dashboard/approvedBookings'>
         <MdAssignmentTurnedIn></MdAssignmentTurnedIn> Member Approved Bookings
          </NavLink>
          </li>
             <li>
          <NavLink  className="text-lg text-yellow-500 font-extrabold" to='/dashboard/confirmedBookings'>
         <MdVerified></MdVerified> Confirmed Bookings
          </NavLink>
          </li>
             <li>
          <NavLink  className="text-lg text-yellow-500 font-extrabold" to='/dashboard/paymentPage'>
         <MdPayment></MdPayment> Payment Page
          </NavLink>
          </li>
             <li>
          <NavLink  className="text-lg text-yellow-500 font-extrabold" to='/dashboard/paymentHistory'>
         <FaHistory></FaHistory> Payment History
          </NavLink>
          </li>
             <li>
          <NavLink  className="text-lg text-yellow-500 font-extrabold" to='/dashboard/memberAnnouncements'>
         <MdAnnouncement></MdAnnouncement> Member Announcements
          </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
