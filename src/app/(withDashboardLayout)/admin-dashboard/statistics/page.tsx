"use client"
import React, { useState } from "react";
import { FaChartLine, FaUsers, FaCode, FaFileAlt, FaEye, FaHeart, FaComments, FaTrophy, FaRocket, FaBrain, FaLaptopCode, FaShieldAlt } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";

const COLORS_PIE = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#8B5CF6", // Purple
  "#F59E0B", // Yellow
  "#EF4444", // Red
  "#06B6D4", // Cyan
];


const TechDashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");
  
  // Mock data for tech community platform
  const statistics = {
    totalUsers: 45200,
    totalPosts: 12850,
    totalViews: 2850000,
    totalLikes: 185000,
    totalComments: 95000,
    activeContributors: 3200,
    premiumMembers: 8500,
    totalTutorials: 2400,
    codingChallenges: 450,
    totalRevenue: 125000
  };

  // Monthly engagement data
  const monthlyEngagementData = [
    { name: "Jan", users: 3200, posts: 850, views: 185000, comments: 6200 },
    { name: "Feb", users: 3800, posts: 920, views: 210000, comments: 7100 },
    { name: "Mar", users: 4200, posts: 1100, views: 245000, comments: 8300 },
    { name: "Apr", users: 4600, posts: 1200, views: 268000, comments: 8900 },
    { name: "May", users: 5100, posts: 1350, views: 295000, comments: 9800 },
    { name: "Jun", users: 5500, posts: 1420, views: 315000, comments: 10500 },
    { name: "Jul", users: 5900, posts: 1500, views: 340000, comments: 11200 },
    { name: "Aug", users: 6200, posts: 1580, views: 365000, comments: 11800 },
    { name: "Sep", users: 6600, posts: 1650, views: 385000, comments: 12400 },
    { name: "Oct", users: 7000, posts: 1720, views: 410000, comments: 13100 },
    { name: "Nov", users: 7400, posts: 1800, views: 435000, comments: 13800 },
    { name: "Dec", users: 7800, posts: 1850, views: 460000, comments: 14500 },
  ];

  // Content category distribution
  const categoryData = [
    { name: "AI & Machine Learning", value: 32, color: "#8B5CF6" },
    { name: "Web Development", value: 28, color: "#3B82F6" },
    { name: "DevOps & Cloud", value: 18, color: "#10B981" },
    { name: "Mobile Development", value: 12, color: "#F59E0B" },
    { name: "Cybersecurity", value: 6, color: "#EF4444" },
    { name: "Other", value: 4, color: "#6B7280" },
  ];

  // Top technologies/tags
  const topTechnologies = [
    { name: "React", posts: 2400, growth: 15 },
    { name: "Python", posts: 2100, growth: 22 },
    { name: "JavaScript", posts: 1900, growth: 8 },
    { name: "Docker", posts: 1200, growth: 35 },
    { name: "AWS", posts: 1100, growth: 28 },
    { name: "Machine Learning", posts: 950, growth: 42 },
    { name: "Node.js", posts: 850, growth: 18 },
    { name: "TypeScript", posts: 750, growth: 55 },
  ];

  // User activity by time
  const activityData = [
    { hour: "00", posts: 45, comments: 120, views: 2800 },
    { hour: "04", posts: 25, comments: 60, views: 1500 },
    { hour: "08", posts: 180, comments: 450, views: 8200 },
    { hour: "12", posts: 320, comments: 780, views: 12500 },
    { hour: "16", posts: 280, comments: 690, views: 11200 },
    { hour: "20", posts: 220, comments: 520, views: 9800 },
  ];

  const formatNumber = (num: any) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const summaryCards = [
    {
      title: "Total Community Members",
      value: statistics.totalUsers,
      icon: <FaUsers className="text-2xl" />,
      color: "blue",
      change: "+12.5%",
      changeType: "positive"
    },
    {
      title: "Published Tips & Tutorials",
      value: statistics.totalPosts,
      icon: <FaFileAlt className="text-2xl" />,
      color: "green",
      change: "+8.3%",
      changeType: "positive"
    },
    {
      title: "Total Page Views",
      value: statistics.totalViews,
      icon: <FaEye className="text-2xl" />,
      color: "purple",
      change: "+23.1%",
      changeType: "positive"
    },
    {
      title: "Community Engagement",
      value: statistics.totalLikes,
      icon: <FaHeart className="text-2xl" />,
      color: "red",
      change: "+15.7%",
      changeType: "positive"
    },
    {
      title: "Active Contributors",
      value: statistics.activeContributors,
      icon: <FaCode className="text-2xl" />,
      color: "yellow",
      change: "+18.9%",
      changeType: "positive"
    },
    {
      title: "Premium Members",
      value: statistics.premiumMembers,
      icon: <FaTrophy className="text-2xl" />,
      color: "indigo",
      change: "+25.4%",
      changeType: "positive"
    },
  ];

  const getCardColors = (
    color: "blue" | "green" | "purple" | "red" | "yellow" | "indigo"
  ) => {
    const colors = {
      blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
      red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
      yellow: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
      indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
    };
    return colors[color] || colors.blue;
  };

  const chartStyles = {
    tooltip: {
      backgroundColor: "rgb(31 41 55)",
      color: "rgb(255 255 255)",
      fontSize: 14,
      borderRadius: 8,
      padding: 10,
      border: "none",
    },
    axis: {
      stroke: "rgb(107 114 128)",
      fontSize: 12,
    },
    grid: {
      stroke: "rgba(107, 114, 128, 0.1)",
      strokeDasharray: "3 3",
    },
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Community Dashboard
                </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Real-time insights into your tech community's growth and engagement
              </p>
            </div>
            
            <div className="flex gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 3 months</option>
                <option value="1y">Last year</option>
              </select>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {summaryCards.map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${getCardColors(card.color as any)}`}>
                  {card.icon}
                </div>
                <div className={`text-sm font-semibold px-2 py-1 rounded-full ${
                  card.changeType === 'positive' 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                    : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                }`}>
                  {card.change}
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {card.title}
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatNumber(card.value)}
              </p>
            </div>
          ))}
        </section>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Monthly Growth Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
              Community Growth Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyEngagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartStyles.grid.stroke} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: chartStyles.axis.stroke, fontSize: chartStyles.axis.fontSize }}
                />
                <YAxis 
                  tick={{ fill: chartStyles.axis.stroke, fontSize: chartStyles.axis.fontSize }}
                />
                <Tooltip contentStyle={chartStyles.tooltip} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="users"
                  stackId="1"
                  stroke="#3B82F6"
                  fill="url(#colorUsers)"
                  name="New Users"
                />
                <Area
                  type="monotone"
                  dataKey="posts"
                  stackId="1"
                  stroke="#10B981"
                  fill="url(#colorPosts)"
                  name="Posts"
                />
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPosts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Content Categories */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
              Content Categories
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={chartStyles.tooltip}
                  formatter={(value) => [`${value}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Top Technologies */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
              Trending Technologies
            </h3>
            <div className="space-y-4">
              {topTechnologies.map((tech, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {tech.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {tech.posts} posts
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600 dark:text-green-400 text-sm font-semibold">
                      +{tech.growth}%
                    </span>
                    <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                        style={{ width: `${Math.min(tech.growth, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
              Quick Stats
            </h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <FaBrain className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">AI/ML Posts</p>
                  <p className="font-bold text-gray-900 dark:text-white">4,120</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <FaLaptopCode className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Code Snippets</p>
                  <p className="font-bold text-gray-900 dark:text-white">8,540</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <FaRocket className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tutorials</p>
                  <p className="font-bold text-gray-900 dark:text-white">2,400</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <FaShieldAlt className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Security Tips</p>
                  <p className="font-bold text-gray-900 dark:text-white">1,280</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <section className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
            Recent Community Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-gray-900 dark:text-white">
                <span className="font-semibold">Sarah Chen</span> published a new AI tutorial: "Building Neural Networks with PyTorch"
              </p>
              <span className="text-sm text-gray-500 dark:text-gray-400">2 min ago</span>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-gray-900 dark:text-white">
                <span className="font-semibold">Alex Rodriguez</span> shared a React performance optimization tip
              </p>
              <span className="text-sm text-gray-500 dark:text-gray-400">5 min ago</span>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <p className="text-gray-900 dark:text-white">
                <span className="font-semibold">Marcus Johnson</span> answered a DevOps question about Kubernetes scaling
              </p>
              <span className="text-sm text-gray-500 dark:text-gray-400">8 min ago</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default TechDashboard;