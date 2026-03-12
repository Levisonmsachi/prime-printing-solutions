import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

// Get token from localStorage
const getToken = () => localStorage.getItem("admin_token");

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Store token and user info on successful login responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If 401 unauthorized, clear token and redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      // Could dispatch a logout event here
    }
    return Promise.reject(error);
  },
);

// ==================== PUBLIC API ====================

export const getHomepageData = async () => {
  const response = await api.get("/homepage/");
  return response.data;
};

export const getAboutData = async () => {
  const response = await api.get("/about/");
  return response.data;
};

export const getPortfolioData = async () => {
  const response = await api.get("/portfolio/");
  return response.data;
};

export const getServicesData = async () => {
  const response = await api.get("/services/page-data/");
  return response.data;
};

export const getCertificationsData = async () => {
  const response = await api.get("/certifications/page-data/");
  return response.data;
};

export const getContactData = async () => {
  const response = await api.get("/contact/page-data/");
  return response.data;
};

export const submitContactForm = async (formData) => {
  const response = await api.post("/contact/messages/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const submitQuote = async (formData) => {
  const response = await api.post("/quotes/quote-request/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// ==================== ADMIN API ====================

// Authentication
export const adminLogin = async (username, password) => {
  const response = await api.post("/admin/auth/login/", { username, password });
  const data = response.data;

  // Store token and user in localStorage
  if (data.success && data.token) {
    localStorage.setItem("admin_token", data.token);
    localStorage.setItem("admin_user", JSON.stringify(data.user));
  }

  return data;
};

export const adminLogout = async () => {
  // Clear localStorage
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_user");

  const response = await api.post("/admin/auth/logout/");
  return response.data;
};

export const checkAdminAuth = async () => {
  const response = await api.get("/admin/auth/check/");
  return response.data;
};

// Dashboard
export const getDashboardStats = async () => {
  const response = await api.get("/admin/dashboard/stats/");
  return response.data;
};

export const getRecentMessages = async () => {
  const response = await api.get("/admin/dashboard/recent-messages/");
  return response.data;
};

// Homepage Management
export const getHeroSection = async () => {
  const response = await api.get("/admin/homepage/hero/");
  return response.data;
};

export const updateHeroSection = async (id, data) => {
  const response = await api.patch(`/admin/homepage/hero/${id}/`, data);
  return response.data;
};

export const getIntroSection = async () => {
  const response = await api.get("/admin/homepage/intro/");
  return response.data;
};

export const updateIntroSection = async (id, data) => {
  const response = await api.patch(`/admin/homepage/intro/${id}/`, data);
  return response.data;
};

export const getServiceHighlights = async () => {
  const response = await api.get("/admin/homepage/service-highlights/");
  return response.data;
};

export const createServiceHighlight = async (data) => {
  const response = await api.post("/admin/homepage/service-highlights/", data);
  return response.data;
};

export const updateServiceHighlight = async (id, data) => {
  const response = await api.patch(
    `/admin/homepage/service-highlights/${id}/`,
    data,
  );
  return response.data;
};

export const deleteServiceHighlight = async (id) => {
  const response = await api.delete(
    `/admin/homepage/service-highlights/${id}/`,
  );
  return response.data;
};

export const getTestimonials = async () => {
  const response = await api.get("/admin/homepage/testimonials/");
  return response.data;
};

export const createTestimonial = async (data) => {
  const response = await api.post("/admin/homepage/testimonials/", data);
  return response.data;
};

export const updateTestimonial = async (id, data) => {
  const response = await api.patch(`/admin/homepage/testimonials/${id}/`, data);
  return response.data;
};

export const deleteTestimonial = async (id) => {
  const response = await api.delete(`/admin/homepage/testimonials/${id}/`);
  return response.data;
};

export const getFeaturedProjects = async () => {
  const response = await api.get("/admin/homepage/featured-projects/");
  return response.data;
};

export const createFeaturedProject = async (data) => {
  const response = await api.post("/admin/homepage/featured-projects/", data);
  return response.data;
};

export const updateFeaturedProject = async (id, data) => {
  const response = await api.patch(
    `/admin/homepage/featured-projects/${id}/`,
    data,
  );
  return response.data;
};

export const deleteFeaturedProject = async (id) => {
  const response = await api.delete(`/admin/homepage/featured-projects/${id}/`);
  return response.data;
};

export const getCertifications = async () => {
  const response = await api.get("/admin/homepage/certifications/");
  return response.data;
};

export const createCertification = async (formData) => {
  const response = await api.post("/admin/homepage/certifications/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateCertification = async (id, formData) => {
  const response = await api.patch(
    `/admin/homepage/certifications/${id}/`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return response.data;
};

export const deleteCertification = async (id) => {
  const response = await api.delete(`/admin/homepage/certifications/${id}/`);
  return response.data;
};

export const getHomepageCTA = async () => {
  const response = await api.get("/admin/homepage/cta/");
  return response.data;
};

export const updateHomepageCTA = async (id, data) => {
  const response = await api.patch(`/admin/homepage/cta/${id}/`, data);
  return response.data;
};

// Messages Management
export const getContactMessages = async () => {
  const response = await api.get("/admin/contact/messages/");
  return response.data;
};

export const deleteContactMessage = async (id) => {
  const response = await api.delete(`/admin/contact/messages/${id}/`);
  return response.data;
};

export const markMessageAsRead = async (id) => {
  const response = await api.post(`/admin/contact/messages/${id}/mark-read/`);
  return response.data;
};

// Contact Page Management
export const getContactPageIntro = async () => {
  const response = await api.get("/admin/contact/intro/");
  return response.data;
};

export const updateContactPageIntro = async (id, data) => {
  const response = await api.patch(`/admin/contact/intro/${id}/`, data);
  return response.data;
};

export const getContactInfo = async () => {
  const response = await api.get("/admin/contact/info/");
  return response.data;
};

export const updateContactInfo = async (id, data) => {
  const response = await api.patch(`/admin/contact/info/${id}/`, data);
  return response.data;
};

export const getOfficeLocations = async () => {
  const response = await api.get("/admin/contact/locations/");
  return response.data;
};

export const createOfficeLocation = async (data) => {
  const response = await api.post("/admin/contact/locations/", data);
  return response.data;
};

export const updateOfficeLocation = async (id, data) => {
  const response = await api.patch(`/admin/contact/locations/${id}/`, data);
  return response.data;
};

export const deleteOfficeLocation = async (id) => {
  const response = await api.delete(`/admin/contact/locations/${id}/`);
  return response.data;
};

export const getContactSettings = async () => {
  const response = await api.get("/admin/contact/settings/");
  return response.data;
};

export const updateContactSettings = async (id, data) => {
  const response = await api.patch(`/admin/contact/settings/${id}/`, data);
  return response.data;
};

export const getContactCTA = async () => {
  const response = await api.get("/admin/contact/cta/");
  return response.data;
};

export const updateContactCTA = async (id, data) => {
  const response = await api.patch(`/admin/contact/cta/${id}/`, data);
  return response.data;
};

// Quotes Management
export const getQuoteRequests = async () => {
  const response = await api.get("/admin/quotes/");
  return response.data;
};

export const deleteQuoteRequest = async (id) => {
  const response = await api.delete(`/admin/quotes/${id}/`);
  return response.data;
};

// About Page Management
export const getAboutCompanyProfile = async () => {
  const response = await api.get("/admin/about/company-profile/");
  return response.data;
};

export const updateAboutCompanyProfile = async (id, data) => {
  const response = await api.patch(`/admin/about/company-profile/${id}/`, data);
  return response.data;
};

export const getAboutHistory = async () => {
  const response = await api.get("/admin/about/history/");
  return response.data;
};

export const createAboutHistory = async (data) => {
  const response = await api.post("/admin/about/history/", data);
  return response.data;
};

export const updateAboutHistory = async (id, data) => {
  const response = await api.patch(`/admin/about/history/${id}/`, data);
  return response.data;
};

export const deleteAboutHistory = async (id) => {
  const response = await api.delete(`/admin/about/history/${id}/`);
  return response.data;
};

export const getAboutTeam = async () => {
  const response = await api.get("/admin/about/team/");
  return response.data;
};

export const createAboutTeam = async (data) => {
  const response = await api.post("/admin/about/team/", data);
  return response.data;
};

export const updateAboutTeam = async (id, data) => {
  const response = await api.patch(`/admin/about/team/${id}/`, data);
  return response.data;
};

export const deleteAboutTeam = async (id) => {
  const response = await api.delete(`/admin/about/team/${id}/`);
  return response.data;
};

export const getAboutValues = async () => {
  const response = await api.get("/admin/about/values/");
  return response.data;
};

export const createAboutValue = async (data) => {
  const response = await api.post("/admin/about/values/", data);
  return response.data;
};

export const updateAboutValue = async (id, data) => {
  const response = await api.patch(`/admin/about/values/${id}/`, data);
  return response.data;
};

export const deleteAboutValue = async (id) => {
  const response = await api.delete(`/admin/about/values/${id}/`);
  return response.data;
};

export const getAboutImpact = async () => {
  const response = await api.get("/admin/about/impact/");
  return response.data;
};

export const createAboutImpact = async (data) => {
  const response = await api.post("/admin/about/impact/", data);
  return response.data;
};

export const updateAboutImpact = async (id, data) => {
  const response = await api.patch(`/admin/about/impact/${id}/`, data);
  return response.data;
};

export const deleteAboutImpact = async (id) => {
  const response = await api.delete(`/admin/about/impact/${id}/`);
  return response.data;
};

export const getAboutPartners = async () => {
  const response = await api.get("/admin/about/partners/");
  return response.data;
};

export const createAboutPartner = async (data) => {
  const response = await api.post("/admin/about/partners/", data);
  return response.data;
};

export const updateAboutPartner = async (id, data) => {
  const response = await api.patch(`/admin/about/partners/${id}/`, data);
  return response.data;
};

export const deleteAboutPartner = async (id) => {
  const response = await api.delete(`/admin/about/partners/${id}/`);
  return response.data;
};

// Services Page Management
export const getServicesIntro = async () => {
  const response = await api.get("/admin/services/intro/");
  return response.data;
};

export const updateServicesIntro = async (id, data) => {
  const response = await api.patch(`/admin/services/intro/${id}/`, data);
  return response.data;
};

export const getServiceCategories = async () => {
  const response = await api.get("/admin/services/categories/");
  return response.data;
};

export const createServiceCategory = async (data) => {
  const response = await api.post("/admin/services/categories/", data);
  return response.data;
};

export const updateServiceCategory = async (id, data) => {
  const response = await api.patch(`/admin/services/categories/${id}/`, data);
  return response.data;
};

export const deleteServiceCategory = async (id) => {
  const response = await api.delete(`/admin/services/categories/${id}/`);
  return response.data;
};

export const getServices = async () => {
  const response = await api.get("/admin/services/");
  return response.data;
};

export const createService = async (data) => {
  const response = await api.post("/admin/services/", data);
  return response.data;
};

export const updateService = async (id, data) => {
  const response = await api.patch(`/admin/services/${id}/`, data);
  return response.data;
};

export const deleteService = async (id) => {
  const response = await api.delete(`/admin/services/${id}/`);
  return response.data;
};

export const getServiceProcessSteps = async () => {
  const response = await api.get("/admin/services/process-steps/");
  return response.data;
};

export const createServiceProcessStep = async (data) => {
  const response = await api.post("/admin/services/process-steps/", data);
  return response.data;
};

export const updateServiceProcessStep = async (id, data) => {
  const response = await api.patch(
    `/admin/services/process-steps/${id}/`,
    data,
  );
  return response.data;
};

export const deleteServiceProcessStep = async (id) => {
  const response = await api.delete(`/admin/services/process-steps/${id}/`);
  return response.data;
};

export const getServicesCTA = async () => {
  const response = await api.get("/admin/services/cta/");
  return response.data;
};

export const updateServicesCTA = async (id, data) => {
  const response = await api.patch(`/admin/services/cta/${id}/`, data);
  return response.data;
};

// Portfolio Page Management
export const getPortfolioIntro = async () => {
  const response = await api.get("/admin/portfolio/intro/");
  return response.data;
};

export const updatePortfolioIntro = async (id, data) => {
  const response = await api.patch(`/admin/portfolio/intro/${id}/`, data);
  return response.data;
};

export const getPortfolioCategories = async () => {
  const response = await api.get("/admin/portfolio/categories/");
  return response.data;
};

export const createPortfolioCategory = async (data) => {
  const response = await api.post("/admin/portfolio/categories/", data);
  return response.data;
};

export const updatePortfolioCategory = async (id, data) => {
  const response = await api.patch(`/admin/portfolio/categories/${id}/`, data);
  return response.data;
};

export const deletePortfolioCategory = async (id) => {
  const response = await api.delete(`/admin/portfolio/categories/${id}/`);
  return response.data;
};

export const getPortfolioProjects = async () => {
  const response = await api.get("/admin/portfolio/projects/");
  return response.data;
};

export const createPortfolioProject = async (data) => {
  const response = await api.post("/admin/portfolio/projects/", data);
  return response.data;
};

export const updatePortfolioProject = async (id, data) => {
  const response = await api.patch(`/admin/portfolio/projects/${id}/`, data);
  return response.data;
};

export const deletePortfolioProject = async (id) => {
  const response = await api.delete(`/admin/portfolio/projects/${id}/`);
  return response.data;
};

export const getPortfolioCTA = async () => {
  const response = await api.get("/admin/portfolio/cta/");
  return response.data;
};

export const updatePortfolioCTA = async (id, data) => {
  const response = await api.patch(`/admin/portfolio/cta/${id}/`, data);
  return response.data;
};

// Certifications Page Management
export const getCertificationsIntro = async () => {
  const response = await api.get("/admin/certifications/intro/");
  return response.data;
};

export const updateCertificationsIntro = async (id, data) => {
  const response = await api.patch(`/admin/certifications/intro/${id}/`, data);
  return response.data;
};

export const getCertificationsNotice = async () => {
  const response = await api.get("/admin/certifications/notice/");
  return response.data;
};

export const createCertificationsNotice = async (data) => {
  const response = await api.post("/admin/certifications/notice/", data);
  return response.data;
};

export const updateCertificationsNotice = async (id, data) => {
  const response = await api.patch(`/admin/certifications/notice/${id}/`, data);
  return response.data;
};

export const deleteCertificationsNotice = async (id) => {
  const response = await api.delete(`/admin/certifications/notice/${id}/`);
  return response.data;
};

export const getCertificationsCTA = async () => {
  const response = await api.get("/admin/certifications/cta/");
  return response.data;
};

export const updateCertificationsCTA = async (id, data) => {
  const response = await api.patch(`/admin/certifications/cta/${id}/`, data);
  return response.data;
};

// Media Upload
export const uploadMedia = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post("/admin/media/upload/", formData);
  return response.data;
};
