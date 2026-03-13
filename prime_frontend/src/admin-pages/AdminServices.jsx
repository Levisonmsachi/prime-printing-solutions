/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiHome, FiLogOut, FiMenu, FiX, FiPlus, FiEdit2, 
  FiTrash2, FiSave, FiChevronLeft, FiAlertCircle, 
  FiCheckCircle, FiStar, FiTarget, FiAward,
  FiBriefcase, FiGlobe, FiCalendar, FiLink,
  FiEye, FiEyeOff, FiInfo, FiMail, FiImage,
  FiLayers, FiTool, FiList, FiGrid, FiHash
} from "react-icons/fi";
import {
  getServicesIntro,
  updateServicesIntro,
  getServiceCategories,
  createServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
  getServices,
  createService,
  updateService,
  deleteService,
  getServiceProcessSteps,
  createServiceProcessStep,
  updateServiceProcessStep,
  deleteServiceProcessStep,
  getServicesCTA,
  updateServicesCTA,
  adminLogout,
} from "../services/api";

function AdminServices() {
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
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [processSteps, setProcessSteps] = useState([]);
  const [ctaData, setCtaData] = useState(null);
  const [ctaForm, setCtaForm] = useState({});

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [modalType, setModalType] = useState("");

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
      const [introRes, categoriesRes, servicesRes, processRes, ctaRes] =
        await Promise.all([
          getServicesIntro(),
          getServiceCategories(),
          getServices(),
          getServiceProcessSteps(),
          getServicesCTA(),
        ]);

      if (introRes.length > 0) {
        const intro = introRes[0];
        setIntroData(intro);
        setIntroForm({
          title: intro.title || "",
          subtitle: intro.subtitle || "",
        });
      }

      setCategories(categoriesRes);
      setServices(servicesRes);
      setProcessSteps(processRes);

      if (ctaRes.length > 0) {
        const cta = ctaRes[0];
        setCtaData(cta);
        setCtaForm({
          message: cta.message || "",
          button_text: cta.button_text || "",
          button_link: cta.button_link || "",
        });
      }
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
      await updateServicesIntro(introData.id, introForm);
      setMessage({ type: "success", text: "Intro section saved successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save intro section" });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCTA = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateServicesCTA(ctaData.id, ctaForm);
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

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    setSaving(true);
    try {
      if (editingItem) {
        await updateServiceCategory(editingItem.id, data);
        setMessage({ type: "success", text: "Category updated successfully!" });
      } else {
        await createServiceCategory(data);
        setMessage({ type: "success", text: "Category created successfully!" });
      }
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      closeModal();
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save category" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteServiceCategory(id);
      setMessage({ type: "success", text: "Category deleted successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete category" });
    }
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    setSaving(true);
    try {
      if (editingItem) {
        await updateService(editingItem.id, data);
        setMessage({ type: "success", text: "Service updated successfully!" });
      } else {
        await createService(data);
        setMessage({ type: "success", text: "Service created successfully!" });
      }
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      closeModal();
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save service" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteService = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await deleteService(id);
      setMessage({ type: "success", text: "Service deleted successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete service" });
    }
  };

  const handleSaveProcessStep = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    setSaving(true);
    try {
      if (editingItem) {
        await updateServiceProcessStep(editingItem.id, data);
        setMessage({ type: "success", text: "Process step updated successfully!" });
      } else {
        await createServiceProcessStep(data);
        setMessage({ type: "success", text: "Process step created successfully!" });
      }
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      closeModal();
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save process step" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProcessStep = async (id) => {
    if (!confirm("Are you sure you want to delete this process step?")) return;
    try {
      await deleteServiceProcessStep(id);
      setMessage({ type: "success", text: "Process step deleted successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete process step" });
    }
  };

  const tabs = [
    { id: "intro", label: "Page Intro", icon: FiInfo },
    { id: "categories", label: "Categories", icon: FiGrid },
    { id: "services", label: "Services", icon: FiTool },
    { id: "process", label: "Process Steps", icon: FiList },
    { id: "cta", label: "Call to Action", icon: FiMail },
  ];

  const menuItems = [
    { to: "/admin", icon: FiHome, title: "Dashboard", desc: "Back to main dashboard", color: "text-blue-600", bgColor: "bg-blue-50" },
    { to: "/admin/homepage", icon: FiHome, title: "Homepage", desc: "Manage homepage", color: "text-indigo-600", bgColor: "bg-indigo-50" },
    { to: "/admin/about", icon: FiInfo, title: "About Page", desc: "Company info", color: "text-purple-600", bgColor: "bg-purple-50" },
    { to: "/admin/services", icon: FiTool, title: "Services", desc: "Current page", color: "text-green-600", bgColor: "bg-green-50" },
    { to: "/admin/portfolio", icon: FiAward, title: "Portfolio", desc: "Projects", color: "text-orange-600", bgColor: "bg-orange-50" },
    { to: "/admin/contact", icon: FiGlobe, title: "Contact", desc: "Messages", color: "text-red-600", bgColor: "bg-red-50" },
    { to: "/admin/certifications", icon: FiStar, title: "Certifications", desc: "Certificates", color: "text-yellow-600", bgColor: "bg-yellow-50" },
    { to: "/admin/quotes", icon: FiTarget, title: "Quotes", desc: "Requests", color: "text-pink-600", bgColor: "bg-pink-50" },
  ];

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
            <div className="w-24 h-24 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-green-600 rounded-full animate-pulse opacity-20"></div>
            </div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading services page data...</p>
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
            <div className="w-12 h-12 bg-linear-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center shadow-lg">
              <FiTool className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-linear-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Prime Print
              </h2>
              <p className="text-xs text-gray-500">Services Editor</p>
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
                    item.to === "/admin/services" ? "bg-green-50" : "hover:bg-gray-50"
                  }`}
                >
                  <div className={`p-2.5 ${item.to === "/admin/services" ? "bg-green-100" : item.bgColor} rounded-lg group-hover:scale-110 transition-transform shadow-sm`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <span className={`text-gray-700 font-medium ${item.to === "/admin/services" ? "text-green-700" : ""}`}>
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
                      className="flex items-center text-gray-500 hover:text-green-600"
                    >
                      <FiChevronLeft className="w-5 h-5" />
                      <span className="text-sm">Back to Dashboard</span>
                    </motion.div>
                  </Link>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <h1 className="text-xl font-bold bg-linear-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
                    Services Management
                  </h1>
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
                      ? "bg-white text-green-600 shadow-sm font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                >
                  <tab.icon className={`w-4 h-4 mr-2 ${
                    activeTab === tab.id ? "text-green-600" : "text-gray-400"
                  }`} />
                  {tab.label}
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
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <FiInfo className="w-4 h-4 text-green-600" />
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
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={saving}
                    className="flex items-center px-6 py-2 bg-linear-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 shadow-md"
                  >
                    <FiSave className="w-4 h-4 mr-2" />
                    {saving ? "Saving..." : "Save Intro Section"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Categories */}
          {activeTab === "categories" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <FiGrid className="w-4 h-4 text-green-600" />
                  </div>
                  Service Categories
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal("category")}
                  className="flex items-center px-4 py-2 bg-linear-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 shadow-md"
                >
                  <FiPlus className="w-4 h-4 mr-2" />
                  Add Category
                </motion.button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ y: -5 }}
                    className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800">{category.name}</h3>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                          {category.description}
                        </p>
                        <div className="flex items-center mt-2 space-x-2">
                          <span className="text-xs text-gray-400">
                            Order: {category.display_order || 0}
                          </span>
                          {category.is_active ? (
                            <span className="text-xs text-green-600 flex items-center">
                              <FiEye className="w-3 h-3 mr-1" /> Active
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400 flex items-center">
                              <FiEyeOff className="w-3 h-3 mr-1" /> Inactive
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openModal("category", category)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteCategory(category.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {categories.length === 0 && (
                <div className="text-center py-12">
                  <FiGrid className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No categories yet. Add one to get started.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Services */}
          {activeTab === "services" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <FiTool className="w-4 h-4 text-green-600" />
                  </div>
                  Services
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal("service")}
                  className="flex items-center px-4 py-2 bg-linear-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 shadow-md"
                >
                  <FiPlus className="w-4 h-4 mr-2" />
                  Add Service
                </motion.button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => {
                  const category = categories.find(c => c.id === service.category);
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ y: -5 }}
                      className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            {service.icon && (
                              <span className="text-xl mr-2">{service.icon}</span>
                            )}
                            <h3 className="font-bold text-lg text-gray-800">{service.name}</h3>
                          </div>
                          {category && (
                            <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full mb-2">
                              {category.name}
                            </span>
                          )}
                          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                            {service.short_description}
                          </p>
                          <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                            {service.pricing_info && (
                              <span className="text-gray-500">💰 {service.pricing_info}</span>
                            )}
                            {service.turnaround_time && (
                              <span className="text-gray-500">⏱️ {service.turnaround_time}</span>
                            )}
                          </div>
                          <div className="flex items-center mt-2 space-x-3">
                            <span className="text-xs text-gray-400">
                              Order: {service.display_order || 0}
                            </span>
                            {service.is_featured && (
                              <span className="text-xs text-yellow-600 flex items-center">
                                <FiStar className="w-3 h-3 mr-1 fill-current" /> Featured
                              </span>
                            )}
                            {service.is_active ? (
                              <span className="text-xs text-green-600 flex items-center">
                                <FiEye className="w-3 h-3 mr-1" /> Active
                              </span>
                            ) : (
                              <span className="text-xs text-gray-400 flex items-center">
                                <FiEyeOff className="w-3 h-3 mr-1" /> Inactive
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openModal("service", service)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteService(service.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {services.length === 0 && (
                <div className="text-center py-12">
                  <FiTool className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No services yet. Add one to get started.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Process Steps */}
          {activeTab === "process" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <FiList className="w-4 h-4 text-green-600" />
                  </div>
                  Process Steps
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal("processStep")}
                  className="flex items-center px-4 py-2 bg-linear-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 shadow-md"
                >
                  <FiPlus className="w-4 h-4 mr-2" />
                  Add Step
                </motion.button>
              </div>
              
              <div className="space-y-4">
                {processSteps.sort((a, b) => a.step_number - b.step_number).map((step) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ x: 5 }}
                    className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-lg font-bold text-green-600">
                            {step.step_number}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            {step.icon_class && (
                              <span className="text-xl mr-2">{step.icon_class}</span>
                            )}
                            <h3 className="font-bold text-lg text-gray-800">{step.title}</h3>
                          </div>
                          <p className="text-gray-600 mt-1">{step.description}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openModal("processStep", step)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteProcessStep(step.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {processSteps.length === 0 && (
                <div className="text-center py-12">
                  <FiList className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No process steps yet. Add one to get started.</p>
                </div>
              )}
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
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <FiMail className="w-4 h-4 text-green-600" />
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
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    className="flex items-center px-6 py-2 bg-linear-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 shadow-md"
                  >
                    <FiSave className="w-4 h-4 mr-2" />
                    {saving ? "Saving..." : "Save CTA Section"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>

      {/* Modal */}
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
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                    modalType === "category" ? "bg-green-100" :
                    modalType === "service" ? "bg-green-100" : "bg-green-100"
                  }`}>
                    {modalType === "category" && <FiGrid className="w-4 h-4 text-green-600" />}
                    {modalType === "service" && <FiTool className="w-4 h-4 text-green-600" />}
                    {modalType === "processStep" && <FiList className="w-4 h-4 text-green-600" />}
                  </div>
                  {editingItem ? "Edit" : "Add"}{" "}
                  {modalType === "category" ? "Category" :
                   modalType === "service" ? "Service" : "Process Step"}
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
                {modalType === "category" && (
                  <form onSubmit={handleSaveCategory}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name *
                        </label>
                        <input
                          name="name"
                          defaultValue={editingItem?.name || ""}
                          required
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          name="description"
                          defaultValue={editingItem?.description || ""}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="is_active"
                          id="is_active"
                          defaultChecked={editingItem?.is_active ?? true}
                          className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                        />
                        <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">
                          Active
                        </label>
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
                        className="px-4 py-2 bg-linear-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50"
                      >
                        {saving ? "Saving..." : editingItem ? "Update" : "Create"}
                      </motion.button>
                    </div>
                  </form>
                )}

                {modalType === "service" && (
                  <form onSubmit={handleSaveService}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Service Name *
                        </label>
                        <input
                          name="name"
                          defaultValue={editingItem?.name || ""}
                          required
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Short Description
                        </label>
                        <textarea
                          name="short_description"
                          defaultValue={editingItem?.short_description || ""}
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Description
                        </label>
                        <textarea
                          name="full_description"
                          defaultValue={editingItem?.full_description || ""}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Icon Class
                        </label>
                        <input
                          name="icon"
                          defaultValue={editingItem?.icon || ""}
                          placeholder="e.g., fas fa-print"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pricing Info
                        </label>
                        <input
                          name="pricing_info"
                          defaultValue={editingItem?.pricing_info || ""}
                          placeholder="e.g., Starting at $99"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Turnaround Time
                        </label>
                        <input
                          name="turnaround_time"
                          defaultValue={editingItem?.turnaround_time || ""}
                          placeholder="e.g., 2-3 business days"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <select
                          name="category"
                          defaultValue={editingItem?.category || ""}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select Category</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Display Order
                        </label>
                        <input
                          type="number"
                          name="display_order"
                          defaultValue={editingItem?.display_order || 0}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name="is_featured"
                            id="is_featured"
                            defaultChecked={editingItem?.is_featured ?? false}
                            className="w-4 h-4 text-yellow-600 rounded focus:ring-yellow-500"
                          />
                          <label htmlFor="is_featured" className="ml-2 text-sm text-gray-700">
                            Featured
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name="is_active"
                            id="is_active_service"
                            defaultChecked={editingItem?.is_active ?? true}
                            className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                          />
                          <label htmlFor="is_active_service" className="ml-2 text-sm text-gray-700">
                            Active
                          </label>
                        </div>
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
                        className="px-4 py-2 bg-linear-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50"
                      >
                        {saving ? "Saving..." : editingItem ? "Update" : "Create"}
                      </motion.button>
                    </div>
                  </form>
                )}

                {modalType === "processStep" && (
                  <form onSubmit={handleSaveProcessStep}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Step Number *
                        </label>
                        <input
                          type="number"
                          name="step_number"
                          defaultValue={editingItem?.step_number || 1}
                          required
                          min="1"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title *
                        </label>
                        <input
                          name="title"
                          defaultValue={editingItem?.title || ""}
                          required
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          name="description"
                          defaultValue={editingItem?.description || ""}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Icon Class
                        </label>
                        <input
                          name="icon_class"
                          defaultValue={editingItem?.icon_class || ""}
                          placeholder="e.g., fas fa-check"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                        className="px-4 py-2 bg-linear-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50"
                      >
                        {saving ? "Saving..." : editingItem ? "Update" : "Create"}
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminServices;