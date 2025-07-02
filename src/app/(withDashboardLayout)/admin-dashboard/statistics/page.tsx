"use client";

import {
  FaChartLine,
  FaUsers,
  FaDollarSign,
  FaFileAlt,
} from "react-icons/fa"; 
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
} from "recharts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip as ChartJsTooltip,
  Legend as ChartJsLegend,
} from "chart.js";
import { useGetStatisticsQuery } from "@/src/redux/features/statistics/statisticsApi";

// Register the Chart.js components (for internal use if needed, but Recharts is used here)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartJsTooltip,
  ChartJsLegend
);

const COLORS_PIE = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A855F7",
  "#EC4899",
]; 

const Statistics = () => {
  const { data } = useGetStatisticsQuery(undefined);
  const statistics = data?.data || {};

  // Data for various charts, dynamically using fetched statistics
  const paymentsLineData = [
    { name: "Jan", revenue: statistics?.monthlyRevenue?.jan || 0 },
    { name: "Feb", revenue: statistics?.monthlyRevenue?.feb || 0 },
    { name: "Mar", revenue: statistics?.monthlyRevenue?.mar || 0 },
    { name: "Apr", revenue: statistics?.monthlyRevenue?.apr || 0 },
    { name: "May", revenue: statistics?.monthlyRevenue?.may || 0 },
    { name: "Jun", revenue: statistics?.monthlyRevenue?.jun || 0 },
    { name: "Jul", revenue: statistics?.monthlyRevenue?.jul || 0 },
    { name: "Aug", revenue: statistics?.monthlyRevenue?.aug || 0 },
    { name: "Sep", revenue: statistics?.monthlyRevenue?.sep || 0 },
    { name: "Oct", revenue: statistics?.monthlyRevenue?.oct || 0 },
    { name: "Nov", revenue: statistics?.monthlyRevenue?.nov || 0 },
    { name: "Dec", revenue: statistics?.monthlyRevenue?.dec || 0 },
  ];

  const postBarData = [
    { name: "Total Posts", value: statistics.totalPosts || 0 },
    { name: "Total Upvotes", value: statistics.totalUpvotes || 0 },
    { name: "Total Comments", value: statistics.totalPostComments || 0 },
    { name: "Premium Posts", value: statistics.totalPremiumPosts || 0 },
  ];

  const usersPieData = [
    {
      name: "Regular Users",
      value: (statistics.totalUsers || 0) - (statistics.totalPremiumUsers || 0),
    },
    { name: "Premium Users", value: statistics.totalPremiumUsers || 0 },
  ];

  const chartStyles = {
    tooltip: {
      backgroundColor: "rgb(31 41 55)", // Tailwind gray-800
      color: "rgb(255 255 255)", // White
      fontSize: 14,
      borderRadius: 8,
      padding: 10,
    },
    axis: {
      stroke: "rgb(107 114 128)", // Tailwind gray-500
      fontSize: 12,
    },
    grid: {
      stroke: "rgba(107, 114, 128, 0.2)", // Tailwind gray-500 with transparency
    },
    legend: {
      color: "rgb(156 163 175)", // Tailwind gray-400
    },
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-black min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2 text-center">
          Admin Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base text-center">
          Comprehensive statistics and insights for your Tech Tips & Tricks Hub.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center space-x-4">
          <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400">
            <FaDollarSign className="text-2xl" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-600 dark:text-gray-400">
              Total Revenue
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${statistics.totalSoldMembershipAmount || 0}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center space-x-4">
          <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-400">
            <FaChartLine className="text-2xl" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-600 dark:text-gray-400">
              Total Memberships
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {statistics.totalPayments || 0}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center space-x-4">
          <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-500 dark:text-yellow-400">
            <FaFileAlt className="text-2xl" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-600 dark:text-gray-400">
              Total Posts
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {statistics.totalPosts || 0}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center space-x-4">
          <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-500 dark:text-purple-400">
            <FaUsers className="text-2xl" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-600 dark:text-gray-400">
              Total Users
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {statistics.totalUsers || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-80 sm:h-96">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Monthly Revenue Overview
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={paymentsLineData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartStyles.grid.stroke}
              />
              <XAxis
                dataKey="name"
                tick={{
                  fill: chartStyles.axis.stroke,
                  fontSize: chartStyles.axis.fontSize,
                }}
              />
              <YAxis
                tick={{
                  fill: chartStyles.axis.stroke,
                  fontSize: chartStyles.axis.fontSize,
                }}
              />
              <Tooltip
                contentStyle={chartStyles.tooltip}
                itemStyle={{ color: chartStyles.tooltip.color }}
              />
              <Legend wrapperStyle={{ color: chartStyles.legend.color }} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#22D3EE"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-80 sm:h-96">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Content Engagement Metrics
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={postBarData}>
              <XAxis
                dataKey="name"
                tick={{
                  fill: chartStyles.axis.stroke,
                  fontSize: chartStyles.axis.fontSize,
                }}
              />
              <YAxis
                tick={{
                  fill: chartStyles.axis.stroke,
                  fontSize: chartStyles.axis.fontSize,
                }}
              />
              <Tooltip
                contentStyle={chartStyles.tooltip}
                itemStyle={{ color: chartStyles.tooltip.color }}
              />
              <Legend wrapperStyle={{ color: chartStyles.legend.color }} />
              <Bar dataKey="value" fill="#4F46E5" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 lg:col-span-2 h-80 sm:h-96 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            User Distribution
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={usersPieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`
                }
                labelLine={false} // Hide the label connecting lines
              >
                {usersPieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS_PIE[index % COLORS_PIE.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={chartStyles.tooltip}
                itemStyle={{ color: chartStyles.tooltip.color }}
              />
              <Legend wrapperStyle={{ color: chartStyles.legend.color }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
