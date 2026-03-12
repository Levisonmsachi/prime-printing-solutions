import { useEffect, useState } from "react";
import { getAboutData } from "../services/api";

import CompanyProfile from "../components/about/CompanyProfile";
import CompanyHistory from "../components/about/CompanyHistory";
import TeamMembers from "../components/about/TeamMembers";
import CompanyImpact from "../components/about/CompanyImpact";
import Partners from "../components/about/Partners";

const AboutPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAboutData()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load about page", err);
        setError("Failed to load about page");
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
      {data.profile && <CompanyProfile data={data} />}
      {data.history && <CompanyHistory data={data.history} />}
      {data.team?.length > 0 && <TeamMembers data={data.team} />}
      {data.impact && <CompanyImpact data={data.impact} />}
      {data.partners?.length > 0 && <Partners data={data.partners} />}
    </div>
  );
};

export default AboutPage;