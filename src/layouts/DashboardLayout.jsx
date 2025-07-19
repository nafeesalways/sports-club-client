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
import {
  MdAnnouncement,
  MdAssignmentTurnedIn,
  MdPayment,
  MdVerified,
} from "react-icons/md";
import UseUserRole from "../hook/UseUserRole";

const DashboardLayout = () => {
  const { role, roleLoading } = UseUserRole();
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
        <ul className="menu bg-white/70 backdrop-blur-md shadow-lg rounded-r-2xl border border-amber-500 text-base-content min-h-full w-80 p-5 space-y-1">
          {/* Sidebar content here */}
          <li>
            <NavLink
              className="flex items-center gap-2 text-lg font-semibold text-yellow-600 hover:bg-yellow-100 rounded-lg px-3 py-2 transition"
              to="/"
            >
              <FaHome className="text-xl" />
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              className="flex items-center gap-2 text-lg font-semibold text-yellow-600 hover:bg-yellow-100 rounded-lg px-3 py-2 transition"
              to="/dashboard/myProfile"
            >
              <FaUserCircle className="text-xl" />
              My Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              className="flex items-center gap-2 text-lg font-semibold text-yellow-600 hover:bg-yellow-100 rounded-lg px-3 py-2 transition"
              to="/dashboard/pendingBookings"
            >
              <FaClipboardList className="text-xl" />
              Pending Bookings
            </NavLink>
          </li>

          <li>
            <NavLink
              className="flex items-center gap-2 text-lg font-semibold text-yellow-600 hover:bg-yellow-100 rounded-lg px-3 py-2 transition"
              to="/dashboard/announcements"
            >
              <FaBullhorn className="text-xl" />
              Announcements
            </NavLink>
          </li>

          {/* Admin routes */}
          {!roleLoading && role === "admin" && (
            <>
              <li className="mt-4 mb-2 text-sm font-bold text-amber-700 uppercase">
                Admin Dashboard
              </li>

              <li>
                <NavLink
                  className="flex items-center gap-2 text-lg font-semibold text-yellow-600 hover:bg-yellow-100 rounded-lg px-3 py-2 transition"
                  to="/dashboard/makeAdmin"
                >
                  <FaUserShield className="text-xl" />
                  Make Admin
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center gap-2 text-lg font-semibold text-yellow-600 hover:bg-yellow-100 rounded-lg px-3 py-2 transition"
                  to="/dashboard/adminProfile"
                >
                  <FaUserCircle className="text-xl" />
                  Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center gap-2 text-lg font-semibold text-yellow-600 hover:bg-yellow-100 rounded-lg px-3 py-2 transition"
                  to="/dashboard/manageBookingApproval"
                >
                  <FaCalendarCheck className="text-xl" />
                  Manage Booking Approval
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center gap-2 text-lg font-semibold text-yellow-600 hover:bg-yellow-100 rounded-lg px-3 py-2 transition"
                  to="/dashboard/manageMembers"
                >
                  <FaUsersCog className="text-xl" />
                  Manage Members
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center gap-2 text-lg font-semibold text-yellow-600 hover:bg-yellow-100 rounded-lg px-3 py-2 transition"
                  to="/dashboard/allUsers"
                >
                  <FaUsers className="text-xl" />
                  All Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center gap-2 text-lg font-semibold text-yellow-600 hover:bg-yellow-100 rounded-lg px-3 py-2 transition"
                  to="/dashboard/manageCourts"
                >
                  <FaWarehouse className="text-xl" />
                  Manage Courts
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center gap-2 text-lg font-semibold text-yellow-600 hover:bg-yellow-100 rounded-lg px-3 py-2 transition"
                  to="/dashboard/manageBookings"
                >
                  <FaCalendarCheck className="text-xl" />
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center gap-2 text-lg font-semibold text-yellow-600 hover:bg-yellow-100 rounded-lg px-3 py-2 transition"
                  to="/dashboard/manageCoupons"
                >
                  <FaTags className="text-xl" />
                  Manage Coupons
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center gap-2 text-lg font-semibold text-yellow-600 hover:bg-yellow-100 rounded-lg px-3 py-2 transition"
                  to="/dashboard/makeAnnouncement"
                >
                  <FaBullhorn className="text-xl" />
                  Make Announcements
                </NavLink>
              </li>
            </>
          )}

          {/* Member routes */}
          {!roleLoading && role === "member" && (
            <>
              <li className="mt-4 mb-2 text-sm font-bold text-amber-700 uppercase">
                Member Dashboard
              </li>

              <li>
                <NavLink
                  className="flex items-center gap-2 text-lg font-semibold text-yellow-600 hover:bg-yellow-100 rounded-lg px-3 py-2 transition"
                  to="/dashboard/memberProfile"
                >
                  <FaUserCircle className="text-xl" />
                  Member Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center gap-2 text-lg font-semibold text-yellow-600 hover:bg-yellow-100 rounded-lg px-3 py-2 transition"
                  to="/dashboard/memberPendingBookings"
                >
                  <FaCalendarCheck className="text-xl" />
                  Member Pending Bookings
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center gap-2 text-lg font-semibold text-yellow-600 hover:bg-yellow-100 rounded-lg px-3 py-2 transition"
                  to="/dashboard/approvedBookings"
                >
                  <MdAssignmentTurnedIn className="text-xl" />
                  Approved Bookings
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center gap-2 text-lg font-semibold text-yellow-600 hover:bg-yellow-100 rounded-lg px-3 py-2 transition"
                  to="/dashboard/confirmedBookings"
                >
                  <MdVerified className="text-xl" />
                  Confirmed Bookings
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center gap-2 text-lg font-semibold text-yellow-600 hover:bg-yellow-100 rounded-lg px-3 py-2 transition"
                  to="/dashboard/paymentHistory"
                >
                  <FaHistory className="text-xl" />
                  Payment History
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center gap-2 text-lg font-semibold text-yellow-600 hover:bg-yellow-100 rounded-lg px-3 py-2 transition"
                  to="/dashboard/memberAnnouncements"
                >
                  <MdAnnouncement className="text-xl" />
                  Member Announcements
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
