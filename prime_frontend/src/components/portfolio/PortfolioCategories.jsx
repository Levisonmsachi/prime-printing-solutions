const PortfolioCategories = ({ data }) => {
  const cardColors = [
    { 
      bg: "bg-white",
      iconBg: "bg-[#1E88C8]/10",
      iconColor: "text-[#1E88C8]",
      border: "border border-[#1E88C8]/15",
      hoverBorder: "hover:border-[#1E88C8]/40",
    },
    { 
      bg: "bg-[#F6F4EE]",
      iconBg: "bg-[#E91E78]/10",
      iconColor: "text-[#E91E78]",
      border: "border border-[#E91E78]/15",
      hoverBorder: "hover:border-[#E91E78]/40",
    },
    { 
      bg: "bg-white",
      iconBg: "bg-[#111111]/10",
      iconColor: "text-[#111111]",
      border: "border border-[#111111]/15",
      hoverBorder: "hover:border-[#1E88C8]/40",
    },
    { 
      bg: "bg-[#F6F4EE]",
      iconBg: "bg-[#111111]/10",
      iconColor: "text-[#111111]",
      border: "border border-[#111111]/15",
      hoverBorder: "hover:border-[#111111]/40",
    }
  ];

  const limitedCategories = data.slice(0, 8);

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-5 py-2 bg-[#1E88C8]/10 text-[#1E88C8] text-sm font-semibold rounded-full mb-6">
            OUR PORTFOLIO
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6">
            Explore Our <span className="text-[#1E88C8]">Project</span> Categories
          </h2>

          <div className="w-20 h-1 bg-[#1E88C8] mx-auto mb-6 rounded-full"></div>

          <p className="text-lg text-[#111111]/70 max-w-2xl mx-auto">
            Discover our expertise across specialized categories, each representing a unique aspect of our printing and design capabilities.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {limitedCategories.map((category, index) => {
            const colors = cardColors[index % cardColors.length];

            return (
              <div
                key={category.id}
                style={{ animationDelay: `${index * 120}ms` }}
                className={`
                  ${colors.bg}
                  ${colors.border}
                  ${colors.hoverBorder}
                  rounded-3xl
                  p-8
                  text-center
                  shadow-md
                  hover:shadow-xl
                  transition-all
                  duration-500
                  group
                  hover:-translate-y-1.5
                  opacity-0
                  animate-card
                `}
              >
                {/* Icon */}
                <div
                  className={`
                    w-20 h-20
                    ${colors.iconBg}
                    rounded-2xl
                    flex items-center justify-center
                    mx-auto mb-6
                    backdrop-blur-sm
                    transition-all
                    duration-500
                    group-hover:scale-110
                  `}
                >
                  <span
                    className={`
                      text-3xl font-bold
                      ${colors.iconColor}
                      transition-transform
                      duration-500
                      group-hover:scale-125
                    `}
                  >
                    {category.name.charAt(0)}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-lg font-semibold text-[#111111] mb-1">
                  {category.name}
                </h3>

                {/* Helper text */}
                <p className="text-sm text-[#111111]/50">
                  View projects →
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer Line */}
        <div className="mt-20 text-center">
          <div className="w-28 h-0.5 bg-linear-to-r from-transparent via-[#1E88C8] to-transparent mx-auto"></div>
        </div>

      </div>

      {/* Animation styles */}
      <style>
        {`
          @keyframes cardFadeUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-card {
            animation: cardFadeUp 0.6s ease-out forwards;
          }
        `}
      </style>
    </section>
  );
};

export default PortfolioCategories;
