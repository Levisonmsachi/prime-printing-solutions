/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiHome, FiLogOut, FiMenu, FiX, FiEye, FiTrash2,
  FiChevronLeft, FiAlertCircle, FiCheckCircle, 
  FiBriefcase, FiGlobe, FiMail, FiPhone, FiCalendar,
  FiDollarSign, FiClock, FiUser, FiInfo, FiDownload,
  FiMessageSquare, FiInbox, FiTarget
} from "react-icons/fi";
import {
  getQuoteRequests,
  deleteQuoteRequest,
  adminLogout,
} from "../services/api";

function AdminQuotes() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
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
      const quotesRes = await getQuoteRequests();
      setQuotes(quotesRes);
    } catch (err) {
      console.error("Failed to load data:", err);
      setMessage({ type: "error", text: "Failed to load data" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await adminLogout();
      navigate("/admin-login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleDeleteQuote = async (id) => {
    if (!confirm("Are you sure you want to delete this quote request?")) return;
    try {
      await deleteQuoteRequest(id);
      setMessage({ type: "success", text: "Quote request deleted successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      if (showDetailModal) setShowDetailModal(false);
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete quote request" });
    }
  };

  const viewQuote = (quote) => {
    setSelectedQuote(quote);
    setShowDetailModal(true);
  };

  const menuItems = [
    { to: "/admin", icon: FiHome, title: "Dashboard", desc: "Back to main dashboard", color: "text-blue-600", bgColor: "bg-blue-50" },
    { to: "/admin/homepage", icon: FiHome, title: "Homepage", desc: "Manage homepage", color: "text-indigo-600", bgColor: "bg-indigo-50" },
    { to: "/admin/about", icon: FiInfo, title: "About Page", desc: "Company info", color: "text-purple-600", bgColor: "bg-purple-50" },
    { to: "/admin/services", icon: FiBriefcase, title: "Services", desc: "Manage services", color: "text-green-600", bgColor: "bg-green-50" },
    { to: "/admin/portfolio", icon: FiTarget, title: "Portfolio", desc: "Projects", color: "text-orange-600", bgColor: "bg-orange-50" },
    { to: "/admin/contact", icon: FiGlobe, title: "Contact", desc: "Messages", color: "text-red-600", bgColor: "bg-red-50" },
    { to: "/admin/certifications", icon: FiInfo, title: "Certifications", desc: "Certificates", color: "text-yellow-600", bgColor: "bg-yellow-50" },
    { to: "/admin/quotes", icon: FiMessageSquare, title: "Quotes", desc: "Current page", color: "text-pink-600", bgColor: "bg-pink-50" },
  ];

  const getStatusBadge = (isProcessed) => {
    if (isProcessed) {
      return (
        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
          Processed
        </span>
      );
    }
    return (
      <span className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-700 font-medium animate-pulse">
        Pending
      </span>
    );
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
            <div className="w-24 h-24 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-pink-600 rounded-full animate-pulse opacity-20"></div>
            </div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading quote requests...</p>
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
            <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
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

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white shadow-xl">
        <div className="p-6">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="flex items-center space-x-3 mb-8"
          >
            <div className="w-12 h-12 bg-linear-to-br from-pink-600 to-pink-800 rounded-xl flex items-center justify-center shadow-lg">
              <FiMessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-linear-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
                Prime Print
              </h2>
              <p className="text-xs text-gray-500">Quotes Manager</p>
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
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all group ${
                    item.to === "/admin/quotes" ? "bg-pink-50" : "hover:bg-gray-50"
                  }`}
                >
                  <div className={`p-2.5 ${item.to === "/admin/quotes" ? "bg-pink-100" : item.bgColor} rounded-lg group-hover:scale-110 transition-transform shadow-sm`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <span className={`text-gray-700 font-medium ${item.to === "/admin/quotes" ? "text-pink-700" : ""}`}>
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
        {/* Header */}
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
                <div className="flex items-center space-x-3">
                  <Link to="/admin">
                    <motion.div
                      whileHover={{ x: -3 }}
                      className="flex items-center text-gray-500 hover:text-pink-600"
                    >
                      <FiChevronLeft className="w-5 h-5" />
                      <span className="text-sm">Back to Dashboard</span>
                    </motion.div>
                  </Link>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <h1 className="text-xl font-bold bg-linear-to-r from-pink-800 to-pink-600 bg-clip-text text-transparent">
                    Quote Requests
                  </h1>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Stats Badge */}
                <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-pink-50 rounded-lg">
                  <FiInbox className="w-4 h-4 text-pink-600" />
                  <span className="text-sm font-medium text-pink-700">
                    {quotes.filter(q => !q.is_processed).length} Pending
                  </span>
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
          </div>
        </motion.header>

        <div className="container mx-auto px-4 py-8">
          {/* Message Toast */}
          <AnimatePresence>
            {message.text && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mb-6 p-4 rounded-xl shadow-lg ${
                  message.type === "success"
                    ? "bg-green-50 border-l-4 border-green-500"
                    : "bg-red-50 border-l-4 border-red-500"
                }`}
              >
                <div className="flex items-center">
                  {message.type === "success" ? (
                    <FiCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <FiAlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  )}
                  <span className={message.type === "success" ? "text-green-700" : "text-red-700"}>
                    {message.text}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-5 border border-pink-100"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <FiMessageSquare className="w-5 h-5 text-pink-600" />
                </div>
                <span className="text-xs font-medium text-pink-600 bg-pink-50 px-2 py-1 rounded-full">
                  Total
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{quotes.length}</h3>
              <p className="text-sm text-gray-500">Total Quote Requests</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-5 border border-orange-100"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FiClock className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                  Pending
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{quotes.filter(q => !q.is_processed).length}</h3>
              <p className="text-sm text-gray-500">Awaiting Processing</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-md p-5 border border-green-100"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FiCheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  Processed
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{quotes.filter(q => q.is_processed).length}</h3>
              <p className="text-sm text-gray-500">Completed</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-md p-5 border border-blue-100"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FiDollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  This Month
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                {quotes.filter(q => new Date(q.created_at).getMonth() === new Date().getMonth()).length}
              </h3>
              <p className="text-sm text-gray-500">New This Month</p>
            </motion.div>
          </div>

          {/* Quotes Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                  <FiInbox className="w-4 h-4 text-pink-600" />
                </div>
                All Quote Requests
              </h2>
              
              {/* Filter/Search could go here */}
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-100 bg-gray-50">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Company</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Service Type</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Budget</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((quote, index) => (
                    <motion.tr
                      key={quote.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`border-b hover:bg-gray-50 transition-colors ${
                        !quote.is_processed ? "bg-orange-50/30" : ""
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-2">
                            <FiUser className="w-4 h-4 text-pink-600" />
                          </div>
                          <span className="font-medium">{quote.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{quote.company || "—"}</td>
                      <td className="py-3 px-4 text-sm">
                        <a href={`mailto:${quote.email}`} className="text-blue-600 hover:underline">
                          {quote.email}
                        </a>
                      </td>
                      <td className="py-3 px-4 text-sm">{quote.service_type || "—"}</td>
                      <td className="py-3 px-4 text-sm">{quote.budget_range || "—"}</td>
                      <td className="py-3 px-4">{getStatusBadge(quote.is_processed)}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {new Date(quote.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => viewQuote(quote)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="View Details"
                          >
                            <FiEye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteQuote(quote.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {quotes.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <FiInbox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No quote requests yet</p>
                <p className="text-gray-400 text-sm mt-1">When customers request quotes, they'll appear here</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Quote Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedQuote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowDetailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
                <h3 className="text-lg font-bold flex items-center">
                  <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                    <FiMessageSquare className="w-4 h-4 text-pink-600" />
                  </div>
                  Quote Request Details
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </motion.button>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  {/* Status Badge */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(selectedQuote.is_processed)}
                      <span className="text-sm text-gray-500">
                        Submitted on {new Date(selectedQuote.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                      <FiUser className="w-4 h-4 mr-2 text-pink-600" />
                      Personal Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500">Full Name</label>
                        <p className="font-medium text-gray-800">{selectedQuote.name}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500">Company</label>
                        <p className="text-gray-800">{selectedQuote.company || "Not provided"}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500">Email</label>
                        <a href={`mailto:${selectedQuote.email}`} className="text-blue-600 hover:underline">
                          {selectedQuote.email}
                        </a>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500">Phone</label>
                        <p className="text-gray-800">{selectedQuote.phone || "Not provided"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                      <FiBriefcase className="w-4 h-4 mr-2 text-pink-600" />
                      Project Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500">Service Type</label>
                        <p className="font-medium text-gray-800">{selectedQuote.service_type || "Not specified"}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500">Budget Range</label>
                        <p className="text-gray-800 flex items-center">
                          <FiDollarSign className="w-3 h-3 mr-1 text-green-600" />
                          {selectedQuote.budget_range || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500">Timeline</label>
                        <p className="text-gray-800 flex items-center">
                          <FiClock className="w-3 h-3 mr-1 text-blue-600" />
                          {selectedQuote.timeline || "Not specified"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-xs text-gray-500 mb-2">Project Description</label>
                      <div className="bg-white p-4 rounded-lg whitespace-pre-wrap text-gray-700 border border-gray-200">
                        {selectedQuote.project_description || "No description provided"}
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  {selectedQuote.additional_info && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Additional Information</h4>
                      <p className="text-gray-600">{selectedQuote.additional_info}</p>
                    </div>
                  )}

                  {/* Attachment */}
                  {selectedQuote.attachment_url && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                        <FiDownload className="w-4 h-4 mr-2 text-pink-600" />
                        Attachment
                      </h4>
                      <a
                        href={selectedQuote.attachment_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <FiDownload className="w-4 h-4 mr-2" />
                        Download Attachment
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      handleDeleteQuote(selectedQuote.id);
                    }}
                    className="px-4 py-2 bg-linear-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 shadow-md"
                  >
                    Delete Quote
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowDetailModal(false)}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminQuotes;