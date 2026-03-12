import { useEffect, useState } from "react";
import { getPortfolioData } from "../services/api";

import PortfolioIntro from "../components/portfolio/PortfolioIntro";
import PortfolioCategories from "../components/portfolio/PortfolioCategories";
import PortfolioProjects from "../components/portfolio/PortfolioProjects";
import PortfolioCTA from "../components/portfolio/PortfolioCTA";

const PortfolioPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPortfolioData()
      .then((res) => {
        console.log("Portfolio API Response:", res);
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load portfolio page", err);
        setError("Failed to load portfolio page");
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
      {data.intro && <PortfolioIntro data={data.intro} />}
      {data.categories?.length > 0 && <PortfolioCategories data={data.categories} />}
      {data.projects?.length > 0 && <PortfolioProjects data={data.projects} />}
      {data.cta && <PortfolioCTA data={data.cta} />}
    </div>
  );
};

export default PortfolioPage;