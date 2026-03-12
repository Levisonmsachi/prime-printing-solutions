import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiHome, FiLogOut, FiMenu, FiX, FiPlus, FiEdit2, 
  FiTrash2, FiSave, FiChevronLeft, FiAlertCircle, 
  FiCheckCircle, FiStar, FiTarget, FiAward,
  FiBriefcase, FiGlobe, FiCalendar, FiLink,
  FiEye, FiEyeOff, FiInfo, FiMail, FiImage,
  FiLayers, FiGrid, FiFolder, FiUsers,
  FiPhone, FiMapPin, FiClock, FiMessageSquare,
  FiInbox, FiSend, FiSettings, FiDownload
} from "react-icons/fi";
import {
  getContactPageIntro,
  updateContactPageIntro,
  getContactInfo,
  updateContactInfo,
  getOfficeLocations,
  createOfficeLocation,
  updateOfficeLocation,
  deleteOfficeLocation,
  getContactSettings,
  updateContactSettings,
  getContactCTA,
  updateContactCTA,
  getContactMessages,
  deleteContactMessage,
  markMessageAsRead,
  adminLogout,
} from "../services/api";

function AdminContact() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("intro");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [greeting, setGreeting] = useState("");

  // Data states
  const [introData, setIntroData] = useState(null);
  const [introForm, setIntroForm] = useState({});
  const [contactInfo, setContactInfo] = useState(null);
  const [contactInfoForm, setContactInfoForm] = useState({});
  const [locations, setLocations] = useState([]);
  const [settings, setSettings] = useState(null);
  const [settingsForm, setSettingsForm] = useState({});
  const [ctaData, setCtaData] = useState(null);
  const [ctaForm, setCtaForm] = useState({});
  const [messages, setMessages] = useState([]);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [modalType, setModalType] = useState("");

  // Message detail modal
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

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
      const [
        introRes,
        infoRes,
        locationsRes,
        settingsRes,
        ctaRes,
        messagesRes,
      ] = await Promise.all([
        getContactPageIntro(),
        getContactInfo(),
        getOfficeLocations(),
        getContactSettings(),
        getContactCTA(),
        getContactMessages(),
      ]);

      if (introRes.length > 0) {
        const intro = introRes[0];
        setIntroData(intro);
        setIntroForm({
          title: intro.title || "",
          subtitle: intro.subtitle || "",
        });
      }

      if (infoRes.length > 0) {
        const info = infoRes[0];
        setContactInfo(info);
        setContactInfoForm({
          email: info.email || "",
          phone: info.phone || "",
          address: info.address || "",
        });
      }

      setLocations(locationsRes);

      if (settingsRes.length > 0) {
        const setting = settingsRes[0];
        setSettings(setting);
        setSettingsForm({
          notification_email: setting.notification_email || "",
          auto_reply_subject: setting.auto_reply_subject || "",
          auto_reply_message: setting.auto_reply_message || "",
        });
      }

      if (ctaRes.length > 0) {
        const cta = ctaRes[0];
        setCtaData(cta);
        setCtaForm({
          message: cta.message || "",
          button_text: cta.button_text || "",
          button_link: cta.button_link || "",
        });
      }

      setMessages(messagesRes);
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

  const handleSaveIntro = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateContactPageIntro(introData.id, introForm);
      setMessage({ type: "success", text: "Intro section saved successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save intro section" });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveContactInfo = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateContactInfo(contactInfo.id, contactInfoForm);
      setMessage({ type: "success", text: "Contact info saved successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save contact info" });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateContactSettings(settings.id, settingsForm);
      setMessage({ type: "success", text: "Settings saved successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save settings" });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCTA = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateContactCTA(ctaData.id, ctaForm);
      setMessage({ type: "success", text: "CTA section saved successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save CTA section" });
    } finally {
      setSaving(false);
    }
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setModalType("");
  };

  const handleSaveLocation = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    setSaving(true);
    try {
      if (editingItem) {
        await updateOfficeLocation(editingItem.id, data);
        setMessage({ type: "success", text: "Location updated successfully!" });
      } else {
        await createOfficeLocation(data);
        setMessage({ type: "success", text: "Location created successfully!" });
      }
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      closeModal();
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save location" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLocation = async (id) => {
    if (!confirm("Are you sure you want to delete this location?")) return;
    try {
      await deleteOfficeLocation(id);
      setMessage({ type: "success", text: "Location deleted successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete location" });
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteContactMessage(id);
      setMessage({ type: "success", text: "Message deleted successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete message" });
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markMessageAsRead(id);
      setMessage({ type: "success", text: "Message marked as read!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to mark message as read" });
    }
  };

  const viewMessage = (msg) => {
    setSelectedMessage(msg);
    setShowMessageModal(true);
    if (!msg.is_read) {
      handleMarkAsRead(msg.id);
    }
  };

  const tabs = [
    { id: "intro", label: "Page Intro", icon: FiInfo },
    { id: "contact-info", label: "Contact Info", icon: FiPhone },
    { id: "locations", label: "Office Locations", icon: FiMapPin },
    { id: "settings", label: "Form Settings", icon: FiSettings },
    { id: "cta", label: "Call to Action", icon: FiMail },
    { id: "messages", label: "Messages", icon: FiInbox },
  ];

  const menuItems = [
    { to: "/admin", icon: FiHome, title: "Dashboard", desc: "Back to main dashboard", color: "text-blue-600", bgColor: "bg-blue-50" },
    { to: "/admin/homepage", icon: FiHome, title: "Homepage", desc: "Manage homepage", color: "text-indigo-600", bgColor: "bg-indigo-50" },
    { to: "/admin/about", icon: FiInfo, title: "About Page", desc: "Company info", color: "text-purple-600", bgColor: "bg-purple-50" },
    { to: "/admin/services", icon: FiBriefcase, title: "Services", desc: "Manage services", color: "text-green-600", bgColor: "bg-green-50" },
    { to: "/admin/portfolio", icon: FiAward, title: "Portfolio", desc: "Projects", color: "text-orange-600", bgColor: "bg-orange-50" },
    { to: "/admin/contact", icon: FiGlobe, title: "Contact", desc: "Current page", color: "text-red-600", bgColor: "bg-red-50" },
    { to: "/admin/certifications", icon: FiStar, title: "Certifications", desc: "Certificates", color: "text-yellow-600", bgColor: "bg-yellow-50" },
    { to: "/admin/quotes", icon: FiTarget, title: "Quotes", desc: "Requests", color: "text-pink-600", bgColor: "bg-pink-50" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="relative">
            <div className="w-24 h-24 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600 rounded-full animate-pulse opacity-20"></div>
            </div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading contact page data...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg">
              <FiGlobe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                Prime Print
              </h2>
              <p className="text-xs text-gray-500">Contact Editor</p>
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
                    item.to === "/admin/contact" ? "bg-red-50" : "hover:bg-gray-50"
                  }`}
                >
                  <div className={`p-2.5 ${item.to === "/admin/contact" ? "bg-red-100" : item.bgColor} rounded-lg group-hover:scale-110 transition-transform shadow-sm`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <span className={`text-gray-700 font-medium ${item.to === "/admin/contact" ? "text-red-700" : ""}`}>
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
                      className="flex items-center text-gray-500 hover:text-red-600"
                    >
                      <FiChevronLeft className="w-5 h-5" />
                      <span className="text-sm">Back to Dashboard</span>
                    </motion.div>
                  </Link>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-red-800 to-red-600 bg-clip-text text-transparent">
                    Contact Management
                  </h1>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Logout</span>
              </motion.button>
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

          {/* Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden"
          >
            <div className="flex overflow-x-auto p-1 bg-gray-50">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-lg whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? "bg-white text-red-600 shadow-sm font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                >
                  <tab.icon className={`w-4 h-4 mr-2 ${
                    activeTab === tab.id ? "text-red-600" : "text-gray-400"
                  }`} />
                  {tab.label}
                  {tab.id === "messages" && messages.filter((m) => !m.is_read).length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full"
                    >
                      {messages.filter((m) => !m.is_read).length}
                    </motion.span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Intro Section */}
          {activeTab === "intro" && introData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <FiInfo className="w-4 h-4 text-red-600" />
                </div>
                Page Intro Settings
              </h2>
              <form onSubmit={handleSaveIntro}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={introForm.title}
                      onChange={(e) =>
                        setIntroForm({ ...introForm, title: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={introForm.subtitle}
                      onChange={(e) =>
                        setIntroForm({ ...introForm, subtitle: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={saving}
                    className="flex items-center px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 shadow-md"
                  >
                    <FiSave className="w-4 h-4 mr-2" />
                    {saving ? "Saving..." : "Save Intro Section"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Contact Info */}
          {activeTab === "contact-info" && contactInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <FiPhone className="w-4 h-4 text-red-600" />
                </div>
                Contact Information
              </h2>
              <form onSubmit={handleSaveContactInfo}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={contactInfoForm.email}
                      onChange={(e) =>
                        setContactInfoForm({
                          ...contactInfoForm,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={contactInfoForm.phone}
                      onChange={(e) =>
                        setContactInfoForm({
                          ...contactInfoForm,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      value={contactInfoForm.address}
                      onChange={(e) =>
                        setContactInfoForm({
                          ...contactInfoForm,
                          address: e.target.value,
                        })
                      }
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={saving}
                    className="flex items-center px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 shadow-md"
                  >
                    <FiSave className="w-4 h-4 mr-2" />
                    {saving ? "Saving..." : "Save Contact Info"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Office Locations */}
          {activeTab === "locations" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <FiMapPin className="w-4 h-4 text-red-600" />
                  </div>
                  Office Locations
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal("location")}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 shadow-md"
                >
                  <FiPlus className="w-4 h-4 mr-2" />
                  Add Location
                </motion.button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {locations.map((location) => (
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ y: -5 }}
                    className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <FiMapPin className="w-4 h-4 text-red-500 mr-2" />
                          <h3 className="font-bold text-lg text-gray-800">{location.name}</h3>
                        </div>
                        <p className="text-gray-600 text-sm">{location.address}</p>
                        {location.phone && (
                          <p className="text-gray-500 text-sm mt-2 flex items-center">
                            <FiPhone className="w-3 h-3 mr-1" /> {location.phone}
                          </p>
                        )}
                        {location.email && (
                          <p className="text-gray-500 text-sm flex items-center">
                            <FiMail className="w-3 h-3 mr-1" /> {location.email}
                          </p>
                        )}
                        <div className="flex items-center mt-3">
                          <span className="text-xs text-gray-400">
                            Order: {location.display_order || 0}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openModal("location", location)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteLocation(location.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {locations.length === 0 && (
                <div className="text-center py-12">
                  <FiMapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No locations yet. Add one to get started.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Form Settings */}
          {activeTab === "settings" && settings && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <FiSettings className="w-4 h-4 text-red-600" />
                </div>
                Form Settings
              </h2>
              <form onSubmit={handleSaveSettings}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notification Email
                    </label>
                    <input
                      type="email"
                      value={settingsForm.notification_email}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          notification_email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Auto Reply Subject
                    </label>
                    <input
                      type="text"
                      value={settingsForm.auto_reply_subject}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          auto_reply_subject: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Auto Reply Message
                    </label>
                    <textarea
                      value={settingsForm.auto_reply_message}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          auto_reply_message: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={saving}
                    className="flex items-center px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 shadow-md"
                  >
                    <FiSave className="w-4 h-4 mr-2" />
                    {saving ? "Saving..." : "Save Settings"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}

          {/* CTA Section */}
          {activeTab === "cta" && ctaData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <FiMail className="w-4 h-4 text-red-600" />
                </div>
                Call to Action Settings
              </h2>
              <form onSubmit={handleSaveCTA}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      value={ctaForm.message}
                      onChange={(e) =>
                        setCtaForm({ ...ctaForm, message: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button Text
                      </label>
                      <input
                        type="text"
                        value={ctaForm.button_text}
                        onChange={(e) =>
                          setCtaForm({ ...ctaForm, button_text: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button Link
                      </label>
                      <input
                        type="text"
                        value={ctaForm.button_link}
                        onChange={(e) =>
                          setCtaForm({ ...ctaForm, button_link: e.target.value })
                        }
                        placeholder="https://example.com"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={saving}
                    className="flex items-center px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 shadow-md"
                  >
                    <FiSave className="w-4 h-4 mr-2" />
                    {saving ? "Saving..." : "Save CTA Section"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Messages */}
          {activeTab === "messages" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <FiInbox className="w-4 h-4 text-red-600" />
                </div>
                Contact Messages
                {messages.filter((m) => !m.is_read).length > 0 && (
                  <span className="ml-3 px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                    {messages.filter((m) => !m.is_read).length} unread
                  </span>
                )}
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Subject</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg, index) => (
                      <motion.tr
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`border-b hover:bg-gray-50 transition-colors ${
                          !msg.is_read ? "bg-orange-50" : ""
                        }`}
                      >
                        <td className="py-3 px-4 font-medium">{msg.name}</td>
                        <td className="py-3 px-4 text-sm">{msg.email}</td>
                        <td className="py-3 px-4 text-sm">{msg.subject}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              msg.message_type === "contact"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {msg.message_type === "contact" ? "Contact" : "Quote"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              msg.is_read
                                ? "bg-gray-100 text-gray-600"
                                : "bg-orange-100 text-orange-800 font-semibold"
                            }`}
                          >
                            {msg.is_read ? "Read" : "New"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-500">
                          {new Date(msg.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => viewMessage(msg)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="View Message"
                            >
                              <FiEye className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDeleteMessage(msg.id)}
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
              
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <FiInbox className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No messages yet.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Location Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
                <h3 className="text-lg font-bold flex items-center">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <FiMapPin className="w-4 h-4 text-red-600" />
                  </div>
                  {editingItem ? "Edit" : "Add"} Location
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </motion.button>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleSaveLocation}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                      </label>
                      <input
                        name="name"
                        defaultValue={editingItem?.name || ""}
                        required
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <textarea
                        name="address"
                        defaultValue={editingItem?.address || ""}
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        name="phone"
                        defaultValue={editingItem?.phone || ""}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        defaultValue={editingItem?.email || ""}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Display Order
                      </label>
                      <input
                        type="number"
                        name="display_order"
                        defaultValue={editingItem?.display_order || 0}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={saving}
                      className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50"
                    >
                      {saving ? "Saving..." : editingItem ? "Update" : "Create"}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Detail Modal */}
      <AnimatePresence>
        {showMessageModal && selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowMessageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
                <h3 className="text-lg font-bold flex items-center">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <FiMessageSquare className="w-4 h-4 text-red-600" />
                  </div>
                  Message Details
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowMessageModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </motion.button>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Name</label>
                      <p className="font-medium text-gray-800">{selectedMessage.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Date</label>
                      <p className="text-gray-800">
                        {new Date(selectedMessage.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-800">{selectedMessage.email}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Subject</label>
                    <p className="text-gray-800 font-medium">{selectedMessage.subject}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        selectedMessage.message_type === "contact"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {selectedMessage.message_type === "contact" ? "Contact" : "Quote"}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        selectedMessage.is_read
                          ? "bg-gray-100 text-gray-600"
                          : "bg-orange-100 text-orange-800 font-semibold"
                      }`}
                    >
                      {selectedMessage.is_read ? "Read" : "New"}
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Message</label>
                    <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-gray-700">
                      {selectedMessage.message}
                    </div>
                  </div>

                  {selectedMessage.attachment_url && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">Attachment</label>
                      <a
                        href={selectedMessage.attachment_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
                      >
                        <FiDownload className="w-4 h-4 mr-2" />
                        Download Attachment
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-2 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      handleDeleteMessage(selectedMessage.id);
                      setShowMessageModal(false);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800"
                  >
                    Delete
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowMessageModal(false)}
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

export default AdminContact;