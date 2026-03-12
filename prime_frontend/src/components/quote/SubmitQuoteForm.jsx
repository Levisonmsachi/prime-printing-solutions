import React, { useState } from "react";
import { Briefcase, Calendar, CheckCircle, AlertCircle, Upload, User, Mail, Phone, Package, FileText, MessageSquare, Hash, Clock, Send, ArrowRight } from "lucide-react";
import { submitQuote } from "../../services/api";

const SubmitQuoteForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project_type: "",    
    description: "",     
    quantity: "",
    deadline: "",
    attachment: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          attachment: "File must be less than 10MB",
        }));
        return;
      }
      setFormData((prev) => ({ ...prev, attachment: file }));
      setErrors(prev => ({ ...prev, attachment: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.project_type.trim()) newErrors.project_type = "Project type is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const sendData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          sendData.append(key, formData[key]);
        }
      });
      
      await submitQuote(sendData);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        project_type: "",
        description: "",
        quantity: "",
        deadline: "",
        attachment: null,
      });
      const fileInput = document.getElementById("attachment");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-16 bg-white  overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#1E88C8]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#1976B2]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 mb-6 bg-[#1E88C8]/10 backdrop-blur-sm rounded-full border border-[#1E88C8]/20">
            <Briefcase className="w-5 h-5 text-[#1E88C8]" />
            <span className="text-sm font-semibold text-[#1E88C8] tracking-wide">
              Request a Quote
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111] leading-tight mb-4">
            Get Your Custom Quote
          </h2>
          
          <p className="text-lg md:text-xl text-[#111111]/70 max-w-3xl mx-auto leading-relaxed">
            Provide details about your printing project and we'll send you a customized quote within 24 hours.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            {/* Name and Email Row */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="relative">
                <label className="block text-sm font-semibold text-[#111111] mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1E88C8]/20 focus:border-[#1E88C8] transition-all duration-300 text-[#111111] placeholder-gray-500 ${
                      errors.name ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50 hover:border-gray-400"
                    }`}
                    placeholder="Your full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-[#111111] mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1E88C8]/20 focus:border-[#1E88C8] transition-all duration-300 text-[#111111] placeholder-gray-500 ${
                      errors.email ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50 hover:border-gray-400"
                    }`}
                    placeholder="your.email@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Phone and Project Type Row */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="relative">
                <label className="block text-sm font-semibold text-[#111111] mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#1E88C8]/20 focus:border-[#1E88C8] hover:border-gray-400 transition-all duration-300 text-[#111111] placeholder-gray-500"
                    placeholder="+265 123 456 789"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-[#111111] mb-2">
                  Project Type *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Package className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="project_type"
                    value={formData.project_type}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1E88C8]/20 focus:border-[#1E88C8] transition-all duration-300 text-[#111111] placeholder-gray-500 ${
                      errors.project_type ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50 hover:border-gray-400"
                    }`}
                    placeholder="e.g. Business cards, banners, packaging"
                  />
                </div>
                {errors.project_type && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.project_type}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#111111] mb-2">
                Project Description *
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                  <MessageSquare className="w-5 h-5 text-gray-400 mt-0.5" />
                </div>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1E88C8]/20 focus:border-[#1E88C8] transition-all duration-300 text-[#111111] placeholder-gray-500 resize-none ${
                    errors.description ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50 hover:border-gray-400"
                  }`}
                  placeholder="Tell us about your project requirements, specifications, and any special requests..."
                />
              </div>
              {errors.description && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.description}
                </p>
              )}
            </div>

            {/* Quantity and Deadline Row */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="relative">
                <label className="block text-sm font-semibold text-[#111111] mb-2">
                  Quantity *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Hash className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1E88C8]/20 focus:border-[#1E88C8] transition-all duration-300 text-[#111111] placeholder-gray-500 ${
                      errors.quantity ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50 hover:border-gray-400"
                    }`}
                    placeholder="e.g. 10, 50, 100"
                  />
                </div>
                {errors.quantity && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.quantity}
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-[#111111] mb-2">
                  Preferred Deadline
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#1E88C8]/20 focus:border-[#1E88C8] hover:border-gray-400 transition-all duration-300 text-[#111111]"
                  />
                </div>
              </div>
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label htmlFor="attachment" className="block text-sm font-semibold text-[#111111] mb-2">
                Upload Reference File (optional)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  id="attachment"
                  onChange={handleFile}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.psd,.ai,.eps,.cdr"
                />
                <label
                  htmlFor="attachment"
                  className="flex items-center px-5 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#1E88C8] hover:bg-[#1E88C8]/5 transition-all duration-300"
                >
                  <Upload className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-gray-600 font-medium">Choose File</span>
                </label>
                {formData.attachment && (
                  <div className="flex items-center px-3 py-2 bg-[#1E88C8]/10 rounded-lg">
                    <FileText className="w-4 h-4 mr-2 text-[#1E88C8]" />
                    <span className="text-sm text-[#1E88C8] font-medium">
                      {formData.attachment.name}
                    </span>
                  </div>
                )}
              </div>
              {errors.attachment && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.attachment}
                </p>
              )}
              <p className="mt-2 text-xs text-gray-500">
                Accepted formats: PDF, DOC, JPG, PNG, PSD, AI, EPS, CDR. Max size: 10MB
              </p>
            </div>

            {/* Submit Status */}
            {submitStatus === "success" && (
              <div className="flex items-center p-4 bg-green-50 border-2 border-green-200 rounded-xl mb-6">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 shrink-0" />
                <div>
                  <p className="text-green-800 font-semibold">Quote Request Submitted!</p>
                  <p className="text-green-700 text-sm mt-1">
                    Thank you! We'll review your project and send you a detailed quote within 24 hours.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="flex items-center p-4 bg-red-50 border-2 border-red-200 rounded-xl mb-6">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3 shrink-0" />
                <div>
                  <p className="text-red-800 font-semibold">Error Submitting Quote Request</p>
                  <p className="text-red-700 text-sm mt-1">Please try again or contact us directly for assistance.</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-3 px-10 py-4 bg-[#1E88C8] text-white font-bold rounded-xl hover:bg-[#1976B2] hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing Request...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Quote Request
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Divider */}
        <div className="flex justify-center mt-12">
          <div className="w-32 h-1 bg-linear-to-r from-transparent via-[#1E88C8] to-transparent rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default SubmitQuoteForm;