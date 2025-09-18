"use client";

import { useState } from "react";
import { TfiSearch } from "react-icons/tfi";
import { MdOutlineSort } from "react-icons/md";
import { LuFilter } from "react-icons/lu";

import MiniPostCard from "../../admin-dashboard/components/MiniPostCard";

import { useAppSelector } from "@/src/redux/hooks";
import { useGetPostsQuery } from "@/src/redux/features/posts/postApi";
import { TPost } from "@/src/types";
import PostSkeleton from "@/src/app/(withCommonLayout)/(home)/components/Posts/PostSkeleton";

export default function MyPostsSection() {
  const user = useAppSelector((state) => state.auth.user);
  const [filterQuery, setFilterQuery] = useState({ userEmail: user?.email });
  const { data, isFetching } = useGetPostsQuery({ ...filterQuery });
  const { posts } = data?.data || {};

  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Sticky header with search + filter */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Desktop search input */}
          <div className="relative flex-1 w-full hidden sm:flex items-center">
            <span className="absolute left-4 text-gray-500 dark:text-gray-400">
              <TfiSearch />
            </span>
            <input
              className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
              placeholder="Search your posts..."
              type="text"
              onChange={(e) =>
                setFilterQuery((prev) => ({
                  ...prev,
                  searchTerm: e.target.value,
                }))
              }
            />
          </div>

          {/* Mobile dropdown */}
          <div className="relative w-full sm:hidden">
            <details className="dropdown w-full">
              <summary
                className="w-full flex items-center justify-center gap-2 p-3 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer list-none"
              >
                <TfiSearch /> <span className="font-medium">Search & Filter</span>
              </summary>
              <div className="dropdown-content menu p-4 shadow-lg bg-white dark:bg-gray-800 rounded-xl w-full mt-2 space-y-3 border border-gray-200 dark:border-gray-700">
                {/* Search */}
                <div>
                  <input
                    className="w-full py-2 px-4 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
                    placeholder="Search your posts..."
                    type="text"
                    onChange={(e) =>
                      setFilterQuery((prev) => ({
                        ...prev,
                        searchTerm: e.target.value,
                      }))
                    }
                  />
                </div>
                {/* Sort by upvote */}
                <div>
                  <select
                    className="w-full p-2 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
                    defaultValue=""
                    onChange={(e) =>
                      setFilterQuery((prev) => ({
                        ...prev,
                        sortByUpvote: e.target.value,
                      }))
                    }
                  >
                    <option disabled value="">
                      Sort by Upvote
                    </option>
                    <option value="-1">Most Upvoted</option>
                    <option value="1">Most Downvoted</option>
                  </select>
                </div>
                {/* Category */}
                <div>
                  <select
                    className="w-full p-2 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
                    defaultValue=""
                    onChange={(e) =>
                      setFilterQuery((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                  >
                    <option disabled value="">
                      Select Category
                    </option>
                    <option value="">All Categories</option>
                    <option value="Web">Web</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="AI">AI</option>
                    <option value="Technology">Technology</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
            </details>
          </div>

          {/* Desktop filter controls */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Upvote filter */}
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-full px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
              <LuFilter className="text-lg" />
              <select
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 outline-none text-sm cursor-pointer rounded px-2 py-1 border border-gray-200 dark:border-gray-600"
                defaultValue=""
                onChange={(e) =>
                  setFilterQuery((prev) => ({
                    ...prev,
                    sortByUpvote: e.target.value,
                  }))
                }
              >
                <option disabled value="">
                  Sort by Upvote
                </option>
                <option value="-1">Most Upvoted</option>
                <option value="1">Most Downvoted</option>
              </select>
            </div>
            {/* Category filter */}
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-full px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
              <MdOutlineSort className="text-lg" />
              <select
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 outline-none text-sm cursor-pointer rounded px-2 py-1 border border-gray-200 dark:border-gray-600"
                defaultValue=""
                onChange={(e) =>
                  setFilterQuery((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
              >
                <option disabled value="">
                  Select Category
                </option>
                <option value="">All Categories</option>
                <option value="Web">Web</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="AI">AI</option>
                <option value="Technology">Technology</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="p-4 space-y-4">
        {posts?.map((post: TPost) => (
          <MiniPostCard key={post._id} post={post} />
        ))}

        {isFetching && (
          <div className="space-y-4">
            <PostSkeleton />
            <PostSkeleton />
          </div>
        )}

        {!isFetching && (!posts || posts.length === 0) && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400 text-lg">
            No posts found.
          </div>
        )}
      </div>
    </section>
  );
}
