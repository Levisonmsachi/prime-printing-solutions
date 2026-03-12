import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiUsers, FiHome, FiLogOut, FiMenu, FiX, FiPlus, FiEdit2, 
  FiTrash2, FiSave, FiChevronLeft, FiAlertCircle, 
  FiCheckCircle, FiStar, FiTarget, FiHeart,
  FiAward, FiBriefcase, FiGlobe, FiCalendar,
  FiEye, FiEyeOff, FiLink, FiInfo, FiBarChart2
} from "react-icons/fi";
import {
  getAboutCompanyProfile,
  updateAboutCompanyProfile,
  getAboutHistory,
  createAboutHistory,
  updateAboutHistory,
  deleteAboutHistory,
  getAboutTeam,
  createAboutTeam,
  updateAboutTeam,
  deleteAboutTeam,
  getAboutValues,
  createAboutValue,
  updateAboutValue,
  deleteAboutValue,
  getAboutImpact,
  createAboutImpact,
  updateAboutImpact,
  deleteAboutImpact,
  getAboutPartners,
  createAboutPartner,
  updateAboutPartner,
  deleteAboutPartner,
  adminLogout,
} from "../services/api";

function AdminAbout() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("company-profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [greeting, setGreeting] = useState("");

  // Data states
  const [companyProfile, setCompanyProfile] = useState(null);
  const [companyProfileForm, setCompanyProfileForm] = useState({});
  const [history, setHistory] = useState([]);
  const [team, setTeam] = useState([]);
  const [values, setValues] = useState([]);
  const [impact, setImpact] = useState([]);
  const [partners, setPartners] = useState([]);

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
        profileRes,
        historyRes,
        teamRes,
        valuesRes,
        impactRes,
        partnersRes,
      ] = await Promise.all([
        getAboutCompanyProfile(),
        getAboutHistory(),
        getAboutTeam(),
        getAboutValues(),
        getAboutImpact(),
        getAboutPartners(),
      ]);

      if (profileRes.length > 0) {
        const profile = profileRes[0];
        setCompanyProfile(profile);
        setCompanyProfileForm({
          company_name: profile.company_name || "",
          tagline: profile.tagline || "",
          what_we_do: profile.what_we_do || "",
          mission: profile.mission || "",
          vision: profile.vision || "",
          values_summary: profile.values_summary || "",
          team_Members_count: profile.team_Members_count || "",
          years_experience: profile.years_experience || "",
          projects_completed: profile.projects_completed || "",
          clients_served: profile.clients_served || "",
          target_market: profile.target_market || "",
        });
      }

      setHistory(historyRes);
      setTeam(teamRes);
      setValues(valuesRes);
      setImpact(impactRes);
      setPartners(partnersRes);
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

  const handleSaveCompanyProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateAboutCompanyProfile(companyProfile.id, companyProfileForm);
      setMessage({ type: "success", text: "Company profile saved successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save company profile" });
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

  const handleSaveHistory = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    setSaving(true);
    try {
      if (editingItem) {
        await updateAboutHistory(editingItem.id, data);
        setMessage({ type: "success", text: "History updated successfully!" });
      } else {
        await createAboutHistory(data);
        setMessage({ type: "success", text: "History created successfully!" });
      }
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      closeModal();
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save history" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteHistory = async (id) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    try {
      await deleteAboutHistory(id);
      setMessage({ type: "success", text: "History deleted successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete" });
    }
  };

  const handleSaveTeam = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    setSaving(true);
    try {
      if (editingItem) {
        await updateAboutTeam(editingItem.id, data);
        setMessage({ type: "success", text: "Team member updated successfully!" });
      } else {
        await createAboutTeam(data);
        setMessage({ type: "success", text: "Team member created successfully!" });
      }
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      closeModal();
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save team member" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTeam = async (id) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    try {
      await deleteAboutTeam(id);
      setMessage({ type: "success", text: "Team member deleted successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete" });
    }
  };

  const handleSaveValue = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    setSaving(true);
    try {
      if (editingItem) {
        await updateAboutValue(editingItem.id, data);
        setMessage({ type: "success", text: "Value updated successfully!" });
      } else {
        await createAboutValue(data);
        setMessage({ type: "success", text: "Value created successfully!" });
      }
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      closeModal();
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save value" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteValue = async (id) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    try {
      await deleteAboutValue(id);
      setMessage({ type: "success", text: "Value deleted successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete" });
    }
  };

  const handleSaveImpact = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    setSaving(true);
    try {
      if (editingItem) {
        await updateAboutImpact(editingItem.id, data);
        setMessage({ type: "success", text: "Impact updated successfully!" });
      } else {
        await createAboutImpact(data);
        setMessage({ type: "success", text: "Impact created successfully!" });
      }
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      closeModal();
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save impact" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteImpact = async (id) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    try {
      await deleteAboutImpact(id);
      setMessage({ type: "success", text: "Impact deleted successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete" });
    }
  };

  const handleSavePartner = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    setSaving(true);
    try {
      if (editingItem) {
        await updateAboutPartner(editingItem.id, data);
        setMessage({ type: "success", text: "Partner updated successfully!" });
      } else {
        await createAboutPartner(data);
        setMessage({ type: "success", text: "Partner created successfully!" });
      }
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      closeModal();
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save partner" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePartner = async (id) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    try {
      await deleteAboutPartner(id);
      setMessage({ type: "success", text: "Partner deleted successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete" });
    }
  };

  const tabs = [
    { id: "company-profile", label: "Company Profile", icon: FiInfo },
    { id: "history", label: "Company History", icon: FiCalendar },
    { id: "team", label: "Team Members", icon: FiUsers },
    { id: "values", label: "Company Values", icon: FiHeart },
    { id: "impact", label: "Company Impact", icon: FiBarChart2 },
    { id: "partners", label: "Partners", icon: FiGlobe },
  ];

  const menuItems = [
    { to: "/admin", icon: FiHome, title: "Dashboard", desc: "Back to main dashboard", color: "text-blue-600", bgColor: "bg-blue-50" },
    { to: "/admin/homepage", icon: FiHome, title: "Homepage", desc: "Manage homepage", color: "text-indigo-600", bgColor: "bg-indigo-50" },
    { to: "/admin/about", icon: FiUsers, title: "About Page", desc: "Current page", color: "text-purple-600", bgColor: "bg-purple-50" },
    { to: "/admin/services", icon: FiBriefcase, title: "Services", desc: "Manage services", color: "text-green-600", bgColor: "bg-green-50" },
    { to: "/admin/portfolio", icon: FiAward, title: "Portfolio", desc: "Projects", color: "text-orange-600", bgColor: "bg-orange-50" },
    { to: "/admin/contact", icon: FiGlobe, title: "Contact", desc: "Messages", color: "text-red-600", bgColor: "bg-red-50" },
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
            <div className="w-24 h-24 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full animate-pulse opacity-20"></div>
            </div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading about page data...</p>
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
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center shadow-lg">
              <FiUsers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Prime Print
              </h2>
              <p className="text-xs text-gray-500">About Page Editor</p>
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
                    item.to === "/admin/about" ? "bg-purple-50" : "hover:bg-gray-50"
                  }`}
                >
                  <div className={`p-2.5 ${item.to === "/admin/about" ? "bg-purple-100" : item.bgColor} rounded-lg group-hover:scale-110 transition-transform shadow-sm`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <span className={`text-gray-700 font-medium ${item.to === "/admin/about" ? "text-purple-700" : ""}`}>
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
                      className="flex items-center text-gray-500 hover:text-purple-600"
                    >
                      <FiChevronLeft className="w-5 h-5" />
                      <span className="text-sm">Back to Dashboard</span>
                    </motion.div>
                  </Link>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-800 to-purple-600 bg-clip-text text-transparent">
                    About Page Management
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
                      ? "bg-white text-purple-600 shadow-sm font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                >
                  <tab.icon className={`w-4 h-4 mr-2 ${
                    activeTab === tab.id ? "text-purple-600" : "text-gray-400"
                  }`} />
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Company Profile */}
          {activeTab === "company-profile" && companyProfile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <FiInfo className="w-4 h-4 text-purple-600" />
                </div>
                Company Profile Settings
              </h2>
              <form onSubmit={handleSaveCompanyProfile}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={companyProfileForm.company_name}
                      onChange={(e) =>
                        setCompanyProfileForm({
                          ...companyProfileForm,
                          company_name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={companyProfileForm.tagline}
                      onChange={(e) =>
                        setCompanyProfileForm({
                          ...companyProfileForm,
                          tagline: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What We Do
                    </label>
                    <textarea
                      value={companyProfileForm.what_we_do}
                      onChange={(e) =>
                        setCompanyProfileForm({
                          ...companyProfileForm,
                          what_we_do: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mission
                    </label>
                    <textarea
                      value={companyProfileForm.mission}
                      onChange={(e) =>
                        setCompanyProfileForm({
                          ...companyProfileForm,
                          mission: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vision
                    </label>
                    <textarea
                      value={companyProfileForm.vision}
                      onChange={(e) =>
                        setCompanyProfileForm({
                          ...companyProfileForm,
                          vision: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Values Summary
                    </label>
                    <textarea
                      value={companyProfileForm.values_summary}
                      onChange={(e) =>
                        setCompanyProfileForm({
                          ...companyProfileForm,
                          values_summary: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Team Members Count
                    </label>
                    <input
                      type="number"
                      value={companyProfileForm.team_Members_count}
                      onChange={(e) =>
                        setCompanyProfileForm({
                          ...companyProfileForm,
                          team_Members_count: e.target.value,
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
                      value={companyProfileForm.years_experience}
                      onChange={(e) =>
                        setCompanyProfileForm({
                          ...companyProfileForm,
                          years_experience: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Projects Completed
                    </label>
                    <input
                      type="number"
                      value={companyProfileForm.projects_completed}
                      onChange={(e) =>
                        setCompanyProfileForm({
                          ...companyProfileForm,
                          projects_completed: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Clients Served
                    </label>
                    <input
                      type="number"
                      value={companyProfileForm.clients_served}
                      onChange={(e) =>
                        setCompanyProfileForm({
                          ...companyProfileForm,
                          clients_served: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Market
                    </label>
                    <textarea
                      value={companyProfileForm.target_market}
                      onChange={(e) =>
                        setCompanyProfileForm({
                          ...companyProfileForm,
                          target_market: e.target.value,
                        })
                      }
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={saving}
                    className="flex items-center px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 shadow-md"
                  >
                    <FiSave className="w-4 h-4 mr-2" />
                    {saving ? "Saving..." : "Save Company Profile"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}

          {/* History */}
          {activeTab === "history" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <FiCalendar className="w-4 h-4 text-blue-600" />
                  </div>
                  Company History
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal("history")}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md"
                >
                  <FiPlus className="w-4 h-4 mr-2" />
                  Add History
                </motion.button>
              </div>
              
              <div className="space-y-4">
                {history.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ y: -2 }}
                    className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <FiCalendar className="w-4 h-4 text-blue-500 mr-2" />
                          <span className="text-sm font-semibold text-blue-600">{item.year}</span>
                        </div>
                        <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                        <p className="text-gray-600 mt-1">{item.content}</p>
                        {item.display_order && (
                          <span className="inline-block mt-2 text-xs text-gray-400">
                            Order: {item.display_order}
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openModal("history", item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteHistory(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {history.length === 0 && (
                <div className="text-center py-12">
                  <FiCalendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No history entries yet. Add one to get started.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Team */}
          {activeTab === "team" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <FiUsers className="w-4 h-4 text-green-600" />
                  </div>
                  Team Members
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal("team")}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 shadow-md"
                >
                  <FiPlus className="w-4 h-4 mr-2" />
                  Add Team Member
                </motion.button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map((member) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ y: -5 }}
                    className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all"
                  >
                    <div className="text-center">
                      {(member.avatar_url || member.avatar) ? (
                        <img
                          src={member.avatar_url || member.avatar}
                          alt={member.full_name}
                          className="w-24 h-24 rounded-full object-cover mx-auto mb-3 border-4 border-green-100"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center border-4 border-green-200">
                          <FiUsers className="w-12 h-12 text-green-400" />
                        </div>
                      )}
                      <h3 className="font-bold text-lg text-gray-800">{member.full_name}</h3>
                      <p className="text-green-600 text-sm font-medium">{member.role}</p>
                      {member.bio && (
                        <p className="text-gray-500 text-sm mt-2 line-clamp-2">{member.bio}</p>
                      )}
                      <div className="flex justify-center space-x-2 mt-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openModal("team", member)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteTeam(member.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {team.length === 0 && (
                <div className="text-center py-12">
                  <FiUsers className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No team members yet. Add one to get started.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Values */}
          {activeTab === "values" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <FiHeart className="w-4 h-4 text-red-600" />
                  </div>
                  Company Values
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal("value")}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 shadow-md"
                >
                  <FiPlus className="w-4 h-4 mr-2" />
                  Add Value
                </motion.button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {values.map((value) => (
                  <motion.div
                    key={value.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ y: -2 }}
                    className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          {value.icon_class && (
                            <span className="text-xl mr-2">{value.icon_class}</span>
                          )}
                          <h3 className="font-bold text-lg text-gray-800">{value.title}</h3>
                        </div>
                        <p className="text-gray-600">{value.description}</p>
                        {value.display_order && (
                          <span className="inline-block mt-2 text-xs text-gray-400">
                            Order: {value.display_order}
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openModal("value", value)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteValue(value.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {values.length === 0 && (
                <div className="text-center py-12">
                  <FiHeart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No values yet. Add one to get started.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Impact */}
          {activeTab === "impact" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <FiBarChart2 className="w-4 h-4 text-orange-600" />
                  </div>
                  Company Impact
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal("impact")}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 shadow-md"
                >
                  <FiPlus className="w-4 h-4 mr-2" />
                  Add Impact
                </motion.button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {impact.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ y: -2 }}
                    className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                        <p className="text-gray-600 mt-1">{item.description}</p>
                        {item.display_order && (
                          <span className="inline-block mt-2 text-xs text-gray-400">
                            Order: {item.display_order}
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openModal("impact", item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteImpact(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {impact.length === 0 && (
                <div className="text-center py-12">
                  <FiBarChart2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No impact yet. Add one to get started.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Partners */}
          {activeTab === "partners" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <FiGlobe className="w-4 h-4 text-indigo-600" />
                  </div>
                  Partners
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal("partner")}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 shadow-md"
                >
                  <FiPlus className="w-4 h-4 mr-2" />
                  Add Partner
                </motion.button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {partners.map((partner) => (
                  <motion.div
                    key={partner.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ y: -5 }}
                    className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all text-center"
                  >
                    {(partner.logo_url || partner.logo) ? (
                      <img
                        src={partner.logo_url || partner.logo}
                        alt={partner.name}
                        className="w-20 h-20 object-contain mx-auto mb-3"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-indigo-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <FiGlobe className="w-10 h-10 text-indigo-400" />
                      </div>
                    )}
                    <h3 className="font-bold text-gray-800">{partner.name}</h3>
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 text-sm hover:underline flex items-center justify-center mt-1"
                      >
                        <FiLink className="w-3 h-3 mr-1" />
                        Website
                      </a>
                    )}
                    <div className="flex justify-center space-x-2 mt-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => openModal("partner", partner)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeletePartner(partner.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {partners.length === 0 && (
                <div className="text-center py-12">
                  <FiGlobe className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No partners yet. Add one to get started.</p>
                </div>
              )}
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
                    modalType === "history" ? "bg-blue-100" :
                    modalType === "team" ? "bg-green-100" :
                    modalType === "value" ? "bg-red-100" :
                    modalType === "impact" ? "bg-orange-100" : "bg-indigo-100"
                  }`}>
                    {modalType === "history" && <FiCalendar className="w-4 h-4 text-blue-600" />}
                    {modalType === "team" && <FiUsers className="w-4 h-4 text-green-600" />}
                    {modalType === "value" && <FiHeart className="w-4 h-4 text-red-600" />}
                    {modalType === "impact" && <FiBarChart2 className="w-4 h-4 text-orange-600" />}
                    {modalType === "partner" && <FiGlobe className="w-4 h-4 text-indigo-600" />}
                  </div>
                  {editingItem ? "Edit" : "Add"}{" "}
                  {modalType === "history" ? "History Entry" :
                   modalType === "team" ? "Team Member" :
                   modalType === "value" ? "Company Value" :
                   modalType === "impact" ? "Impact Item" : "Partner"}
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
                {modalType === "history" && (
                  <form onSubmit={handleSaveHistory}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Year *
                        </label>
                        <input
                          name="year"
                          defaultValue={editingItem?.year || ""}
                          required
                          placeholder="e.g., 2020"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Content
                        </label>
                        <textarea
                          name="content"
                          defaultValue={
                            editingItem?.content || editingItem?.description || ""
                          }
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50"
                      >
                        {saving ? "Saving..." : editingItem ? "Update" : "Create"}
                      </motion.button>
                    </div>
                  </form>
                )}

                {modalType === "team" && (
                  <form onSubmit={handleSaveTeam} encType="multipart/form-data">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          name="full_name"
                          defaultValue={editingItem?.full_name || ""}
                          required
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Role/Position *
                        </label>
                        <input
                          name="role"
                          defaultValue={editingItem?.role || ""}
                          required
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          defaultValue={editingItem?.bio || ""}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Photo
                        </label>
                        <input
                          type="file"
                          name="avatar"
                          accept="image/*"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        {(editingItem?.avatar_url || editingItem?.avatar) && (
                          <div className="mt-2 flex items-center">
                            <img
                              src={editingItem.avatar_url || editingItem.avatar}
                              alt="Current"
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <span className="text-sm text-gray-500 ml-2">Current photo</span>
                          </div>
                        )}
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
                        className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50"
                      >
                        {saving ? "Saving..." : editingItem ? "Update" : "Create"}
                      </motion.button>
                    </div>
                  </form>
                )}

                {modalType === "value" && (
                  <form onSubmit={handleSaveValue}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title *
                        </label>
                        <input
                          name="title"
                          defaultValue={editingItem?.title || ""}
                          required
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Icon Class (e.g., fas fa-heart)
                        </label>
                        <input
                          name="icon_class"
                          defaultValue={editingItem?.icon_class || ""}
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
                )}

                {modalType === "impact" && (
                  <form onSubmit={handleSaveImpact}>
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
                          Display Order
                        </label>
                        <input
                          type="number"
                          name="display_order"
                          defaultValue={editingItem?.display_order || 0}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                        className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 disabled:opacity-50"
                      >
                        {saving ? "Saving..." : editingItem ? "Update" : "Create"}
                      </motion.button>
                    </div>
                  </form>
                )}

                {modalType === "partner" && (
                  <form onSubmit={handleSavePartner} encType="multipart/form-data">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name *
                        </label>
                        <input
                          name="name"
                          defaultValue={editingItem?.name || ""}
                          required
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Logo Image
                        </label>
                        <input
                          type="file"
                          name="logo"
                          accept="image/*"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        {(editingItem?.logo_url || editingItem?.logo) && (
                          <div className="mt-2 flex items-center">
                            <img
                              src={editingItem.logo_url || editingItem.logo}
                              alt="Current logo"
                              className="w-12 h-12 object-contain"
                            />
                            <span className="text-sm text-gray-500 ml-2">Current logo</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Website URL
                        </label>
                        <input
                          name="website"
                          defaultValue={editingItem?.website || ""}
                          placeholder="https://example.com"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-50"
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

export default AdminAbout;