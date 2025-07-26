import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUsPage = () => {
  return (
    <div className="bg-gray-50 dark:bg-black text-gray-900 dark:text-white min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have questions, feedback, or just want to chat about tech? We&apos;d
            love to hear from you!
          </p>
        </div>

        {/* Contact Form & Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-5">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  id="name"
                  placeholder="Your full name"
                  type="text"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  id="email"
                  placeholder="Your email address"
                  type="email"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  htmlFor="message"
                >
                  Your Message
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-y"
                  id="message"
                  placeholder="Tell us what's on your mind..."
                  rows={5}
                />
              </div>
              <button
                className="w-full py-3 px-4 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 dark:bg-blue-600 dark:hover:bg-blue-700"
                type="submit"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-500 dark:bg-blue-700 p-6 sm:p-8 rounded-2xl shadow-xl text-white flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">Reach Out to Us</h2>
              <p className="mb-6 text-blue-100 dark:text-blue-200 leading-relaxed">
                We&apos;re here to help! Connect with our team through the
                following channels.
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-blue-100 dark:text-blue-200">
                  <FaPhoneAlt className="text-2xl mr-4 flex-shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-blue-100 dark:text-blue-200">
                  <FaEnvelope className="text-2xl mr-4 flex-shrink-0" />
                  <span>support@techtips.com</span>
                </div>
                <div className="flex items-center text-blue-100 dark:text-blue-200">
                  <FaMapMarkerAlt className="text-2xl mr-4 flex-shrink-0" />
                  <span>101 Tech Avenue, Innovation City, TX 78701</span>
                </div>
              </div>
            </div>
            {/* Optional: Add social media links here if desired */}
            {/*
            <div className="mt-8 pt-6 border-t border-blue-400 dark:border-blue-600">
              <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-blue-200 transition-colors"><FaTwitter className="text-2xl" /></a>
                <a href="#" className="text-white hover:text-blue-200 transition-colors"><FaLinkedinIn className="text-2xl" /></a>
                <a href="#" className="text-white hover:text-blue-200 transition-colors"><FaGithub className="text-2xl" /></a>
              </div>
            </div>
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
