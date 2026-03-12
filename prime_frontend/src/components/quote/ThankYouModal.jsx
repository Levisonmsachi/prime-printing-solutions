import { CheckCircle } from "lucide-react";

const ThankYouModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white max-w-md w-full p-8 rounded-xl shadow-2xl text-center">
        <CheckCircle className="w-14 h-14 text-green-600 mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-[#111111] mb-2">
          Quote Request Sent
        </h2>

        <p className="text-[#111111]/70 mb-6">
          Thank you for reaching out. Our team will review your request and get
          back to you within 24 hours.
        </p>

        <button
          onClick={onClose}
          className="bg-[#1E88C8] hover:bg-[#1976B2] text-white px-6 py-3 rounded-lg font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ThankYouModal;
