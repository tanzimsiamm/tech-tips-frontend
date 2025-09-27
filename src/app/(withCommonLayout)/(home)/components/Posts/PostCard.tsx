/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { FaShare } from "react-icons/fa";
import { RiDeleteBin4Line } from "react-icons/ri";
import { useRef, useState } from "react";
import Image from "next/image";
import TimeAgo from "react-timeago";
import { IoSendSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { BiCommentDetail } from "react-icons/bi";
import Link from "next/link";
import { MdStars } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import { AiFillPrinter } from "react-icons/ai";
import { FaPen } from "react-icons/fa";
import { useRouter } from "next/navigation";
import React from "react";

import ImageGallery from "./ImageGallary";
import VoteSection from "./VoteSection";
import MiniUserProfile from "./MiniUserProfile";
import EditCommentModal from "./EditCommentModal";

import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
} from "@/src/redux/features/comments/commetApi";
import { TComment, TPost } from "@/src/types";
import { useSendNotificationMutation } from "@/src/redux/features/notification/notificationApi";
import { useAppSelector } from "@/src/redux/hooks";
import ShareModal from "./ShareModal";

export default function PostCard({ post }: { post: TPost }) {
  const { register, handleSubmit, reset, watch } = useForm();
  const user = useAppSelector((state) => state.auth.user);
  const [addComment, { isLoading: addLoading }] = useAddCommentMutation();
  const [deleteComment, { isLoading: deleteLoading }] =
    useDeleteCommentMutation();
  const [openEditCommentModal, setEditCommentModal] = useState(false);
  const [commentForEdit, setCommentForEdit] = useState<any>({});
  const [showShareOptions, setShowShareOptions] = useState(false);

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
    title,
  } = post;

  if (!_id) return null;

  const { data: commentsData } = useGetCommentsQuery({ postId: _id });
  const comments: TComment[] = commentsData?.data || [];

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const shareUrl = `${window.location.origin}/details/${_id}`;
    const shareTitle = title || "Check out this post!";
    const shareText = description
      ? description.replace(/<[^>]*>/g, "").slice(0, 100) + "..."
      : "Find out more!";

    // For mobile devices, show custom share options
    if (window.innerWidth <= 768) {
      setShowShareOptions(true);
      return;
    }

    // For desktop, use the existing logic
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (error: any) {
        if (error.name !== "AbortError") {
          // Fallback to custom share options if Web Share fails
          setShowShareOptions(true);
        }
      }
    } else {
      setShowShareOptions(true);
    }
  };

  // Add this function to handle specific share actions
  const handleShareAction = async (platform?: string) => {
    const shareUrl = `${window.location.origin}/details/${_id}`;
    const shareText = `${title} - ${description?.replace(/<[^>]*>/g, "").slice(0, 100)}...`;

    try {
      switch (platform) {
        case "clipboard":
          await navigator.clipboard.writeText(shareUrl);
          toast.success("Link copied to clipboard!");
          break;

        case "twitter":
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
            "_blank"
          );
          break;

        case "facebook":
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            "_blank"
          );
          break;

        case "whatsapp":
          window.open(
            `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
            "_blank"
          );
          break;

        default:
          // Native share
          if (navigator.share) {
            await navigator.share({
              title: title,
              text: shareText,
              url: shareUrl,
            });
          }
          break;
      }
    } catch (error) {
      console.error("Sharing failed:", error);
      toast.error("Failed to share post.");
    }

    setShowShareOptions(false);
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
        reset();
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const newCommentValue = watch("newComment");

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      ref={contentRef}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sm:p-8 w-full mx-auto mb-6 border border-gray-300 dark:border-gray-700"
    >
      <ShareModal
        isOpen={showShareOptions}
        onClose={() => setShowShareOptions(false)}
        onShare={handleShareAction}
        title={title}
        url={`${window.location.origin}/details/${_id}`}
      />
      {openEditCommentModal && (
        <EditCommentModal
          comment={commentForEdit}
          setOpen={setEditCommentModal}
        />
      )}

      <div
        className="flex items-start justify-between mb-5 cursor-pointer"
        onClick={() => router.push(`/details/${_id}`)}
      >
        <div className="flex items-center">
          <section className="group relative mr-3" onClick={stopPropagation}>
            <Link href={`/profile/${authorInfo?.authorEmail}`}>
              <Image
                alt="User Avatar"
                className="w-14 h-14 rounded-full object-cover border border-gray-300 dark:border-gray-600"
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
              onClick={stopPropagation}
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
          {isPremium && (
            <MdStars
              className="text-blue-500 text-2xl"
              title="Premium Content"
              aria-label="Premium Content"
            />
          )}
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            title="Print Post"
            onClick={reactToPrintFn}
            aria-label="Print Post"
            type="button"
          >
            <AiFillPrinter className="text-xl" />
          </button>
        </div>
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: description || "" }}
        className="text-gray-900 dark:text-gray-100 text-base leading-relaxed mb-5"
      />

      {images && images.length > 0 && (
        <div>
          <ImageGallery images={images} />
        </div>
      )}

      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-300 dark:border-gray-700">
        <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
          <VoteSection
            postId={_id as string}
            userId={user?._id as string}
            voters={voters || []}
            votes={votes || 0}
          />

          <Link
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200"
            href={`/details/${_id}#comments`}
            onClick={stopPropagation}
          >
            <BiCommentDetail className="text-xl" />
            <span className="font-semibold">{comments?.length || 0}</span>
          </Link>
        </div>
        <button
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-md px-2 py-1"
          onClick={handleShare} // Use the updated function
          aria-label="Share Post"
          type="button"
        >
          <FaShare className="text-lg" />
          <span className="text-sm font-medium">Share</span>
        </button>
      </div>

      <div className="flex flex-col space-y-4 mt-6 pt-5 border-t border-gray-200 dark:border-gray-700 relative">
        <h4
          className="font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-600 dark:hover:text-blue-500"
          onClick={() => router.push(`/details/${_id}#comments`)}
        >
          View all {comments?.length} comments
        </h4>

        {(addLoading || deleteLoading) && (
          <div className="absolute inset-0 z-10 bg-white/90 dark:bg-gray-900/90 rounded-2xl flex justify-center items-center">
            <ClipLoader
              aria-label="Loading Spinner"
              color="#3B82F6"
              size={35}
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
              <Image
                alt={comment?.userInfo?.name || "User"}
                className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                height={40}
                src={
                  comment?.userInfo?.image ||
                  "https://i.ibb.co/VtP9tF6/default-user-image.png"
                }
                width={40}
              />
            </Link>

            <div className="flex-1">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3 relative group">
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
                      <button
                        className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                        title="Edit Comment"
                        type="button"
                        onClick={() => {
                          setCommentForEdit(comment);
                          setEditCommentModal(true);
                        }}
                      >
                        <FaPen className="text-sm" />
                      </button>
                      <button
                        className="text-gray-500 hover:text-red-600 dark:hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 rounded"
                        title="Delete Comment"
                        type="button"
                        onClick={() => deleteComment(comment?._id as string)}
                      >
                        <RiDeleteBin4Line className="text-sm" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-gray-800 dark:text-gray-200 text-sm mt-1 whitespace-pre-wrap">
                  {comment?.comment}
                </p>
              </div>

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
          className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-200 dark:border-gray-700"
          onClick={stopPropagation}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Image
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
              height={40}
              src={
                user?.image || "https://i.ibb.co/VtP9tF6/default-user-image.png"
              }
              width={40}
            />
          </div>

          <div className="relative flex-1">
            <textarea
              {...register("newComment", { required: true })}
              className="w-full h-11 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full py-2 pl-4 pr-10 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 resize-none overflow-hidden transition-colors duration-200"
              placeholder="Post your reply..."
              rows={1}
              onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              onKeyDown={handleKeyDown}
              aria-label="New comment"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 rounded"
              disabled={
                addLoading || !newCommentValue || newCommentValue.trim() === ""
              }
              aria-label="Submit comment"
            >
              {addLoading ? (
                <ClipLoader
                  aria-label="Loading Spinner"
                  color="#2563EB"
                  loading={addLoading}
                  size={20}
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
