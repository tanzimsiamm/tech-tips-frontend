import Image from "next/image";
import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

const eventsData: Event[] = [
  {
    id: 1,
    title: "Web Dev Summit: Future of Frontend",
    date: "September 5, 2024",
    location: "Virtual Event",
    description:
      "Explore cutting-edge frontend technologies, frameworks, and best practices. Featuring talks on React 19, Vue 4, and WebAssembly.",
    image: "https://placehold.co/600x400/1DA1F2/FFFFFF?text=Frontend+Summit",
  },
  {
    id: 2,
    title: "AI Ethics & Governance Forum",
    date: "October 18, 2024",
    location: "Berlin, Germany",
    description:
      "A critical discussion on the ethical implications of AI, regulatory frameworks, and building responsible AI systems for the future.",
    image: "https://placehold.co/600x400/22C55E/FFFFFF?text=AI+Ethics+Forum",
  },
  {
    id: 3,
    title: "Cybersecurity Conclave 2024",
    date: "November 22, 2024",
    location: "Singapore",
    description:
      "Dive deep into advanced cybersecurity threats, defense strategies, and digital forensics. Network with leading security experts and practitioners.",
    image:
      "https://placehold.co/600x400/EF4444/FFFFFF?text=Cybersecurity+Conclave",
  },
  {
    id: 4,
    title: "Cloud Native & DevOps Days",
    date: "December 1, 2024",
    location: "Austin, TX",
    description:
      "Learn about the latest in cloud-native development, Kubernetes, serverless architectures, and optimizing DevOps pipelines.",
    image: "https://placehold.co/600x400/F97316/FFFFFF?text=Cloud+DevOps",
  },
];

const LatestEventsPage = () => {
  return (
    <div className="bg-gray-50 dark:bg-black text-gray-900 dark:text-white min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
          Upcoming Tech Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {eventsData.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform duration-200 hover:scale-[1.02]"
            >
              <Image
                alt={event.title}
                className="w-full h-48 object-cover"
                height={400}
                src={event.image}
                width={600}
              />
              <div className="p-5 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                  {event.title}
                </h3>

                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
                  <FaCalendarAlt className="mr-2 text-blue-500 dark:text-blue-400" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-4">
                  <FaMapMarkerAlt className="mr-2 text-blue-500 dark:text-blue-400" />
                  <span>{event.location}</span>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-5">
                  {event.description}
                </p>

                <button className="w-full py-2.5 px-4 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 dark:bg-blue-600 dark:hover:bg-blue-700">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestEventsPage;
