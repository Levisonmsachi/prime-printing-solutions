/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiHome,
  FiLogOut,
  FiMenu,
  FiX,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSave,
  FiImage,
  FiStar,
  FiBriefcase,
  FiTool,
  FiMessageSquare,
  FiChevronLeft,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import {
  HiOutlinePhotograph,
  HiOutlineUserGroup,
  HiOutlineChat,
  HiOutlineDocumentText,
} from "react-icons/hi";
import {
  getHeroSection,
  updateHeroSection,
  getIntroSection,
  updateIntroSection,
  getServiceHighlights,
  createServiceHighlight,
  updateServiceHighlight,
  deleteServiceHighlight,
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getFeaturedProjects,
  createFeaturedProject,
  updateFeaturedProject,
  deleteFeaturedProject,
  getHomepageCTA,
  updateHomepageCTA,
  adminLogout,
} from "../services/api";

function AdminHomepage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [greeting, setGreeting] = useState("");

  // Data states
  const [heroData, setHeroData] = useState(null);
  const [introData, setIntroData] = useState(null);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [ctaData, setCtaData] = useState(null);

  // Form states
  const [heroForm, setHeroForm] = useState({});
  const [introForm, setIntroForm] = useState({});
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
      const [
        heroRes,
        introRes,
        servicesRes,
        testimonialsRes,
        projectsRes,
        ctaRes,
      ] = await Promise.all([
        getHeroSection(),
        getIntroSection(),
        getServiceHighlights(),
        getTestimonials(),
        getFeaturedProjects(),
        getHomepageCTA(),
      ]);

      if (heroRes.length > 0) {
        const hero = heroRes[0];
        setHeroData(hero);
        setHeroForm({
          title: hero.title || "",
          subtitle: hero.subtitle || "",
          message_1: hero.message_1 || "",
          message_2: hero.message_2 || "",
          message_3: hero.message_3 || "",
        });
      }

      if (introRes.length > 0) {
        const intro = introRes[0];
        setIntroData(intro);
        setIntroForm({
          title: intro.content || "",
          subtitle: "",
          description: intro.content || "",
          clients_satisfied: intro.clients_satisfied || "",
          years_experience: intro.years_experience || "",
          projects_completed: intro.delivered_projects || "",
        });
      }

      setServices(servicesRes);
      setTestimonials(testimonialsRes);
      setFeaturedProjects(projectsRes);

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

  const handleSaveHero = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateHeroSection(heroData.id, heroForm);
      setMessage({ type: "success", text: "Hero section saved successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save hero section" });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveIntro = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateIntroSection(introData.id, introForm);
      setMessage({
        type: "success",
        text: "Intro section saved successfully!",
      });
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
      await updateHomepageCTA(ctaData.id, ctaForm);
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

  const handleSaveService = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    setSaving(true);
    try {
      if (editingItem) {
        await updateServiceHighlight(editingItem.id, data);
        setMessage({ type: "success", text: "Service updated successfully!" });
      } else {
        await createServiceHighlight(data);
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
      await deleteServiceHighlight(id);
      setMessage({ type: "success", text: "Service deleted successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete service" });
    }
  };

  const handleSaveTestimonial = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    setSaving(true);
    try {
      if (editingItem) {
        await updateTestimonial(editingItem.id, data);
        setMessage({
          type: "success",
          text: "Testimonial updated successfully!",
        });
      } else {
        await createTestimonial(data);
        setMessage({
          type: "success",
          text: "Testimonial created successfully!",
        });
      }
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      closeModal();
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save testimonial" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      setMessage({
        type: "success",
        text: "Testimonial deleted successfully!",
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete testimonial" });
    }
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    setSaving(true);
    try {
      if (editingItem) {
        await updateFeaturedProject(editingItem.id, data);
        setMessage({ type: "success", text: "Project updated successfully!" });
      } else {
        await createFeaturedProject(data);
        setMessage({ type: "success", text: "Project created successfully!" });
      }
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      closeModal();
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save project" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteFeaturedProject(id);
      setMessage({ type: "success", text: "Project deleted successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete project" });
    }
  };

  const tabs = [
    { id: "hero", label: "Hero Section", icon: FiHome },
    { id: "intro", label: "Intro Section", icon: FiMessageSquare },
    { id: "services", label: "Services", icon: FiTool },
    { id: "testimonials", label: "Testimonials", icon: FiStar },
    { id: "projects", label: "Featured Projects", icon: FiBriefcase },
    { id: "cta", label: "Call to Action", icon: FiMail },
  ];

  const menuItems = [
    {
      to: "/admin",
      icon: FiHome,
      title: "Dashboard",
      desc: "Back to main dashboard",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      to: "/admin/homepage",
      icon: FiHome,
      title: "Homepage",
      desc: "Current page",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      to: "/admin/about",
      icon: FiMessageSquare,
      title: "About Page",
      desc: "Company info",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      to: "/admin/services",
      icon: FiTool,
      title: "Services",
      desc: "Manage services",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      to: "/admin/portfolio",
      icon: FiBriefcase,
      title: "Portfolio",
      desc: "Projects",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      to: "/admin/contact",
      icon: FiMail,
      title: "Contact",
      desc: "Messages",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      to: "/admin/certifications",
      icon: FiStar,
      title: "Certifications",
      desc: "Certificates",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      to: "/admin/quotes",
      icon: FiMessageSquare,
      title: "Quotes",
      desc: "Requests",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
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
            <div className="w-24 h-24 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full animate-pulse opacity-20"></div>
            </div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading homepage data...
          </p>
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

      {/* Desktop Sidebar */}
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
              <p className="text-xs text-gray-500">Homepage Editor</p>
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
                    item.to === "/admin/homepage"
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`p-2.5 ${item.to === "/admin/homepage" ? "bg-blue-100" : item.bgColor} rounded-lg group-hover:scale-110 transition-transform shadow-sm`}
                  >
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <span
                      className={`text-gray-700 font-medium ${item.to === "/admin/homepage" ? "text-blue-700" : ""}`}
                    >
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
                      className="flex items-center text-gray-500 hover:text-blue-600"
                    >
                      <FiChevronLeft className="w-5 h-5" />
                      <span className="text-sm">Back to Dashboard</span>
                    </motion.div>
                  </Link>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <h1 className="text-xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Homepage Management
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
                  <span
                    className={
                      message.type === "success"
                        ? "text-green-700"
                        : "text-red-700"
                    }
                  >
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
                      ? "bg-white text-blue-600 shadow-sm font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                >
                  <tab.icon
                    className={`w-4 h-4 mr-2 ${
                      activeTab === tab.id ? "text-blue-600" : "text-gray-400"
                    }`}
                  />
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Hero Section */}
          {activeTab === "hero" && heroData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <FiHome className="w-4 h-4 text-blue-600" />
                </div>
                Hero Section Settings
              </h2>
              <form onSubmit={handleSaveHero}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={heroForm.title}
                      onChange={(e) =>
                        setHeroForm({ ...heroForm, title: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={heroForm.subtitle}
                      onChange={(e) =>
                        setHeroForm({ ...heroForm, subtitle: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message 1
                    </label>
                    <input
                      type="text"
                      value={heroForm.message_1}
                      onChange={(e) =>
                        setHeroForm({ ...heroForm, message_1: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message 2
                    </label>
                    <input
                      type="text"
                      value={heroForm.message_2}
                      onChange={(e) =>
                        setHeroForm({ ...heroForm, message_2: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message 3
                    </label>
                    <input
                      type="text"
                      value={heroForm.message_3}
                      onChange={(e) =>
                        setHeroForm({ ...heroForm, message_3: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={saving}
                    className="flex items-center px-6 py-2 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 shadow-md"
                  >
                    <FiSave className="w-4 h-4 mr-2" />
                    {saving ? "Saving..." : "Save Hero Section"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Intro Section */}
          {activeTab === "intro" && introData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <FiMessageSquare className="w-4 h-4 text-purple-600" />
                </div>
                Intro Section Settings
              </h2>
              <form onSubmit={handleSaveIntro}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content
                    </label>
                    <textarea
                      value={introForm.content}
                      onChange={(e) =>
                        setIntroForm({
                          ...introForm,
                          content: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Delivered Projects
                      </label>
                      <input
                        type="number"
                        value={introForm.delivered_projects}
                        onChange={(e) =>
                          setIntroForm({
                            ...introForm,
                            delivered_projects: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Clients Satisfied
                      </label>
                      <input
                        type="number"
                        value={introForm.clients_satisfied}
                        onChange={(e) =>
                          setIntroForm({
                            ...introForm,
                            clients_satisfied: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years Experience
                      </label>
                      <input
                        type="number"
                        value={introForm.years_experience}
                        onChange={(e) =>
                          setIntroForm({
                            ...introForm,
                            years_experience: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="flex items-center px-6 py-2 bg-linear-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 shadow-md"
                  >
                    <FiSave className="w-4 h-4 mr-2" />
                    {saving ? "Saving..." : "Save Intro Section"}
                  </motion.button>
                </div>
              </form>
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ y: -2 }}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                          {service.description}
                        </p>
                        <div className="flex items-center mt-2 space-x-2">
                          <span className="text-xs text-gray-500">
                            Order: {service.display_order}
                          </span>
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
                      <div className="flex space-x-2 ml-2">
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
                ))}
              </div>

              {services.length === 0 && (
                <div className="text-center py-12">
                  <FiTool className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    No services yet. Add one to get started.
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Testimonials */}
          {activeTab === "testimonials" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                    <FiStar className="w-4 h-4 text-yellow-600" />
                  </div>
                  Testimonials
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal("testimonial")}
                  className="flex items-center px-4 py-2 bg-linear-to-r from-yellow-600 to-yellow-700 text-white rounded-lg hover:from-yellow-700 hover:to-yellow-800 shadow-md"
                >
                  <FiPlus className="w-4 h-4 mr-2" />
                  Add Testimonial
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ y: -2 }}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start">
                      <div className="shrink-0 mr-3">
                        {testimonial.avatar_url ? (
                          <img
                            src={testimonial.avatar_url}
                            alt={testimonial.client_name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <HiOutlineUserGroup className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-600 text-sm italic">
                          "{testimonial.quote?.substring(0, 100)}..."
                        </p>
                        <div className="mt-2">
                          <span className="font-bold text-gray-800">
                            {testimonial.client_name}
                          </span>
                          {testimonial.company && (
                            <span className="text-gray-500 text-sm ml-1">
                              - {testimonial.company}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                className={`w-4 h-4 ${
                                  i < testimonial.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                openModal("testimonial", testimonial)
                              }
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                              <FiEdit2 className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                handleDeleteTestimonial(testimonial.id)
                              }
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {testimonials.length === 0 && (
                <div className="text-center py-12">
                  <FiStar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    No testimonials yet. Add one to get started.
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Featured Projects */}
          {activeTab === "projects" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <FiBriefcase className="w-4 h-4 text-orange-600" />
                  </div>
                  Featured Projects
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal("project")}
                  className="flex items-center px-4 py-2 bg-linear-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 shadow-md"
                >
                  <FiPlus className="w-4 h-4 mr-2" />
                  Add Project
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ y: -2 }}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start">
                      <div className="shrink-0 mr-3">
                        {project.image_url ? (
                          <img
                            src={project.image_url}
                            alt={project.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <FiImage className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            Order: {project.display_order}
                          </span>
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => openModal("project", project)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                              <FiEdit2 className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDeleteProject(project.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {featuredProjects.length === 0 && (
                <div className="text-center py-12">
                  <FiBriefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    No featured projects yet. Add one to get started.
                  </p>
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
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <FiMail className="w-4 h-4 text-red-600" />
                </div>
                Call to Action Settings
              </h2>
              <form onSubmit={handleSaveCTA}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
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
                    className="flex items-center px-6 py-2 bg-linear-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 shadow-md"
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
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                      modalType === "service"
                        ? "bg-green-100"
                        : modalType === "testimonial"
                          ? "bg-yellow-100"
                          : "bg-orange-100"
                    }`}
                  >
                    {modalType === "service" && (
                      <FiTool className="w-4 h-4 text-green-600" />
                    )}
                    {modalType === "testimonial" && (
                      <FiStar className="w-4 h-4 text-yellow-600" />
                    )}
                    {modalType === "project" && (
                      <FiBriefcase className="w-4 h-4 text-orange-600" />
                    )}
                  </div>
                  {editingItem ? "Edit" : "Add"}{" "}
                  {modalType === "service"
                    ? "Service"
                    : modalType === "testimonial"
                      ? "Testimonial"
                      : "Project"}
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
                {modalType === "service" && (
                  <form onSubmit={handleSaveService}>
                    <div className="space-y-4">
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
                          Icon Class (e.g., fas fa-print)
                        </label>
                        <input
                          name="icon_class"
                          defaultValue={editingItem?.icon_class || ""}
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
                        <label
                          htmlFor="is_active"
                          className="ml-2 text-sm text-gray-700"
                        >
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
                        {saving
                          ? "Saving..."
                          : editingItem
                            ? "Update"
                            : "Create"}
                      </motion.button>
                    </div>
                  </form>
                )}

                {modalType === "testimonial" && (
                  <form
                    onSubmit={handleSaveTestimonial}
                    encType="multipart/form-data"
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Client Name *
                        </label>
                        <input
                          name="client_name"
                          defaultValue={editingItem?.client_name || ""}
                          required
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Role/Position
                        </label>
                        <input
                          name="client_role"
                          defaultValue={editingItem?.client_role || ""}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company
                        </label>
                        <input
                          name="company"
                          defaultValue={editingItem?.company || ""}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Quote *
                        </label>
                        <textarea
                          name="quote"
                          defaultValue={editingItem?.quote || ""}
                          rows={4}
                          required
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Avatar Image
                        </label>
                        <input
                          type="file"
                          name="avatar"
                          accept="image/*"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                        {editingItem?.avatar_url && (
                          <div className="mt-2 flex items-center">
                            <img
                              src={editingItem.avatar_url}
                              alt="Current avatar"
                              className="w-12 h-12 object-cover rounded-full"
                            />
                            <span className="text-sm text-gray-500 ml-2">
                              Current avatar
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Rating (1-5)
                        </label>
                        <input
                          type="number"
                          name="rating"
                          defaultValue={editingItem?.rating || 5}
                          min="1"
                          max="5"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="is_active"
                          id="is_active_testimonial"
                          defaultChecked={editingItem?.is_active ?? true}
                          className="w-4 h-4 text-yellow-600 rounded focus:ring-yellow-500"
                        />
                        <label
                          htmlFor="is_active_testimonial"
                          className="ml-2 text-sm text-gray-700"
                        >
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
                        className="px-4 py-2 bg-linear-to-r from-yellow-600 to-yellow-700 text-white rounded-lg hover:from-yellow-700 hover:to-yellow-800 disabled:opacity-50"
                      >
                        {saving
                          ? "Saving..."
                          : editingItem
                            ? "Update"
                            : "Create"}
                      </motion.button>
                    </div>
                  </form>
                )}

                {modalType === "project" && (
                  <form
                    onSubmit={handleSaveProject}
                    encType="multipart/form-data"
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title *
                        </label>
                        <input
                          name="title"
                          defaultValue={editingItem?.title || ""}
                          required
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Project Image
                        </label>
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        {editingItem?.image_url && (
                          <div className="mt-2 flex items-center">
                            <img
                              src={editingItem.image_url}
                              alt="Current project"
                              className="w-16 h-16 object-cover rounded"
                            />
                            <span className="text-sm text-gray-500 ml-2">
                              Current image
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Project Link (URL)
                        </label>
                        <input
                          name="project_link"
                          defaultValue={editingItem?.project_link || ""}
                          placeholder="https://example.com/project"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="is_active"
                          id="is_active_project"
                          defaultChecked={editingItem?.is_active ?? true}
                          className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                        />
                        <label
                          htmlFor="is_active_project"
                          className="ml-2 text-sm text-gray-700"
                        >
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
                        className="px-4 py-2 bg-linear-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 disabled:opacity-50"
                      >
                        {saving
                          ? "Saving..."
                          : editingItem
                            ? "Update"
                            : "Create"}
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

export default AdminHomepage;
