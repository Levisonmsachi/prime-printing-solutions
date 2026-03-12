import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";

const ContactInfo = ({ data }) => {
  return (
    <section className="relative py-20 bg-linear-to-br from-slate-50 via-white to-blue-50">
      
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%231E88C8%22%20fill-opacity%3D%220.035%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/svg%3E')] opacity-40" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-5 py-2 mb-6 text-sm font-semibold tracking-widest uppercase rounded-full bg-[#1E88C8]/10 text-[#1E88C8]">
            <MessageSquare className="w-4 h-4" />
            Contact Details
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4">
            How to Reach Us
          </h2>

          <p className="text-lg text-[#111111]/65 max-w-3xl mx-auto leading-relaxed">
            For inquiries, consultations, or project discussions, use the contact details below to connect directly with our team.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Phone */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#1E88C8]/10 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-[#1E88C8]" />
            </div>
            <h3 className="text-base font-semibold text-[#111111] mb-2">
              Phone
            </h3>
            <a
              href={`tel:${data.phone}`}
              className="text-[#1E88C8] font-medium hover:underline"
            >
              {data.phone}
            </a>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#1E88C8]/10 flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-[#1E88C8]" />
            </div>
            <h3 className="text-base font-semibold text-[#111111] mb-2">
              Email
            </h3>
            <a
              href={`mailto:${data.email}`}
              className="text-[#1E88C8] font-medium hover:underline break-all"
            >
              {data.email}
            </a>
          </div>

          {/* Address */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#1E88C8]/10 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-[#1E88C8]" />
            </div>
            <h3 className="text-base font-semibold text-[#111111] mb-2">
              Address
            </h3>
            <div className="text-sm text-[#111111]/70 leading-relaxed">
              {data.address.split("\n").map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#1E88C8]/10 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-[#1E88C8]" />
            </div>
            <h3 className="text-base font-semibold text-[#111111] mb-2">
              Business Hours
            </h3>
            <div className="text-sm text-[#111111]/70 leading-relaxed">
              {data.business_hours.split("\n").map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
