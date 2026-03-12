const CallToAction = ({ data }) => {
  if (!data) return null;

  return (
    <section className="bg-[#1E88C8] py-20 text-center px-6 mb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          {data.message}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={data.button_link || data.default_button_link}
            className="inline-block bg-white text-[#1E88C8] hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition duration-300"
          >
            {data.button_text}
          </a>
          <a
            href="/contact"
            className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1E88C8] font-semibold py-3 px-8 rounded-lg transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;