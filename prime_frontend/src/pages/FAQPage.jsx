import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  Printer, 
  Clock, 
  Shield, 
  Package,
  Truck,
  CreditCard,
  RefreshCw,
  ArrowLeft
} from "lucide-react";

const FAQPage = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqCategories = [
    {
      id: "general",
      title: "General Questions",
      icon: <HelpCircle className="w-5 h-5" />,
      questions: [
        {
          id: 1,
          question: "What types of printing services do you offer?",
          answer: "We offer a comprehensive range of printing services including business cards, brochures, flyers, banners, product packaging, labels, custom stickers, booklets, catalogs, large format printing, and trade show materials. We also provide custom design services for all your printing needs.",
          tags: ["Services", "Printing Types"]
        },
        {
          id: 2,
          question: "Where are you located and do you ship nationwide?",
          answer: "Our main office and production facility is located in Area 51/B, Lilongwe, Malawi. Yes, we offer nationwide shipping to all regions. We partner with reliable logistics providers to ensure your printed materials reach you safely and on time.",
          tags: ["Location", "Shipping"]
        },
        {
          id: 3,
          question: "What are your business hours?",
          answer: "We operate from 6:00 AM to 9:00 PM, Monday through Saturday. Our online quote system is available 24/7. For urgent projects outside these hours, please contact us directly at +265 996 678 548.",
          tags: ["Hours", "Contact"]
        }
      ]
    },
    {
      id: "orders",
      title: "Orders & Quotes",
      icon: <Package className="w-5 h-5" />,
      questions: [
        {
          id: 4,
          question: "How do I request a quote?",
          answer: "You can request a quote through our online form, by emailing us at primeprintsolutions25@outlook.com, or by calling +265 996 678 548. For the fastest response, use our online quote form with your project specifications. We typically respond within 24 hours.",
          tags: ["Quotes", "Pricing"]
        },
        {
          id: 5,
          question: "What information do I need to provide for a quote?",
          answer: "For an accurate quote, please provide: project type, quantity, dimensions, paper/material preferences, colors (CMYK or Pantone), finishing options (lamination, coating, etc.), artwork files, and your deadline. The more details you provide, the more accurate our quote will be.",
          tags: ["Requirements", "Specifications"]
        },
        {
          id: 6,
          question: "How long does it take to get a quote?",
          answer: "We provide initial quotes within 4-6 business hours for standard projects. Complex projects may take up to 24 hours. Rush quotes are available for urgent projects - please indicate this in your request.",
          tags: ["Timeline", "Response Time"]
        },
        {
          id: 7,
          question: "Can I modify my order after submitting it?",
          answer: "Order modifications are possible before production begins. Once production has started, changes may incur additional fees or require a new order. Contact our customer service team immediately if you need to modify your order.",
          tags: ["Changes", "Modifications"]
        }
      ]
    },
    {
      id: "production",
      title: "Production & Quality",
      icon: <Printer className="w-5 h-5" />,
      questions: [
        {
          id: 8,
          question: "What file formats do you accept?",
          answer: "We accept PDF, AI, EPS, PSD, TIFF, JPG, PNG, and CDR files. For best results, please provide print-ready PDF files with embedded fonts and 300 DPI resolution. Our design team can also help prepare your files if needed.",
          tags: ["Files", "Formats"]
        },
        {
          id: 9,
          question: "Do you offer design services?",
          answer: "Yes! We have an in-house design team that can create custom designs or modify your existing artwork. Design services are billed separately and include up to 3 rounds of revisions. Ask about our design packages when requesting your quote.",
          tags: ["Design", "Services"]
        },
        {
          id: 10,
          question: "What is your typical production timeline?",
          answer: "Production timelines vary by project complexity and quantity. Standard projects typically take 3-5 business days for production. Rush services are available for an additional fee. We'll provide a detailed timeline with your quote.",
          tags: ["Timeline", "Production"]
        },
        {
          id: 11,
          question: "How do you ensure print quality?",
          answer: "We use state-of-the-art printing equipment, conduct quality checks at every production stage, and provide digital proofs for approval before final printing. Our team follows strict quality control procedures to ensure your materials meet our high standards.",
          tags: ["Quality", "Standards"]
        }
      ]
    },
    {
      id: "shipping",
      title: "Shipping & Delivery",
      icon: <Truck className="w-5 h-5" />,
      questions: [
        {
          id: 12,
          question: "What shipping options do you offer?",
          answer: "We dont offer shipping services directly. However, we partner with reliable courier services to deliver your orders nationwide. Shipping costs and delivery times vary based on location and courier choice. We provide estimated shipping details with your order confirmation.",
          tags: ["Delivery", "Shipping Options"]
        },
        {
          id: 13,
          question: "Do you offer international shipping?",
          answer: "No, we dont offer international shipping to other countries. We currently only ship within Malawi. For international orders, please contact us to discuss potential solutions.",
          tags: ["International", "Global"]
        },
        {
          id: 14,
          question: "How are my printed materials packaged?",
          answer: "We carefully package all orders using appropriate materials to prevent damage during shipping. Posters and large prints are rolled in sturdy tubes, while smaller items are packed in corrugated boxes with protective padding.",
          tags: ["Packaging", "Protection"]
        }
      ]
    },
    {
      id: "payment",
      title: "Payment & Returns",
      icon: <CreditCard className="w-5 h-5" />,
      questions: [
        {
          id: 15,
          question: "What payment methods do you accept?",
          answer: "We accept bank transfers, credit/debit cards (Visa, MasterCard), mobile money, and cash payments. For large orders, we may require a 50% deposit with the balance due before shipment. All prices are in Malawi Kwacha.",
          tags: ["Payment", "Methods"]
        },
        {
          id: 16,
          question: "What is your return policy?",
          answer: "We stand behind our quality. If there's an error on our part, we'll reprint your order at no cost. Due to the custom nature of printing, we cannot accept returns for standard orders. Please review proofs carefully before final production.",
          tags: ["Returns", "Warranty"]
        },
        {
          id: 17,
          question: "Do you offer volume discounts?",
          answer: "Yes! We offer tiered pricing for bulk orders. Discounts start at quantities of 500+ and increase with larger orders. Contact our sales team for custom pricing on large volume projects.",
          tags: ["Discounts", "Volume"]
        }
      ]
    }
  ];

  const quickQuestions = [
    {
      icon: <Clock className="w-4 h-4" />,
      text: "What's your average turnaround time?"
    },
    {
      icon: <Shield className="w-4 h-4" />,
      text: "Do you offer design services?"
    },
    {
      icon: <RefreshCw className="w-4 h-4" />,
      text: "Can I get a sample before ordering?"
    },
    {
      icon: <Package className="w-4 h-4" />,
      text: "What materials do you work with?"
    }
  ];

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="relative py-20 bg-linear-to-br from-white via-[#F9F9F9] to-[#F0F7FF] overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#1E88C8]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#1976B2]/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Navigation */}
            <div className="mb-12">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[#1E88C8] hover:text-[#1976B2] font-medium transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </div>

            {/* Header Content */}
            <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-[#1E88C8]/10 backdrop-blur-sm rounded-full border border-[#1E88C8]/20">
              <HelpCircle className="w-5 h-5 text-[#1E88C8]" />
              <span className="text-sm font-semibold text-[#1E88C8] tracking-wide uppercase">
                Frequently Asked Questions
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#111111] leading-tight mb-6">
              Find Answers to
              <span className="block mt-4 text-transparent bg-clip-text bg-linear-to-r from-[#1E88C8] to-[#1976B2]">
                Your Questions
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#111111]/70 max-w-3xl mx-auto mb-10 leading-relaxed">
              Get instant answers to common questions about our printing services, ordering process, 
              production timelines, and more. Can't find what you're looking for? Contact our team.
            </p>

            {/* Quick Questions */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {quickQuestions.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200 hover:border-[#1E88C8]/30 transition-colors"
                >
                  {item.icon}
                  <span className="text-sm text-[#111111]/70">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for answers..."
                  className="w-full px-6 py-4 pl-12 bg-white rounded-xl border-2 border-gray-300 focus:border-[#1E88C8] focus:ring-2 focus:ring-[#1E88C8]/20 outline-none transition-all duration-300"
                />
                <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#1E88C8] text-white rounded-lg hover:bg-[#1976B2] transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main FAQ Content */}
      <div className="relative py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* FAQ Categories */}
          <div className="space-y-12">
            {faqCategories.map((category) => (
              <div key={category.id} className="scroll-mt-24" id={category.id}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-[#1E88C8]/10 rounded-lg text-[#1E88C8]">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-[#111111]">
                    {category.title}
                  </h2>
                </div>

                <div className="space-y-4">
                  {category.questions.map((item) => (
                    <div
                      key={item.id}
                      className="group bg-white rounded-xl border border-gray-200 hover:border-[#1E88C8]/30 hover:shadow-md transition-all duration-300 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(item.id)}
                        className="w-full flex items-center justify-between p-6 text-left"
                      >
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-[#111111] group-hover:text-[#1E88C8] transition-colors">
                            {item.question}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="ml-4 shrink-0">
                          {openQuestion === item.id ? (
                            <ChevronUp className="w-5 h-5 text-[#1E88C8]" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#1E88C8]" />
                          )}
                        </div>
                      </button>

                      {openQuestion === item.id && (
                        <div className="px-6 pb-6 pt-2 border-t border-gray-100 animate-fadeIn">
                          <p className="text-[#111111]/70 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Category Navigation */}
          <div className="mt-16">
            <h3 className="text-xl font-bold text-[#111111] mb-6 text-center">
              Jump to Category
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {faqCategories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="inline-flex items-center gap-2 px-4 py-3 bg-[#1E88C8]/5 hover:bg-[#1E88C8]/10 rounded-xl border border-[#1E88C8]/20 hover:border-[#1E88C8]/30 transition-all duration-300 group"
                >
                  <span className="text-[#1E88C8]">{category.icon}</span>
                  <span className="font-medium text-[#111111] group-hover:text-[#1E88C8]">
                    {category.title}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Still Have Questions */}
          <div className="mt-20 bg-linear-to-r from-[#1E88C8]/5 to-[#1976B2]/5 rounded-2xl p-8 border border-[#1E88C8]/20">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 mb-6 bg-white/50 backdrop-blur-sm rounded-full border border-white/20">
                <MessageCircle className="w-5 h-5 text-[#1E88C8]" />
                <span className="text-sm font-semibold text-[#1E88C8] tracking-wide">
                  Still Have Questions?
                </span>
              </div>

              <h2 className="text-3xl font-bold text-[#111111] mb-4">
                Can't Find Your Answer?
              </h2>
              <p className="text-lg text-[#111111]/70 max-w-2xl mx-auto mb-8 leading-relaxed">
                Our team is ready to help with any questions about your printing project. 
                Get in touch for personalized assistance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+265996678548"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#1E88C8] text-white font-bold rounded-xl hover:bg-[#1976B2] hover:shadow-lg transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  Call Us Now
                </a>
                <a
                  href="mailto:primeprintsolutions25@outlook.com"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1E88C8] font-bold rounded-xl border-2 border-[#1E88C8] hover:bg-[#1E88C8]/5 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                  Send Email
                </a>
              </div>

              <p className="text-sm text-[#111111]/60 mt-8">
                Average response time: <span className="font-semibold text-[#1E88C8]">Within 4 hours</span>
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1E88C8] mb-2">24h</div>
              <div className="text-sm text-[#111111]/60">Quote Response</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1E88C8] mb-2">98%</div>
              <div className="text-sm text-[#111111]/60">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1E88C8] mb-2">3-5</div>
              <div className="text-sm text-[#111111]/60">Avg. Production Days</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1E88C8] mb-2">100+</div>
              <div className="text-sm text-[#111111]/60">Projects Monthly</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-[#111111]/60">
              PrimePrint Solutions &copy; {new Date().getFullYear()} • Frequently Updated FAQ
            </div>
            <div className="flex items-center gap-6">
              <Link to="/contact" className="text-sm text-[#111111]/60 hover:text-[#1E88C8]">
                Contact Support
              </Link>
              <Link to="/services" className="text-sm text-[#111111]/60 hover:text-[#1E88C8]">
                View Services
              </Link>
              <a 
                href={`tel:+265996678548`}
                className="text-sm text-[#111111]/60 hover:text-[#1E88C8]"
              >
                +265 996 678 548
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;