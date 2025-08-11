"use client";

import { FaShare } from "react-icons/fa";
import Image from "next/image";
import TimeAgo from "react-timeago";
import { BiCommentDetail } from "react-icons/bi";
import Link from "next/link";
import { MdStars } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { useState } from "react";
import { toast } from "sonner";

import { useDeletePostMutation } from "@/src/redux/features/posts/postApi";
import { useAppSelector } from "@/src/redux/hooks";
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

  const { data } = useGetCommentsQuery({ postId: _id as string });
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
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 sm:p-6 w-full mx-auto mb-4 border border-gray-200 dark:border-gray-700">
      {updateModal && (
        <UpdatePostModal
          open={updateModal}
          postId={_id as string}
          setOpen={setUpdateModal}
        />
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <section className="group relative mr-3">
            <Link href={`/profile/${authorInfo?.authorEmail}`}>
              <Image
                alt="User Avatar"
                className="size-12 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                height={56}
                src={
                  authorInfo?.image ||
                  "https://i.ibb.co/VtP9tF6/default-user-image.png"
                }
                width={56}
              />
            </Link>
            <MiniUserProfile userInfo={post.authorInfo} />
          </section>

          <div>
            <Link
              className="font-bold text-gray-900 dark:text-white hover:underline text-lg"
              href={`/profile/${authorInfo?.authorEmail}`}
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
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                title="Edit Post"
                onClick={() => setUpdateModal(true)}
              >
                <MdModeEdit className="text-xl" />
              </button>
              <button
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-red-500 transition-colors duration-200"
                title="Delete Post"
                onClick={() => handleDelete(_id!)}
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
          className="text-blue-500 dark:text-blue-400 hover:underline pl-2"
          href={`/details/${_id}`}
        >
          See more...
        </Link>
      </p>

      {images && images.length > 0 && (
        <Link
          className="block rounded-xl overflow-hidden"
          href={`/details/${_id}`}
        >
          <Image
            alt="Post image"
            className="rounded-xl h-48 w-full object-cover object-center transform transition-transform duration-300 hover:scale-105"
            height={300}
            src={images[0]}
            width={300}
          />
        </Link>
      )}

      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
          <VoteSection
            postId={_id as string}
            userId={user?._id as string}
            voters={voters ?? []}
            votes={votes ?? 0}
          />

          <Link
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
            href={`/details/${_id}#comments`}
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
