/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { TfiSearch } from "react-icons/tfi";
import { useInView } from "react-intersection-observer";
import { MdOutlineSort } from "react-icons/md";
import { LuFilter } from "react-icons/lu";
import { useGetPostsQuery } from "@/src/redux/features/posts/postApi";
import { TPost } from "@/src/types";
import PostSkeleton from "./PostSkeleton";

export default function PostSection() {
  const [filterQuery, setFilterQuery] = useState({})
  const [limit, setLimit] = useState(10)
  const { data, isFetching } = useGetPostsQuery({ ...filterQuery, skip: 0, limit });
  const { totalPosts, posts } = data?.data || {};

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && posts && totalPosts && posts.length < totalPosts) {
      const isFilterActive = Object.keys(filterQuery).some(option => ['category', 'searchTerm', 'sortByUpvote'].includes(option));

      if (!isFilterActive) {
        setLimit(prevLimit => prevLimit + 10);
      }
    }
  }, [inView, filterQuery, posts, totalPosts]);

  return (
    <section className="bg-gray-50 dark:bg-black min-h-screen">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Search Input for larger screens */}
          <div className="relative flex-1 w-full hidden sm:flex items-center">
            <span className="absolute left-4 text-gray-500 dark:text-gray-400">
              <TfiSearch />
            </span>
            <input
              onChange={(e) => setFilterQuery(prev => ({ ...prev, searchTerm: e.target.value }))}
              type="text"
              className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Search posts..."
            />
          </div>

          {/* Search Dropdown for small screens */}
          <div className="relative w-full sm:hidden">
            <div className="dropdown w-full">
              <div tabIndex={0} role="button" className="w-full flex items-center justify-center gap-2 p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-600">
                <TfiSearch /> <span className="font-medium">Search & Filter</span>
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-4 shadow-lg bg-white dark:bg-gray-800 rounded-xl w-full mt-2 space-y-3 border border-gray-200 dark:border-gray-700">
                <li>
                  <input
                    onChange={(e) => setFilterQuery(prev => ({ ...prev, searchTerm: e.target.value }))}
                    type="text"
                    className="w-full py-2 px-4 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Search posts..."
                  />
                </li>
                <li>
                  <select
                    onChange={(e) => setFilterQuery(prev => ({ ...prev, sortByUpvote: e.target.value }))}
                    className="w-full p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    defaultValue=""
                  >
                    <option value="" disabled>Sort by Upvote</option>
                    <option value='-1'>Most Upvoted</option>
                    <option value='1'>Most Downvoted</option>
                  </select>
                </li>
                <li>
                  <select
                    onChange={(e) => setFilterQuery(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    defaultValue=""
                  >
                    <option value="" disabled>Select Category</option>
                    <option value=''>All Categories</option>
                    <option value='Web'>Web</option>
                    <option value='Software Engineering'>Software Engineering</option>
                    <option value='AI'>AI</option>
                    <option value='Technology'>Technology</option>
                    <option value='Others'>Others</option>
                  </select>
                </li>
              </ul>
            </div>
          </div>

          {/* Filter and Sort for larger screens */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
              <LuFilter className="text-lg" />
              <select
                onChange={(e) => setFilterQuery(prev => ({ ...prev, sortByUpvote: e.target.value }))}
                className="bg-transparent outline-none text-sm cursor-pointer dark:text-gray-300"
                defaultValue=""
              >
                <option value="" disabled>Sort by Upvote</option>
                <option value='-1'>Most Upvoted</option>
                <option value='1'>Most Downvoted</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
              <MdOutlineSort className="text-lg" />
              <select
                onChange={(e) => setFilterQuery(prev => ({ ...prev, category: e.target.value }))}
                className="bg-transparent outline-none text-sm cursor-pointer dark:text-gray-300"
                defaultValue=""
              >
                <option value="" disabled>Select Category</option>
                <option value=''>All Categories</option>
                <option value='Web'>Web</option>
                <option value='Software Engineering'>Software Engineering</option>
                <option value='AI'>AI</option>
                <option value='Technology'>Technology</option>
                <option value='Others'>Others</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {posts?.map((post: TPost) => <PostCard key={post._id} post={post} />)}

        {isFetching && (
          <div className="space-y-4">
            <PostSkeleton />
            <PostSkeleton />
          </div>
        )}

        {posts && posts.length > 0 && posts.length < totalPosts && (
          <div ref={ref} className="text-center py-4 text-gray-500 dark:text-gray-400">
            Loading more posts...
          </div>
        )}

        {posts && posts.length === totalPosts && totalPosts > 0 && (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            You've reached the end of the feed!
          </div>
        )}

        {posts && totalPosts === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400 text-lg">
            No posts found matching your criteria.
          </div>
        )}
      </div>
    </section>
  )
}
