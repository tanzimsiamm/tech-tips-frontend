"use client";

import PostCard from "../../(home)/components/Posts/PostCard";
import PostSkeleton from "../../(home)/components/Posts/PostSkeleton";

import { useGetPostsQuery } from "@/src/redux/features/posts/postApi";
import { TPost } from "@/src/types";

const MyPosts = ({ userEmail }: { userEmail: string }) => {
  const { data, isFetching } = useGetPostsQuery({ userEmail });
  const { posts } = data?.data || {};

  return (
    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-black min-h-screen">
      <div className="space-y-4">
        {posts?.map((post: TPost) => <PostCard key={post._id} post={post} />)}

        {isFetching && (
          <div className="space-y-4">
            <PostSkeleton />
            <PostSkeleton />
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
    </div>
  );
};

export default MyPosts;
