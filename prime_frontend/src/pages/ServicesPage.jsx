import { useEffect, useState } from "react";
import { getServicesData } from "../services/api";

import ServicesIntro from "../components/services/ServicesIntro";
import ServiceCategories from "../components/services/ServiceCategories";
import FeaturedServices from "../components/services/FeaturedServices";
import AllServices from "../components/services/AllServices";
import ServicesCTA from "../components/services/ServicesCTA";

const ServicesPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getServicesData()
      .then((res) => {
        console.log("Services API Response:", res);
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load services page", err);
        setError("Failed to load services page");
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    </div>
  );

  if (!data) return null;

  return (
    <div className="text-gray-900 bg-gray-50">
      {data.intro && <ServicesIntro data={data.intro} />}
      {data.categories?.length > 0 && <ServiceCategories data={data.categories} />}
      {data.featured_services?.length > 0 && <FeaturedServices data={data.featured_services} />}
      {data.all_services?.length > 0 && <AllServices data={data.all_services} />}
      {data.cta && <ServicesCTA data={data.cta} />}
    </div>
  );
};

export default ServicesPage;