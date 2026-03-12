import { useEffect, useState } from "react";
import { getHomepageData } from "../services/api";

import Hero from "../components/home/Hero";
import Intro from "../components/home/Intro";
import Services from "../components/home/Services";
import FeaturedProjects from "../components/home/FeaturedProjects";
import Testimonials from "../components/home/Testimonials";
import Certifications from "../components/home/Certifications";
import CompanyProfile from "../components/home/CompanyProfile";
import CallToAction from "../components/home/CallToAction";

const HomePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getHomepageData()
      .then((res) => {
        console.log("API Response:", res); // Debug
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load homepage", err);
        setError("Failed to load homepage");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-10 text-white">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;
  if (!data) return null;

  return (
    <div className="text-gray-900 bg-gray-50">
      {data.hero && <Hero data={data.hero} />}
      {data.intro && <Intro data={data.intro} />}
      {data.services?.length > 0 && <Services data={data.services} />}
      {data.featured_projects?.length > 0 && <FeaturedProjects data={data.featured_projects} />}
      {data.company_profile && <CompanyProfile data={data.company_profile} />}
      {data.testimonials?.length > 0 && <Testimonials data={data.testimonials} />}
      {data.certifications?.length > 0 && <Certifications data={data.certifications} />}
      {data.cta && <CallToAction data={data.cta} />}
    </div>
  );
};

export default HomePage;