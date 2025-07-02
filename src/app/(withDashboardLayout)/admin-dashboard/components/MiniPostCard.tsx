/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FaShare } from "react-icons/fa";
import Image from "next/image";
import TimeAgo from "react-timeago";
import { useAppSelector } from "@/src/redux/hooks";
import { BiCommentDetail } from "react-icons/bi";
import Link from "next/link";
import { MdStars } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { useState } from "react";
import { useDeletePostMutation } from "@/src/redux/features/posts/postApi";
import { toast } from "sonner";
import { TComment, TPost } from "@/src/types";
import { useGetCommentsQuery } from "@/src/redux/features/comments/commetApi";
import UpdatePostModal from "@/src/app/(withCommonLayout)/(home)/components/CreatePost/UpdatePostModal";
import MiniUserProfile from "@/src/app/(withCommonLayout)/(home)/components/Posts/MiniUserProfile";
import VoteSection from "@/src/app/(withCommonLayout)/(home)/components/Posts/VoteSection";

export default function MiniPostCard({ post }: { post: TPost }) {
  const user = useAppSelector((state) => state.auth.user);
  const [updateModal, setUpdateModal] = useState(false);
  const [deletePost] = useDeletePostMutation();

  const {
    _id,
    title,
    category,
    images,
    authorInfo,
    votes,
    voters,
    createdAt,
    isPremium,
  } = post;

  const { data } = useGetCommentsQuery({ postId: _id });
  const comments: TComment[] = data?.data || [];

  const handleDelete = async (postId: string) => {
    try {
      const response: any = await deletePost(postId).unwrap();

      if (response?.success) {
        toast.success("Deleted successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 w-full mx-auto mb-4 border border-gray-200 dark:border-gray-700">
      {updateModal && (
        <UpdatePostModal
          open={updateModal}
          setOpen={setUpdateModal}
          postId={_id as string}
        />
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <section className="group relative mr-3">
            <Link href={`/profile/${authorInfo?.authorEmail}`}>
              <Image
                width={56}
                height={56}
                className="size-12 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                src={
                  authorInfo?.image ||
                  "https://i.ibb.co/VtP9tF6/default-user-image.png"
                }
                alt="User Avatar"
              />
            </Link>
            <MiniUserProfile userInfo={post.authorInfo} />
          </section>

          <div>
            <Link
              href={`/profile/${authorInfo?.authorEmail}`}
              className="font-bold text-gray-900 dark:text-white hover:underline text-lg"
            >
              {authorInfo?.name}
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {category} •{" "}
              <time className="text-gray-500 dark:text-gray-400">
                <TimeAgo date={createdAt!} />
              </time>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
          {isPremium && (
            <MdStars
              className="text-blue-500 text-2xl"
              title="Premium Content"
            />
          )}

          {(user?.email === authorInfo?.authorEmail ||
            user?.role === "admin") && (
            <>
              <button
                onClick={() => setUpdateModal(true)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                title="Edit Post"
              >
                <MdModeEdit className="text-xl" />
              </button>
              <button
                onClick={() => handleDelete(_id!)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500 transition-colors duration-200"
                title="Delete Post"
              >
                <RiDeleteBinLine className="text-xl" />
              </button>
            </>
          )}
        </div>
      </div>

      <p className="text-gray-800 dark:text-gray-200 mb-4 text-base leading-relaxed font-semibold">
        {title}
        <Link
          href={`/details/${_id}`}
          className="text-blue-500 dark:text-blue-400 hover:underline pl-2"
        >
          See more...
        </Link>
      </p>

      {images && images.length > 0 && (
        <Link
          href={`/details/${_id}`}
          className="block rounded-xl overflow-hidden"
        >
          <Image
            width={300}
            height={300}
            alt="Post image"
            className="rounded-xl h-48 w-full object-cover object-center transform transition-transform duration-300 hover:scale-105"
            src={images[0]}
          />
        </Link>
      )}

      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
          <VoteSection
            postId={_id as string}
            userId={user?._id as string}
            votes={votes ?? 0}
            voters={voters ?? []}
          />

          <Link
            href={`/details/${_id}#comments`}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <BiCommentDetail className="text-xl" />
            <span className="font-semibold">{comments?.length}</span>
          </Link>
        </div>
        <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">
          <FaShare className="text-lg" />
          <span className="text-sm font-medium">Share</span>
        </button>
      </div>
    </div>
  );
}
