"use client"
import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaTwitter, FaGithub, FaDiscord, FaSlack, FaRocket, FaCode, FaBrain, FaUsers } from "react-icons/fa";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const contactMethods = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email Us",
      description: "Get in touch for collaborations or support",
      contact: "hello@techtipshub.dev",
      gradient: "from-blue-500 to-purple-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: <FaTwitter className="text-2xl" />,
      title: "Follow on Twitter",
      description: "Join the conversation and stay updated",
      contact: "@TechTipsHub",
      gradient: "from-cyan-500 to-blue-600",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20"
    },
    {
      icon: <FaDiscord className="text-2xl" />,
      title: "Discord Community",
      description: "Real-time discussions with fellow developers",
      contact: "discord.gg/techtipshub",
      gradient: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20"
    }
  ];

  const quickTopics = [
    {
      icon: <FaBrain className="text-xl" />,
      topic: "AI & Machine Learning",
      description: "Questions about neural networks, frameworks, or implementations"
    },
    {
      icon: <FaCode className="text-xl" />,
      topic: "Web Development",
      description: "Frontend, backend, frameworks, or deployment strategies"
    },
    {
      icon: <FaRocket className="text-xl" />,
      topic: "Career Advice",
      description: "Tech career guidance, interview prep, or industry insights"
    },
    {
      icon: <FaUsers className="text-xl" />,
      topic: "Community",
      description: "Collaborations, guest posts, or community partnerships"
    }
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25 bg-[size:20px_20px] opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-3 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>We're here to help</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                Get in Touch
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Have a tech question? Want to contribute? Or just want to connect with our community? 
              We'd love to hear from you and help you on your coding journey.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Topic Selection */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              What can we help you with?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Select a topic that best matches your inquiry
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickTopics.map(({ icon, topic, description }, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 group"
              >
                <div className="text-blue-500 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {icon}
                </div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                  {topic}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 lg:p-10">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  Send us a message
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your question, feedback, or how we can help you..."
                    className="w-full resize-y rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  Other ways to reach us
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Choose your preferred communication method
                </p>
              </div>

              {contactMethods.map(({ icon, title, description, contact, gradient, bgColor }, idx) => (
                <div
                  key={idx}
                  className={`${bgColor} rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group cursor-pointer hover:scale-105`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 bg-gradient-to-r ${gradient} text-white rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                      {icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                        {title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {description}
                      </p>
                      <p className={`font-medium bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                        {contact}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Community Links */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
                <p className="text-blue-100 mb-6">
                  Connect with thousands of developers sharing knowledge and building the future together.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors group">
                    <FaGithub className="text-xl group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors group">
                    <FaTwitter className="text-xl group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors group">
                    <FaDiscord className="text-xl group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors group">
                    <FaSlack className="text-xl group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Need immediate help?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Check out our knowledge base for instant answers to common questions
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <strong className="text-blue-600 dark:text-blue-400">Getting Started</strong>
              <p className="text-gray-600 dark:text-gray-300 mt-1">New to the community?</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <strong className="text-purple-600 dark:text-purple-400">Contributing</strong>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Want to share your knowledge?</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <strong className="text-teal-600 dark:text-teal-400">Technical Support</strong>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Having technical issues?</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUsPage;