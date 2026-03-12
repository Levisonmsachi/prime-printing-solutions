import { MapPin, Phone, Mail, Navigation, Building2 } from "lucide-react";

const OfficeLocations = ({ data }) => {
  const location = data?.[0]; // Displaying only the first location for now

  if (!location) return null;

  return (
    <section className="relative py-20 bg-linear-to-br from-white via-slate-50 to-blue-50 overflow-hidden">

      {/* Subtle texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%231E88C8%22%20fill-opacity%3D%220.035%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/svg%3E')] opacity-40" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Header */}
        <span className="inline-flex items-center gap-2 px-5 py-2 mb-6 text-sm font-semibold tracking-widest uppercase rounded-full bg-[#1E88C8]/10 text-[#1E88C8]">
          <Building2 className="w-4 h-4" />
          Head Office
        </span>

        <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-6">
          Visit Our Office
        </h2>

        <p className="text-lg text-[#111111]/65 max-w-2xl mx-auto mb-12 leading-relaxed">
          Our team operates from a single, fully equipped headquarters where all production, quality control, and client consultations take place.
        </p>

        {/* Office Card */}
        <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-xl text-left max-w-3xl mx-auto">

          {/* Office Name */}
          <h3 className="text-2xl font-bold text-[#111111] mb-6 text-center">
            {location.name}
          </h3>

          {/* Address */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#1E88C8]/10 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-[#1E88C8]" />
            </div>
            <div className="text-sm text-[#111111]/75 leading-relaxed">
              <div className="font-medium text-[#111111] mb-1">
                {location.address}
              </div>
              <div>
                {location.city}, {location.state} {location.zip_code}
              </div>
              <div>{location.country}</div>
            </div>
          </div>

          {/* Contact */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {location.phone && (
              <a
                href={`tel:${location.phone}`}
                className="flex items-center gap-3 text-sm font-medium text-[#111111] hover:text-[#1E88C8] transition-colors"
              >
                <Phone className="w-5 h-5 text-[#1E88C8]" />
                {location.phone}
              </a>
            )}

            {location.email && (
              <a
                href={`mailto:${location.email}`}
                className="flex items-center gap-3 text-sm font-medium text-[#111111] hover:text-[#1E88C8] transition-colors break-all"
              >
                <Mail className="w-5 h-5 text-[#1E88C8]" />
                {location.email}
              </a>
            )}
          </div>

          {/* Directions */}
          <div className="text-center">
            <button className="inline-flex items-center px-8 py-4 bg-linear-to-r from-[#1E88C8] to-[#1976B2] text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-[#1E88C8]/25 transition-all duration-300 transform hover:-translate-y-1">
              <Navigation className="w-5 h-5 mr-2" />
              Get Directions
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OfficeLocations;
