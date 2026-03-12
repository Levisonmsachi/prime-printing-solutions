import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { getContactData, submitContactForm } from "../services/api";

import ContactIntro from "../components/contact/ContactIntro";
import ContactInfo from "../components/contact/ContactInfo";
import OfficeLocations from "../components/contact/OfficeLocations";
import ContactForm from "../components/contact/ContactForm";
import ContactCTA from "../components/contact/ContactCTA";

const ContactPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getContactData()
      .then((res) => {
        console.log("Contact API Response:", res);
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load contact page", err);
        setError("Failed to load contact page");
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
      {data.intro && <ContactIntro data={data.intro} />}
      {data.info && <ContactInfo data={data.info} />}
      {data.locations?.length > 0 && <OfficeLocations data={data.locations} />}
      {data.form_settings && <ContactForm data={data.form_settings} />}
      {data.cta && <ContactCTA data={data.cta} />}
    </div>
  );
};

export default ContactPage;