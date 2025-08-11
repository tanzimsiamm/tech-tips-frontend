import React from "react";
import { FaUsers, FaLightbulb, FaCode, FaGlobe, FaTwitter, FaGithub, FaLinkedin, FaRocket, FaBrain, FaLaptopCode } from "react-icons/fa";

const teams = [
  {
    userName: "Alex Chen",
    position: "AI & Machine Learning Specialist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    bio: "Sharing cutting-edge AI techniques, neural network architectures, and machine learning best practices for developers.",
    specialties: ["PyTorch", "TensorFlow", "Computer Vision", "NLP"],
    social: { github: "#", linkedin: "#", twitter: "#" },
    id: 1,
  },
  {
    userName: "Sarah Martinez",
    position: "Full-Stack Web Developer",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    bio: "Frontend frameworks, backend architecture, and everything in between. Making complex web development accessible.",
    specialties: ["React", "Node.js", "TypeScript", "GraphQL"],
    social: { github: "#", linkedin: "#", twitter: "#" },
    id: 2,
  },
  {
    userName: "Marcus Johnson",
    position: "DevOps & Cloud Engineer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    bio: "Kubernetes, Docker, CI/CD pipelines, and cloud infrastructure. Streamlining deployment and scaling strategies.",
    specialties: ["AWS", "Kubernetes", "Docker", "Terraform"],
    social: { github: "#", linkedin: "#", twitter: "#" },
    id: 3,
  },
  {
    userName: "Priya Patel",
    position: "Mobile App Developer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    bio: "Cross-platform mobile development, React Native tips, and native iOS/Android optimization techniques.",
    specialties: ["React Native", "Flutter", "Swift", "Kotlin"],
    social: { github: "#", linkedin: "#", twitter: "#" },
    id: 4,
  },
  {
    userName: "David Kim",
    position: "Software Architecture Expert",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    bio: "Design patterns, system architecture, and scalable software solutions. Building robust, maintainable codebases.",
    specialties: ["System Design", "Microservices", "Design Patterns", "Scalability"],
    social: { github: "#", linkedin: "#", twitter: "#" },
    id: 5,
  },
  {
    userName: "Elena Rodriguez",
    position: "Cybersecurity Specialist",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    bio: "Security best practices, ethical hacking techniques, and protecting applications from modern threats.",
    specialties: ["Penetration Testing", "Secure Coding", "Web Security", "Cryptography"],
    social: { github: "#", linkedin: "#", twitter: "#" },
    id: 6,
  },
];

const infoItems = [
  {
    icon: <FaLightbulb className="text-6xl mb-6" aria-hidden="true" />,
    title: "Share Knowledge",
    desc: "We believe the best way to master technology is by sharing what you learn. Our community thrives on quick tips, code snippets, and practical solutions to real-world problems.",
    gradient: "from-yellow-500 to-orange-600",
    iconColor: "text-yellow-500 dark:text-yellow-400",
  },
  {
    icon: <FaCode className="text-6xl mb-6" aria-hidden="true" />,
    title: "Learn by Doing",
    desc: "From beginner-friendly tutorials to advanced architecture patterns, we provide hands-on examples and executable code that you can immediately apply to your projects.",
    gradient: "from-blue-500 to-purple-600",
    iconColor: "text-blue-500 dark:text-blue-400",
  },
  {
    icon: <FaGlobe className="text-6xl mb-6" aria-hidden="true" />,
    title: "Global Tech Community",
    desc: "Connect with developers, engineers, and tech enthusiasts from around the world. Ask questions, share solutions, and grow together in this ever-evolving field.",
    gradient: "from-green-500 to-teal-600",
    iconColor: "text-green-500 dark:text-green-400",
  },
];

const techFocus = [
  {
    icon: <FaBrain className="text-4xl mb-4" />,
    title: "Artificial Intelligence",
    desc: "Neural networks, deep learning, computer vision, NLP, and the latest AI frameworks",
    color: "from-purple-500 to-pink-600",
    iconColor: "text-purple-500 dark:text-purple-400"
  },
  {
    icon: <FaLaptopCode className="text-4xl mb-4" />,
    title: "Software Engineering",
    desc: "Best practices, design patterns, testing strategies, and clean code principles",
    color: "from-blue-500 to-cyan-600",
    iconColor: "text-blue-500 dark:text-blue-400"
  },
  {
    icon: <FaRocket className="text-4xl mb-4" />,
    title: "Web Development",
    desc: "Frontend frameworks, backend APIs, databases, and modern deployment strategies",
    color: "from-emerald-500 to-green-600",
    iconColor: "text-emerald-500 dark:text-emerald-400"
  }
];

const AboutUsPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25 bg-[size:20px_20px] opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-3 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span>Live Tech Community</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                Tech Tips & Tricks
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">Hub</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Your go-to community for <span className="font-semibold text-blue-600 dark:text-blue-400">AI insights</span>, 
              <span className="font-semibold text-purple-600 dark:text-purple-400"> coding tips</span>, and 
              <span className="font-semibold text-teal-600 dark:text-teal-400"> software engineering</span> best practices.
              <br />
              <span className="text-lg opacity-80">Think X (Twitter) for developers.</span>
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">#AI</span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">#WebDev</span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">#SoftwareEngineering</span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">#DevOps</span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">#MachineLearning</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Focus Areas */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              What We Cover
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Deep dives into the technologies shaping our digital future
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {techFocus.map(({ icon, title, desc, color, iconColor }, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:scale-105"
              >
                <div className={`${iconColor} mb-4`}>
                  {icon}
                </div>
                <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
                  {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Community Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              What makes our tech community different
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {infoItems.map(({ icon, title, desc, gradient, iconColor }, idx) => (
              <article
                key={idx}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 hover:scale-105"
              >
                <div className={`${iconColor} group-hover:scale-110 transition-transform duration-300`}>
                  {icon}
                </div>
                <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                  {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
              <FaUsers className="text-white text-2xl" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Meet Our Contributors
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Expert developers and engineers sharing their knowledge and experience with the community
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teams.map(({ id, userName, position, image, bio, specialties, social }) => (
              <article
                key={id}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    alt={`${userName} - ${position}`}
                    src={image}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex space-x-3">
                      <a href={social.github} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                        <FaGithub />
                      </a>
                      <a href={social.linkedin} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                        <FaLinkedin />
                      </a>
                      <a href={social.twitter} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                        <FaTwitter />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {userName}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
                    {position}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    {bio}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {specialties.map((skill, skillIdx) => (
                      <span
                        key={skillIdx}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-lg font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Join Community CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Ready to Level Up Your Tech Skills?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join thousands of developers sharing knowledge, tips, and tricks in our growing community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Join the Community
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300">
              Follow on Twitter
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;