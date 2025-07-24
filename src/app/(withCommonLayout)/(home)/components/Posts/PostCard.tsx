/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FaShare, FaThumbsUp, FaReply, FaEdit } from "react-icons/fa";
import { RiDeleteBin4Line } from "react-icons/ri";
import { useRef, useState } from "react";
import Image from "next/image";
import TimeAgo from "react-timeago";
import { IoSendSharp } from "react-icons/io5";
import { useForm } from "react-hook-form"; // Ensure useForm is imported
import { useAppSelector } from "@/src/redux/hooks";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { BiCommentDetail } from "react-icons/bi";
import Link from "next/link";
import { MdStars } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import { AiFillPrinter } from "react-icons/ai";
import { FaPen } from "react-icons/fa";
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
} from "@/src/redux/features/comments/commetApi";
import { TComment, TPost } from "@/src/types";
import ImageGallery from "./ImageGallary";
import VoteSection from "./VoteSection";
import MiniUserProfile from "./MiniUserProfile";
import { useSendNotificationMutation } from "@/src/redux/features/notification/notificationApi";
import EditCommentModal from "./EditCommentModal";
import { useRouter } from "next/navigation";
import React from "react"; // Ensure React is imported for React.ChangeEvent

export default function PostCard({ post }: { post: TPost }) {
  // Destructure watch from useForm
  const { register, handleSubmit, reset, watch } = useForm();
  const user = useAppSelector((state) => state.auth.user);
  const [addComment, { isLoading: addLoading }] = useAddCommentMutation();
  const [deleteComment, { isLoading: deleteLoading }] =
    useDeleteCommentMutation();
  const [openEditCommentModal, setEditCommentModal] = useState(false);
  const [commentForEdit, setCommentForEdit] = useState<any>({});

  const [sendNotification] = useSendNotificationMutation();
  const router = useRouter();

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const {
    _id,
    category,
    description,
    images,
    authorInfo,
    votes,
    voters,
    createdAt,
    isPremium,
    title, // Make sure title is available in TPost for better share text
  } = post;

  if (!_id) return null; // Ensure post ID exists before proceeding

  const { data: commentsData } = useGetCommentsQuery({ postId: _id });
  const comments: TComment[] = commentsData?.data || [];

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/details/${_id}`;
    const shareTitle = post.title || "Check out this post!"; // Use post title or fallback
    const shareText = description
      ? description.slice(0, 100) + "..."
      : "Find out more!";

    const shareData = {
      title: shareTitle,
      text: shareText,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        // console.log("Post shared successfully");
      } catch (error: any) {
        if (error.name === "AbortError") {
          toast.info("Sharing cancelled.");
        } else {
          toast.error("Failed to share post.");
          console.error("Error sharing:", error);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Post link copied to clipboard!");
      } catch (error) {
        toast.error("Could not copy link to clipboard.");
        console.error("Failed to copy link:", error);
      }
    }
  };

  const onSubmit = async (data: any) => {
    if (!user) {
      toast.error("Please log in to comment.");
      return;
    }

    if (!data.newComment || data.newComment.trim() === "") {
      toast.error("Comment cannot be empty.");
      return;
    }

    const newComment = {
      comment: data.newComment,
      postId: _id,
      userInfo: {
        name: user?.name,
        email: user?.email,
        image: user?.image,
      },
    };

    try {
      const response = await addComment(newComment as TComment).unwrap();

      if (response && response._id) {
        reset(); // Clear the textarea
        await sendNotification({
          userEmail: authorInfo?.authorEmail,
          text: `${user?.name} commented on your post`,
          commentedUserPic: user?.image as string,
          commentedUser: user?.name as string,
          date: new Date().toISOString(),
          isRead: false,
        });
      }
    } catch (error) {
      toast.error("Something went wrong while adding comment.");
      console.error(error);
    }
  };

  // Function to handle Enter key press for comment submission
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent new line
      handleSubmit(onSubmit)(); // Submit the form
    }
  };

  // Watch the input value to disable/enable the submit button
  const newCommentValue = watch("newComment");

  // Prevent click event from propagating to the parent div
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    // Make the entire card clickable, except for interactive elements
    <div
      ref={contentRef}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 w-full mx-auto mb-4 border border-gray-200 dark:border-gray-700 cursor-pointer"
      onClick={() => router.push(`/details/${_id}`)} // Navigate to details on card click
    >
      {openEditCommentModal && (
        <EditCommentModal
          setOpen={setEditCommentModal}
          comment={commentForEdit}
        />
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <section className="group relative mr-3" onClick={stopPropagation}>
            {" "}
            {/* Stop propagation */}
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
              onClick={stopPropagation} // Stop propagation
            >
              {authorInfo?.name}
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {category} •{" "}
              <time className="text-gray-500 dark:text-gray-400">
                {createdAt && <TimeAgo date={createdAt} />}
              </time>
            </p>
          </div>
        </div>

        <div
          className="flex items-center space-x-3 text-gray-600 dark:text-gray-400"
          onClick={stopPropagation}
        >
          {" "}
          {/* Stop propagation */}
          {isPremium && (
            <MdStars
              className="text-blue-500 text-2xl"
              title="Premium Content"
            />
          )}
          <button
            onClick={reactToPrintFn}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            title="Print Post"
          >
            <AiFillPrinter className="text-xl" />
          </button>
        </div>
      </div>

      <div
        className="text-gray-800 dark:text-gray-200 text-base leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: description || "" }}
      ></div>

      {images && images.length > 0 && (
        <div /* Removed onClick here, as the parent div handles navigation */>
          <ImageGallery images={images} />
        </div>
      )}

      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
          <VoteSection
            postId={_id as string}
            userId={user?._id as string}
            votes={votes || 0}
            voters={voters || []}
            onClick={stopPropagation} // Stop propagation
          />

          <Link
            href={`/details/${_id}#comments`}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
            onClick={stopPropagation} // Stop propagation
          >
            <BiCommentDetail className="text-xl" />
            <span className="font-semibold">{comments?.length || 0}</span>
          </Link>
        </div>
        <button
          onClick={handleShare}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
        >
          <FaShare className="text-lg" />
          <span className="text-sm font-medium">Share</span>
        </button>
      </div>

      <div className="flex flex-col space-y-4 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 relative">
        <h4
          className="font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-500 dark:hover:text-blue-400"
          onClick={() => router.push(`/details/${_id}#comments`)} // Explicit link to comments section
        >
          View all {comments?.length} comments
        </h4>

        {(addLoading || deleteLoading) && (
          <div className="absolute inset-0 z-10 bg-white/80 dark:bg-gray-800/90 rounded-xl flex justify-center items-center">
            <ClipLoader
              color="#3B82F6"
              size={35}
              aria-label="Loading Spinner"
              speedMultiplier={0.8}
            />
          </div>
        )}

        {comments?.slice(0, 2).map((comment: TComment) => (
          <div key={comment?._id} className="flex space-x-3">
            <Link
              href={`/profile/${comment?.userInfo?.email}`}
              onClick={stopPropagation}
            >
              {" "}
              {/* Stop propagation */}
              <Image
                src={
                  comment?.userInfo?.image ||
                  "https://i.ibb.co/VtP9tF6/default-user-image.png"
                }
                alt={comment?.userInfo?.name || "User"}
                width={40}
                height={40}
                className="size-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
              />
            </Link>

            <div className="flex-1">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-2 relative group">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {comment?.userInfo?.name}
                  </h4>
                  {(user?.email === comment?.userInfo?.email ||
                    user?.role === "admin") && (
                    <div
                      className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      onClick={stopPropagation}
                    >
                      {" "}
                      {/* Stop propagation */}
                      <button
                        type="button"
                        className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                        onClick={() => {
                          setCommentForEdit(comment);
                          setEditCommentModal(true);
                        }}
                        title="Edit Comment"
                      >
                        <FaPen className="text-sm" />
                      </button>
                      <button
                        type="button"
                        className="text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                        onClick={() => deleteComment(comment?._id as string)}
                        title="Delete Comment"
                      >
                        <RiDeleteBin4Line className="text-sm" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-gray-800 dark:text-gray-200 text-sm mt-1">
                  {comment?.comment}
                </p>
              </div>

              {/* REMOVED: Like and Reply options from comments as requested */}
              <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400 text-xs mt-1 ml-2">
                <span className="font-medium">
                  {comment.createdAt && <TimeAgo date={comment.createdAt} />}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {user && (
        <form
          className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700"
          onSubmit={handleSubmit(onSubmit)}
          onClick={stopPropagation} // Stop propagation for the form itself
        >
          <div>
            <Image
              width={40}
              height={40}
              className="size-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
              src={
                user?.image || "https://i.ibb.co/VtP9tF6/default-user-image.png"
              }
              alt="User Avatar"
            />
          </div>

          <div className="relative flex-1">
            <textarea
              {...register("newComment", { required: true })}
              className="w-full h-11 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full py-2 pl-4 pr-10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none overflow-hidden"
              placeholder="Post your reply..."
              rows={1}
              onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              onKeyDown={handleKeyDown} // Add onKeyDown for Enter submission
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              // Disable if loading, or if the comment value is empty or just whitespace
              disabled={
                addLoading || !newCommentValue || newCommentValue.trim() === ""
              }
            >
              {addLoading ? (
                <ClipLoader
                  color="#3B82F6"
                  loading={addLoading}
                  size={20}
                  aria-label="Loading Spinner"
                  speedMultiplier={0.8}
                />
              ) : (
                <IoSendSharp className="text-xl" />
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
