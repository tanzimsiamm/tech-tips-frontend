"use client"
import React, { useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers, FaExternalLinkAlt, FaHeart, FaShare, FaFilter, FaSearch } from "react-icons/fa";

const eventsData = [
  {
    id: 1,
    title: "AI & Machine Learning Bootcamp",
    date: "2025-09-15",
    time: "9:00 AM - 6:00 PM PST",
    location: "San Francisco, CA",
    type: "Workshop",
    category: "AI/ML",
    attendees: 250,
    price: "Free",
    status: "Open",
    description: "Dive deep into neural networks, computer vision, and natural language processing. Hands-on workshops with PyTorch and TensorFlow, plus networking with ML engineers from top tech companies.",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    speaker: "Dr. Sarah Chen",
    company: "OpenAI",
    tags: ["PyTorch", "TensorFlow", "Computer Vision", "NLP"]
  },
  {
    id: 2,
    title: "React & Next.js Master Class",
    date: "2025-09-28",
    time: "2:00 PM - 8:00 PM EST",
    location: "Virtual Event",
    type: "Conference",
    category: "Web Dev",
    attendees: 1200,
    price: "$49",
    status: "Almost Full",
    description: "Learn advanced React patterns, Next.js 15 features, server components, and deployment strategies. Build a full-stack application from scratch with modern best practices.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    speaker: "Alex Rodriguez",
    company: "Vercel",
    tags: ["React", "Next.js", "Server Components", "TypeScript"]
  },
  {
    id: 3,
    title: "DevOps & Cloud Architecture Summit",
    date: "2025-10-12",
    time: "10:00 AM - 5:00 PM UTC",
    location: "London, UK",
    type: "Summit",
    category: "DevOps",
    attendees: 800,
    price: "$89",
    status: "Open",
    description: "Explore Kubernetes, Docker, CI/CD pipelines, and cloud-native architectures. Learn infrastructure as code, monitoring strategies, and scaling techniques from industry experts.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    speaker: "Marcus Johnson",
    company: "AWS",
    tags: ["Kubernetes", "Docker", "CI/CD", "AWS", "Terraform"]
  },
  {
    id: 4,
    title: "Cybersecurity & Ethical Hacking Workshop",
    date: "2025-10-25",
    time: "1:00 PM - 9:00 PM CET",
    location: "Berlin, Germany",
    type: "Workshop",
    category: "Security",
    attendees: 150,
    price: "$129",
    status: "Limited Seats",
    description: "Hands-on penetration testing, vulnerability assessment, and secure coding practices. Learn ethical hacking techniques, web security, and how to protect applications from modern threats.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    speaker: "Elena Volkov",
    company: "CrowdStrike",
    tags: ["Penetration Testing", "Web Security", "Ethical Hacking", "OWASP"]
  },
  {
    id: 5,
    title: "Mobile Development with Flutter & React Native",
    date: "2025-11-08",
    time: "11:00 AM - 7:00 PM PST",
    location: "Austin, TX",
    type: "Conference",
    category: "Mobile",
    attendees: 600,
    price: "$69",
    status: "Open",
    description: "Cross-platform mobile development strategies, performance optimization, and deployment to app stores. Compare Flutter vs React Native with real-world case studies.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    speaker: "Priya Patel",
    company: "Google",
    tags: ["Flutter", "React Native", "Mobile Dev", "Cross-Platform"]
  },
  {
    id: 6,
    title: "Blockchain & Web3 Developer Conference",
    date: "2025-11-22",
    time: "9:00 AM - 8:00 PM EST",
    location: "New York, NY",
    type: "Conference",
    category: "Web3",
    attendees: 1000,
    price: "$149",
    status: "Early Bird",
    description: "Smart contracts, DeFi protocols, NFT development, and Web3 integration. Learn Solidity, interact with blockchain networks, and build decentralized applications.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    speaker: "David Kim",
    company: "Ethereum Foundation",
    tags: ["Blockchain", "Solidity", "DeFi", "Smart Contracts", "Web3"]
  }
];

const categories = ["All", "AI/ML", "Web Dev", "DevOps", "Security", "Mobile", "Web3"];
const eventTypes = ["All", "Workshop", "Conference", "Summit"];

const EventsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [likedEvents, setLikedEvents] = useState(new Set());

  const filteredEvents = eventsData.filter(event => {
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchesType = selectedType === "All" || event.type === selectedType;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesType && matchesSearch;
  });

  const toggleLike = (eventId : any) => {
    const newLikedEvents = new Set(likedEvents);
    if (newLikedEvents.has(eventId)) {
      newLikedEvents.delete(eventId);
    } else {
      newLikedEvents.add(eventId);
    }
    setLikedEvents(newLikedEvents);
  };

  const getStatusColor = (status : any) => {
    switch (status) {
      case "Open": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Almost Full": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Limited Seats": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "Early Bird": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "AI/ML": "from-purple-500 to-pink-600",
      "Web Dev": "from-blue-500 to-cyan-600",
      "DevOps": "from-green-500 to-teal-600",
      "Security": "from-red-500 to-orange-600",
      "Mobile": "from-indigo-500 to-purple-600",
      "Web3": "from-yellow-500 to-orange-600"
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25 bg-[size:20px_20px] opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-3 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium">
              <FaCalendarAlt className="text-sm" />
              <span>Upcoming Tech Events</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                Learn, Network
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">& Grow Together</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join the most exciting tech events, workshops, and conferences. 
              Connect with industry experts, learn cutting-edge technologies, and advance your career.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events, topics, or technologies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* Type Filter */}
              <div className="flex gap-2">
                <FaFilter className="text-gray-400 mt-3" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {filteredEvents.length} Events Found
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Showing {selectedCategory !== "All" ? selectedCategory : "all categories"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <article
                key={event.id}
                className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    alt={event.title}
                    src={event.image}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-xs font-medium">
                        {event.type}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleLike(event.id)}
                        className={`w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
                          likedEvents.has(event.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <FaHeart className="text-sm" />
                      </button>
                      <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                        <FaShare className="text-sm" />
                      </button>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className={`inline-block px-3 py-1 bg-gradient-to-r ${getCategoryColor(event.category)} text-white text-xs font-medium rounded-full`}>
                      {event.category}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <FaCalendarAlt className="mr-2 text-blue-500 flex-shrink-0" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <FaClock className="mr-2 text-green-500 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <FaMapMarkerAlt className="mr-2 text-red-500 flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <FaUsers className="mr-2 text-purple-500 flex-shrink-0" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32"
                        alt="Speaker"
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {event.speaker}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                        @ {event.company}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {event.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                      {event.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md">
                          +{event.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {event.price}
                    </span>
                    <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      <span>Register</span>
                      <FaExternalLinkAlt className="text-sm" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">No events found</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Never Miss a Tech Event
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Get notified about upcoming events, early bird discounts, and exclusive tech content
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-4 focus:ring-white/20"
            />
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EventsPage;