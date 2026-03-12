import { useEffect, useState } from "react";
import { getCertificationsData } from "../services/api";

import CertificationsIntro from "../components/certifications/CertificationsIntro";
import CertificationsGrid from "../components/certifications/CertificationsGrid";
import CertificationsNotice from "../components/certifications/CertificationsNotice";
import CertificationsCTA from "../components/certifications/CertificationsCTA";

const CertificationsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCertificationsData()
      .then((res) => {
        console.log("Certifications API Response:", res);
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load certifications page", err);
        setError("Failed to load certifications page");
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
      {data.intro && <CertificationsIntro data={data.intro} />}
      {data.certifications?.length > 0 && <CertificationsGrid data={data.certifications} />}
      {data.notice && <CertificationsNotice data={data.notice} />}
      {data.cta && <CertificationsCTA data={data.cta} />}
    </div>
  );
};

export default CertificationsPage;