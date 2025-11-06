import React, { useState } from "react";
import { NavLink, Outlet, Link } from "react-router";
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
  FaChartBar,
} from "react-icons/fa";
import {
  MdAnnouncement,
  MdAssignmentTurnedIn,
  MdPayment,
  MdVerified,
  MdMenu,
  MdClose,
} from "react-icons/md";
import UseUserRole from "../hook/UseUserRole";

const DashboardLayout = () => {
  const { role, roleLoading } = UseUserRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-base transition-all duration-200 ${
      isActive
        ? "bg-yellow-400 text-gray-900 shadow-lg"
        : "text-gray-300 hover:bg-gray-800 hover:text-yellow-400"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-gray-900/95 backdrop-blur-md border-b border-yellow-400/20">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-800 text-yellow-400 transition-colors"
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? (
                <MdClose className="h-6 w-6" />
              ) : (
                <MdMenu className="h-6 w-6" />
              )}
            </button>
            <Link to="/" className="flex items-center gap-2">
              <img
                className="w-8 h-8"
                src="https://cdn-icons-png.flaticon.com/128/1599/1599287.png"
                alt="Champion"
              />
              <span className="font-black text-yellow-400 text-xl italic">
                CHAMPION
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-300">
              Dashboard
            </span>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-30 w-72 bg-gradient-to-b from-gray-900 to-black border-r border-yellow-400/20 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } overflow-y-auto`}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-yellow-400/20">
              <Link
                to="/"
                className="flex items-center gap-3 group"
                onClick={closeSidebar}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-400 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <img
                    className="relative w-10 h-10"
                    src="https://cdn-icons-png.flaticon.com/128/1599/1599287.png"
                    alt="Champion"
                  />
                </div>
                <div>
                  <span className="font-black text-yellow-400 text-2xl italic block">
                    CHAMPION
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    Sports Management
                  </span>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {/* Common Links */}
              <div className="space-y-1">
                <p className="px-4 py-2 text-xs font-bold text-yellow-400 uppercase tracking-wider">
                  Main Menu
                </p>
                <NavLink
                  to="/"
                  className={navLinkClass}
                  onClick={closeSidebar}
                >
                  <FaHome className="text-lg" />
                  Home
                </NavLink>

                <NavLink
                  to="/dashboard/myProfile"
                  className={navLinkClass}
                  onClick={closeSidebar}
                >
                  <FaUserCircle className="text-lg" />
                  My Profile
                </NavLink>

                <NavLink
                  to="/dashboard/pendingBookings"
                  className={navLinkClass}
                  onClick={closeSidebar}
                >
                  <FaClipboardList className="text-lg" />
                  Pending Bookings
                </NavLink>

                <NavLink
                  to="/dashboard/announcements"
                  className={navLinkClass}
                  onClick={closeSidebar}
                >
                  <FaBullhorn className="text-lg" />
                  Announcements
                </NavLink>
              </div>

              {/* Admin Routes */}
              {!roleLoading && role === "admin" && (
                <div className="mt-6 space-y-1">
                  <div className="flex items-center gap-2 px-4 py-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
                    <p className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
                      Admin Control
                    </p>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
                  </div>

                  <NavLink
                    to="/dashboard/makeAdmin"
                    className={navLinkClass}
                    onClick={closeSidebar}
                  >
                    <FaUserShield className="text-lg" />
                    Make Admin
                  </NavLink>

                  <NavLink
                    to="/dashboard/adminProfile"
                    className={navLinkClass}
                    onClick={closeSidebar}
                  >
                    <FaUserCircle className="text-lg" />
                    Admin Profile
                  </NavLink>

                  <NavLink
                    to="/dashboard/manageBookingApproval"
                    className={navLinkClass}
                    onClick={closeSidebar}
                  >
                    <FaCalendarCheck className="text-lg" />
                    Booking Approval
                  </NavLink>

                  <NavLink
                    to="/dashboard/manageMembers"
                    className={navLinkClass}
                    onClick={closeSidebar}
                  >
                    <FaUsersCog className="text-lg" />
                    Manage Members
                  </NavLink>

                  <NavLink
                    to="/dashboard/allUsers"
                    className={navLinkClass}
                    onClick={closeSidebar}
                  >
                    <FaUsers className="text-lg" />
                    All Users
                  </NavLink>

                  <NavLink
                    to="/dashboard/manageCourts"
                    className={navLinkClass}
                    onClick={closeSidebar}
                  >
                    <FaWarehouse className="text-lg" />
                    Manage Courts
                  </NavLink>

                  <NavLink
                    to="/dashboard/manageBookings"
                    className={navLinkClass}
                    onClick={closeSidebar}
                  >
                    <FaCalendarCheck className="text-lg" />
                    Manage Bookings
                  </NavLink>

                  <NavLink
                    to="/dashboard/manageCoupons"
                    className={navLinkClass}
                    onClick={closeSidebar}
                  >
                    <FaTags className="text-lg" />
                    Manage Coupons
                  </NavLink>

                  <NavLink
                    to="/dashboard/makeAnnouncement"
                    className={navLinkClass}
                    onClick={closeSidebar}
                  >
                    <FaBullhorn className="text-lg" />
                    Make Announcement
                  </NavLink>
                </div>
              )}

              {/* Member Routes */}
              {!roleLoading && role === "member" && (
                <div className="mt-6 space-y-1">
                  <div className="flex items-center gap-2 px-4 py-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
                    <p className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
                      Member Area
                    </p>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
                  </div>

                  <NavLink
                    to="/dashboard/memberProfile"
                    className={navLinkClass}
                    onClick={closeSidebar}
                  >
                    <FaUserCircle className="text-lg" />
                    Member Profile
                  </NavLink>

                  <NavLink
                    to="/dashboard/memberPendingBookings"
                    className={navLinkClass}
                    onClick={closeSidebar}
                  >
                    <FaCalendarCheck className="text-lg" />
                    Pending Bookings
                  </NavLink>

                  <NavLink
                    to="/dashboard/approvedBookings"
                    className={navLinkClass}
                    onClick={closeSidebar}
                  >
                    <MdAssignmentTurnedIn className="text-lg" />
                    Approved Bookings
                  </NavLink>

                  <NavLink
                    to="/dashboard/confirmedBookings"
                    className={navLinkClass}
                    onClick={closeSidebar}
                  >
                    <MdVerified className="text-lg" />
                    Confirmed Bookings
                  </NavLink>

                  <NavLink
                    to="/dashboard/paymentHistory"
                    className={navLinkClass}
                    onClick={closeSidebar}
                  >
                    <FaHistory className="text-lg" />
                    Payment History
                  </NavLink>

                  <NavLink
                    to="/dashboard/memberAnnouncements"
                    className={navLinkClass}
                    onClick={closeSidebar}
                  >
                    <MdAnnouncement className="text-lg" />
                    Announcements
                  </NavLink>
                </div>
              )}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-yellow-400/20">
              <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-300">
                    {roleLoading ? "Loading..." : role === "admin" ? "Admin" : role === "member" ? "Member" : "User"}
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Dashboard 
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
            onClick={closeSidebar}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
