import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import CertificationsPage from "./pages/CertificationsPage";
import ContactPage from "./pages/ContactPage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import RequestQuote from "./pages/RequestQuotePage";
import Error404Page from "./pages/Error404Page";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQPage from "./pages/FAQPage";
import AdminLoginPage from "./admin-pages/AdminLoginPage";
import AdminDashboard from "./admin-pages/AdminDashboard";
import AdminHomepage from "./admin-pages/AdminHomepage";
import AdminAbout from "./admin-pages/AdminAbout";
import AdminServices from "./admin-pages/AdminServices";
import AdminPortfolio from "./admin-pages/AdminPortfolio";
import AdminContact from "./admin-pages/AdminContact";
import AdminCertifications from "./admin-pages/AdminCertifications";
import AdminQuotes from "./admin-pages/AdminQuotes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website Routes */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <HomePage />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Header />
              <AboutPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/services"
          element={
            <>
              <Header />
              <ServicesPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/portfolio"
          element={
            <>
              <Header />
              <PortfolioPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/certifications"
          element={
            <>
              <Header />
              <CertificationsPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Header />
              <ContactPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/request-quote"
          element={
            <>
              <Header />
              <RequestQuote />
              <Footer />
            </>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <>
              <Header />
              <PrivacyPolicy />
              <Footer />
            </>
          }
        />
        <Route
          path="/faq"
          element={
            <>
              <Header />
              <FAQPage />
              <Footer />
            </>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/homepage" element={<AdminHomepage />} />
        <Route path="/admin/about" element={<AdminAbout />} />
        <Route path="/admin/services" element={<AdminServices />} />
        <Route path="/admin/portfolio" element={<AdminPortfolio />} />
        <Route path="/admin/contact" element={<AdminContact />} />
        <Route path="/admin/certifications" element={<AdminCertifications />} />
        <Route path="/admin/quotes" element={<AdminQuotes />} />

        {/* 404 Page */}
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
