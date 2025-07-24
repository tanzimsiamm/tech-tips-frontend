"use client";

import { FaChartLine, FaComments, FaEye, FaShareAlt } from "react-icons/fa";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Default fixed data for the last 30 days
const contentViewsData = {
  labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
  datasets: [
    {
      label: "Total Views",
      data: [
        120, 150, 180, 200, 170, 210, 250, 300, 280, 320, 350, 370, 400, 420,
        390, 410, 430, 450, 470, 490, 460, 440, 420, 400, 380, 360, 340, 320,
        300, 280,
      ],
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      borderColor: "rgba(59, 130, 246, 1)",
      borderWidth: 2,
      tension: 0.3,
      pointRadius: 3,
      pointBackgroundColor: "rgba(59, 130, 246, 1)",
    },
  ],
};

// Fixed engagement data
const engagementData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Upvotes",
      data: [120, 150, 180, 100, 160, 200],
      backgroundColor: "rgba(34, 197, 94, 0.7)",
      borderColor: "rgba(34, 197, 94, 1)",
      borderWidth: 1,
      borderRadius: 5,
    },
    {
      label: "Comments",
      data: [40, 60, 50, 30, 45, 70],
      backgroundColor: "rgba(251, 191, 36, 0.7)",
      borderColor: "rgba(251, 191, 36, 1)",
      borderWidth: 1,
      borderRadius: 5,
    },
  ],
};

// Fixed share distribution data
const shareDistributionData = {
  labels: ["Facebook", "Twitter (X)", "LinkedIn", "Reddit", "Other"],
  datasets: [
    {
      label: "Shares",
      data: [120, 180, 90, 140, 60],
      backgroundColor: [
        "rgba(59, 130, 246, 0.8)",
        "rgba(34, 197, 94, 0.8)",
        "rgba(251, 191, 36, 0.8)",
        "rgba(239, 68, 68, 0.8)",
        "rgba(168, 85, 247, 0.8)",
      ],
      borderColor: [
        "rgba(59, 130, 246, 1)",
        "rgba(34, 197, 94, 1)",
        "rgba(251, 191, 36, 1)",
        "rgba(239, 68, 68, 1)",
        "rgba(168, 85, 247, 1)",
      ],
      borderWidth: 1,
      borderRadius: 5,
    },
  ],
};

const Dashboard = () => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "rgb(156 163 175)",
        },
      },
      tooltip: {
        backgroundColor: "rgb(31 41 55)",
        titleColor: "rgb(255 255 255)",
        bodyColor: "rgb(209 213 219)",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgb(156 163 175)",
        },
        grid: {
          color: "rgba(55, 65, 81, 0.5)",
        },
      },
      y: {
        ticks: {
          color: "rgb(156 163 175)",
        },
        grid: {
          color: "rgba(55, 65, 81, 0.5)",
        },
      },
    },
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-black min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Your Content Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base">
          Insights into your tech tips and audience engagement.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center space-x-4">
          <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400">
            <FaEye className="text-2xl" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-600 dark:text-gray-400">
              Total Views
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              12.5K
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center space-x-4">
          <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-400">
            <FaChartLine className="text-2xl" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-600 dark:text-gray-400">
              Total Upvotes
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              4.3K
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center space-x-4">
          <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-500 dark:text-yellow-400">
            <FaComments className="text-2xl" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-600 dark:text-gray-400">
              Total Comments
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              1.2K
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center space-x-4">
          <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-500 dark:text-purple-400">
            <FaShareAlt className="text-2xl" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-600 dark:text-gray-400">
              Total Shares
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              650
            </p>
          </div>
        </div>
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-80 sm:h-96">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Content Views Over Time
          </h3>
          <Line data={contentViewsData} options={chartOptions} />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-80 sm:h-96">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Engagement (Upvotes & Comments)
          </h3>
          <Bar data={engagementData} options={chartOptions} />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 lg:col-span-2 h-80 sm:h-96">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Share Distribution by Platform
          </h3>
          <Bar data={shareDistributionData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
