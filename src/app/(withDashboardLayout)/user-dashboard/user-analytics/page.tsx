"use client";
import React from 'react';
import { FaChartLine, FaComments, FaEye, FaShareAlt, FaUsers, FaHeart, FaClock, FaArrowUp } from "react-icons/fa";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Data for charts
  const contentViewsData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    datasets: [
      {
        label: "Page Views",
        data: [2400, 3200, 2800, 4100, 3600, 4800, 5200, 4900],
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "rgba(99, 102, 241, 1)",
        pointBorderColor: "rgba(255, 255, 255, 1)", // Default to white for points
        pointBorderWidth: 2,
        fill: true,
      },
    ],
  };

  const engagementData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Likes",
        data: [340, 420, 380, 290, 460, 520],
        backgroundColor: "rgba(16, 185, 129, 0.8)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 0,
        borderRadius: 8,
      },
      {
        label: "Comments",
        data: [120, 180, 140, 95, 165, 210],
        backgroundColor: "rgba(245, 158, 11, 0.8)",
        borderColor: "rgba(245, 158, 11, 1)",
        borderWidth: 0,
        borderRadius: 8,
      },
      {
        label: "Shares",
        data: [80, 95, 75, 60, 88, 115],
        backgroundColor: "rgba(168, 85, 247, 0.8)",
        borderColor: "rgba(168, 85, 247, 1)",
        borderWidth: 0,
        borderRadius: 8,
      },
    ],
  };

  const shareDistributionData = {
    labels: ["LinkedIn", "Twitter", "Reddit", "Facebook", "Discord", "Other"],
    datasets: [
      {
        data: [280, 240, 180, 120, 90, 60],
        backgroundColor: [
          "rgba(14, 165, 233, 0.9)",
          "rgba(34, 197, 94, 0.9)",
          "rgba(249, 115, 22, 0.9)",
          "rgba(59, 130, 246, 0.9)",
          "rgba(139, 92, 246, 0.9)",
          "rgba(156, 163, 175, 0.9)",
        ],
        borderColor: "rgba(255, 255, 255, 1)", // Default to white for borders
        borderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

 const chartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const, // ✅ cast to literal
      labels: {
        color: "rgb(75, 85, 99)",
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
        font: {
          size: 12,
          weight: 500,
        },
      },
    },
    tooltip: {
      backgroundColor: "rgb(255, 255, 255)",
      titleColor: "rgb(17, 24, 39)",
      bodyColor: "rgb(75, 85, 99)",
      borderColor: "rgb(229, 231, 235)",
      borderWidth: 1,
      cornerRadius: 12,
      displayColors: true,
      padding: 12,
    },
  },
  scales: {
    x: {
      ticks: {
        color: "rgb(107, 114, 128)",
        font: {
          size: 11,
          weight: 500,
        },
      },
      grid: {
        color: "rgba(229, 231, 235, 0.8)",
        drawBorder: false,
      },
    },
    y: {
      ticks: {
        color: "rgb(107, 114, 128)",
        font: {
          size: 11,
          weight: 500,
        },
      },
      grid: {
        color: "rgba(229, 231, 235, 0.8)",
        drawBorder: false,
      },
    },
  },
};

const doughnutOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right" as const, // ✅ cast to literal
      labels: {
        color: "rgb(75, 85, 99)",
        usePointStyle: true,
        pointStyle: "circle",
        padding: 15,
        font: {
          size: 12,
          weight: 500,
        },
      },
    },
    tooltip: {
      backgroundColor: "rgb(255, 255, 255)",
      titleColor: "rgb(17, 24, 39)",
      bodyColor: "rgb(75, 85, 99)",
      borderColor: "rgb(229, 231, 235)",
      borderWidth: 1,
      cornerRadius: 12,
      displayColors: true,
      padding: 12,
    },
  },
  cutout: "60%",
};

  const StatCard = ({
    icon: Icon,
    title,
    value,
    change,
    changeType,
    color,
  }: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    value: string | number;
    change?: string;
    changeType?: 'positive' | 'negative';
    color: string;
  }) => (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
          <Icon className={`text-2xl ${color.replace('bg-', 'text-')}`} />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 text-sm font-medium ${
            changeType === 'positive' ? 'text-green-500' : 'text-red-500'
          }`}>
            <FaArrowUp className={changeType === 'negative' ? 'transform rotate-180' : ''} />
            <span>{change}</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );

  type ChartCardProps = {
    title: string;
    children: React.ReactNode;
    className?: string;
  };

  const ChartCard: React.FC<ChartCardProps> = ({ title, children, className = "" }) => (
    <div className={`bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Content Performance Dashboard
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Track your tech content's reach and engagement metrics
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300">
              <FaClock className="text-sm" />
              <span className="text-sm font-medium">Last 30 days</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={FaEye}
            title="Total Page Views"
            value="28.4K"
            change="+12.5%"
            changeType="positive"
            color="bg-blue-500"
          />
          <StatCard
            icon={FaHeart}
            title="Total Engagement"
            value="8.7K"
            change="+8.2%"
            changeType="positive"
            color="bg-green-500"
          />
          <StatCard
            icon={FaUsers}
            title="Active Readers"
            value="3.2K"
            change="+5.7%"
            changeType="positive"
            color="bg-purple-500"
          />
          <StatCard
            icon={FaShareAlt}
            title="Content Shares"
            value="970"
            change="-2.1%"
            changeType="negative"
            color="bg-orange-500"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <ChartCard title="📈 Traffic Growth Trend" className="h-96">
            <Line data={contentViewsData} options={chartOptions} />
          </ChartCard>

          <ChartCard title="💬 Engagement Breakdown" className="h-96">
            <Bar data={engagementData} options={chartOptions} />
          </ChartCard>
        </div>

        {/* Bottom Chart */}
        <ChartCard title="🌐 Platform Share Distribution" className="h-96">
          <Doughnut data={shareDistributionData} options={doughnutOptions} />
        </ChartCard>
      </div>
    </div>
  );
};

export default Dashboard;