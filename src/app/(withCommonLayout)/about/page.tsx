import React from "react";
import { FaUsers, FaHandshake, FaRocket, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";

const teams = [
  {
    userName: "Alice Johnson",
    position: "Lead Frontend Developer",
    image: "https://placehold.co/120x120/A78BFA/FFFFFF?text=AJ",
    id: 1,
  },
  {
    userName: "Bob Williams",
    position: "Lead Backend Developer",
    image: "https://placehold.co/120x120/60A5FA/FFFFFF?text=BW",
    id: 2,
  },
  {
    userName: "Charlie Brown",
    position: "UI/UX Designer",
    image: "https://placehold.co/120x120/FBBF24/FFFFFF?text=CB",
    id: 3,
  },
  {
    userName: "Diana Prince",
    position: "DevOps Engineer",
    image: "https://placehold.co/120x120/EC4899/FFFFFF?text=DP",
    id: 4,
  },
  {
    userName: "Eve Davis",
    position: "Content Strategist",
    image: "https://placehold.co/120x120/34D399/FFFFFF?text=ED",
    id: 5,
  },
  {
    userName: "Frank White",
    position: "Community Manager",
    image: "https://placehold.co/120x120/8B5CF6/FFFFFF?text=FW",
    id: 6,
  },
];

const AboutUsPage = () => {
  return (
    <div className="bg-gray-50 dark:bg-black text-gray-900 dark:text-white min-h-screen p-4 sm:p-6 lg:p-8">
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">
          About Tech Tips & Tricks Hub
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Your ultimate resource for navigating and mastering the ever-evolving
          world of technology. We empower tech enthusiasts with expert advice,
          practical tutorials, and a vibrant community.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 text-center flex flex-col items-center">
          <FaRocket className="text-blue-500 dark:text-blue-400 text-4xl sm:text-5xl mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            To empower tech enthusiasts with reliable, easy-to-understand tips
            and tricks, fostering a community where knowledge is shared and
            digital lives are enhanced.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 text-center flex flex-col items-center">
          <FaHandshake className="text-green-500 dark:text-green-400 text-4xl sm:text-5xl mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Our Vision
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            We envision a future where everyone, regardless of their technical
            background, can confidently navigate and innovate within the digital
            landscape.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 text-center flex flex-col items-center">
          <FaMapMarkerAlt className="text-purple-500 dark:text-purple-400 text-4xl sm:text-5xl mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Our Location
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            Find us at the heart of innovation, fostering a global community
            online. Our digital doors are always open!
          </p>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 text-center mb-8">
        <FaUsers className="text-blue-500 dark:text-blue-400 text-4xl sm:text-5xl mx-auto mb-4" />
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Meet Our Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams?.map((team) => (
            <div
              key={team.id}
              className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow-inner border border-gray-100 dark:border-gray-700 transition-transform duration-200 hover:scale-105"
            >
              <Image
                alt={team.userName}
                className="size-28 sm:size-32 object-cover rounded-full mx-auto mb-4 border-4 border-blue-100 dark:border-blue-900 shadow-md"
                height={120}
                src={team.image}
                width={120}
              />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {team.userName}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-base">
                {team.position}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
