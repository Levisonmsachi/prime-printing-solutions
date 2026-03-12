/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMail,
  FiMessageSquare,
  FiFileText,
  FiFolder,
  FiHome,
  FiInfo,
  FiTool,
  FiBriefcase,
  FiPhone,
  FiAward,
  FiLogOut,
  FiBell,
  FiTrendingUp,
  FiUsers,
  FiStar,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiMenu,
  FiX,
} from "react-icons/fi";
import {
  HiOutlineMail,
  HiOutlineChat,
  HiOutlineDocumentText,
  HiOutlinePhotograph,
  HiOutlineUserGroup,
} from "react-icons/hi";
import {
  getDashboardStats,
  getRecentMessages,
  adminLogout,
} from "../services/api";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    fetchData();
    setGreeting(getGreeting());
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const fetchData = async () => {
    try {
      const [statsData, messagesData] = await Promise.all([
        getDashboardStats(),
        getRecentMessages(),
      ]);
      setStats(statsData);
      setMessages(messagesData);
    } catch (err) {
      setError("Failed to load dashboard data");
      if (err.response?.status === 401) {
        navigate("/admin-login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    // Clear localStorage first to ensure logout happens
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");

    try {
      await adminLogout();
    } catch (err) {
      console.log("API logout failed, continuing with local logout");
    }

    // Navigate to login page
    navigate("/admin-login");
  };

  const statCards = [
    {
      title: "Total Messages",
      value: stats?.total_messages || 0,
      icon: FiMail,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Unread Messages",
      value: stats?.unread_messages || 0,
      icon: FiBell,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      borderColor: "border-orange-200",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Quote Requests",
      value: stats?.total_quotes || 0,
      icon: FiFileText,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Testimonials",
      value: stats?.total_testimonials || 0,
      icon: FiStar,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      borderColor: "border-yellow-200",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Portfolio Projects",
      value: stats?.total_projects || 0,
      icon: FiFolder,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Services",
      value: stats?.total_services || 0,
      icon: FiTool,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      borderColor: "border-indigo-200",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      title: "Team Members",
      value: stats?.total_team_members || 0,
      icon: FiUsers,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
      borderColor: "border-pink-200",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
    },
  ];

  const menuItems = [
    {
      to: "/admin/homepage",
      icon: FiHome,
      title: "Homepage",
      desc: "Hero, services, testimonials",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      to: "/admin/about",
      icon: FiInfo,
      title: "About Page",
      desc: "Company profile, team",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      to: "/admin/services",
      icon: FiTool,
      title: "Services",
      desc: "Manage services",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      to: "/admin/portfolio",
      icon: FiBriefcase,
      title: "Portfolio",
      desc: "Projects & categories",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      to: "/admin/contact",
      icon: FiPhone,
      title: "Contact",
      desc: "Messages & info",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      to: "/admin/certifications",
      icon: FiAward,
      title: "Certifications",
      desc: "Manage certifications",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      to: "/admin/quotes",
      icon: FiMessageSquare,
      title: "Quotes",
      desc: "Quote submissions",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
  ];

  const getMessageIcon = (type) => {
    if (type === "contact") return <HiOutlineMail className="text-blue-500" />;
    return <HiOutlineChat className="text-green-500" />;
  };

  const getMessageBg = (type) => {
    if (type === "contact") return "bg-blue-50";
    return "bg-green-50";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="relative">
            <div className="w-24 h-24 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full animate-pulse opacity-20"></div>
            </div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: "tween" }}
        className="fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-30 lg:hidden overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <FiX className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <div className={`p-2 ${item.bgColor} rounded-lg`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <span className="text-gray-700">{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Desktop Sidebar - Made more beautiful */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white shadow-xl">
        <div className="p-6">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="flex items-center space-x-3 mb-8"
          >
            <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
              <FiHome className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Prime Print
              </h2>
              <p className="text-xs text-gray-500">Admin Dashboard</p>
            </div>
          </motion.div>

          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <Link
                  to={item.to}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-all group"
                >
                  <div
                    className={`p-2.5 ${item.bgColor} rounded-lg group-hover:scale-110 transition-transform shadow-sm`}
                  >
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <span className="text-gray-700 font-medium">
                      {item.title}
                    </span>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header - Made more beautiful */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10 border-b border-gray-200"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiMenu className="w-6 h-6 text-gray-600" />
                </motion.button>
                <div>
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
                  >
                    {greeting}, Admin
                  </motion.h1>
                  <p className="text-sm text-gray-500">
                    Here's what's happening with your website today
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Logout</span>
              </motion.button>
            </div>
          </div>
        </motion.header>

        <div className="container mx-auto px-4 py-8">
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
            >
              <div className="flex items-center">
                <FiAlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700">{error}</span>
              </div>
            </motion.div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-4 mb-8">
            {statCards.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 30px -10px rgba(0,0,0,0.15)",
                }}
                className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className={`p-3 ${stat.iconBg} rounded-xl shadow-sm`}
                  >
                    <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </motion.div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.bgColor} ${stat.textColor}`}
                  >
                    Today
                  </span>
                </div>
                <h3 className="text-gray-500 text-xs mb-1">{stat.title}</h3>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold text-gray-800">
                    {stat.value}
                  </span>
                </div>
                <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    className={`h-full bg-linear-to-r ${stat.color} rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Links Grid - Made more beautiful */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={item.to}
                  className="block bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all border border-gray-100 group"
                >
                  <div className="flex items-start space-x-4">
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      className={`p-4 ${item.bgColor} rounded-xl group-hover:scale-110 transition-transform`}
                    >
                      <item.icon className={`w-7 h-7 ${item.color}`} />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Recent Messages - Made more beautiful */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <FiMessageSquare className="w-5 h-5 text-blue-500 mr-2" />
                  Recent Messages
                </h2>
                <Link
                  to="/admin/contact"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center bg-blue-50 px-3 py-1 rounded-full"
                >
                  View all <FiTrendingUp className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {messages.length === 0 ? (
                <div className="p-12 text-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <FiMail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  </motion.div>
                  <p className="text-gray-500">No messages yet</p>
                </div>
              ) : (
                messages.slice(0, 5).map((msg, index) => (
                  <motion.div
                    key={`${msg.message_type}-${msg.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                    whileHover={{ backgroundColor: "#f9fafb" }}
                    className="transition-colors cursor-pointer group"
                  >
                    <Link to="/admin/contact" className="block p-5">
                      <div className="flex items-start space-x-4">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`p-3 ${getMessageBg(msg.message_type)} rounded-xl shadow-sm`}
                        >
                          {getMessageIcon(msg.message_type)}
                        </motion.div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2 flex-wrap gap-2">
                              <span className="font-semibold text-gray-800">
                                {msg.name}
                              </span>
                              <span
                                className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                                  msg.message_type === "contact"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-green-100 text-green-700"
                                }`}
                              >
                                {msg.message_type === "contact"
                                  ? "Contact"
                                  : "Quote"}
                              </span>
                              {!msg.is_read && (
                                <motion.span
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ repeat: Infinity, duration: 2 }}
                                  className="px-2 py-0.5 text-xs bg-orange-100 text-orange-700 rounded-full font-medium"
                                >
                                  New
                                </motion.span>
                              )}
                            </div>
                            <div className="flex items-center text-sm text-gray-400">
                              <FiClock className="w-4 h-4 mr-1" />
                              {new Date(msg.created_at).toLocaleDateString(
                                undefined,
                                {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm truncate">
                            {msg.subject}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
