"use client";

import { FaShare, FaPen } from "react-icons/fa";
import { RiDeleteBin4Line } from "react-icons/ri";
import Image from "next/image";
import TimeAgo from "react-timeago";
import { IoSendSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { BiCommentDetail } from "react-icons/bi";
import { MdStars } from "react-icons/md";
import { AiFillPrinter } from "react-icons/ai";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

import EditCommentModal from "../../components/Posts/EditCommentModal";
import ImageGallery from "../../components/Posts/ImageGallary";
import VoteSection from "../../components/Posts/VoteSection";
import MiniUserProfile from "../../components/Posts/MiniUserProfile";

import { TComment, TPost } from "@/src/types";
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
} from "@/src/redux/features/comments/commetApi";
import { useGetSinglePostQuery } from "@/src/redux/features/posts/postApi";
import { useAppSelector } from "@/src/redux/hooks";

export default function PostDetails() {
  const params = useParams();
  const postId = params?.postId as string;

  const { data, isLoading, error } = useGetSinglePostQuery(postId, {
    skip: !postId,
  });
  const post: TPost = data?.data || ({} as TPost);

  const { register, handleSubmit, reset, watch } = useForm();
  const user = useAppSelector((state) => state.auth.user);
  const [addComment, { isLoading: addLoading }] = useAddCommentMutation();
  const [deleteComment, { isLoading: deleteLoading }] =
    useDeleteCommentMutation();

  const [openEditCommentModal, setEditCommentModal] = useState(false);
  const [commentForEdit, setCommentForEdit] = useState<any>({});

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
  } = post || {};

  const { data: commentsData } = useGetCommentsQuery(
    { postId: _id || "" },
    { skip: !_id }
  );
  const comments: TComment[] = commentsData?.data || [];

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

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
      if (response) reset();
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || "Post Details",
          text: description
            ? description.substring(0, 150) + "..."
            : "Check out this post!",
          url: `${window.location.origin}/details/${_id}`,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      const postUrl = `${window.location.origin}/details/${_id}`;
      navigator.clipboard
        .writeText(postUrl)
        .then(() => toast.success("Post link copied to clipboard!"))
        .catch(() => toast.error("Could not copy link to clipboard."));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const newCommentValue = watch("newComment");

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
        <ClipLoader color="#3B82F6" size={50} />
      </div>
    );

  if (error)
    return (
      <div className="text-red-600 dark:text-red-400 text-center py-10">
        Error loading post. Please try again.
      </div>
    );

  return (
     <motion.div
      ref={contentRef}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="
        relative
        bg-white dark:bg-gray-900
        shadow-md dark:shadow-lg
        p-6 sm:p-8
        w-full mx-auto mb-8
        border border-gray-200 dark:border-gray-700
        transition-all duration-300
        hover:scale-[1.02]
        hover:shadow-2xl
        hover:border-blue-400 dark:hover:border-blue-500
      "
    >
      {openEditCommentModal && (
        <EditCommentModal
          comment={commentForEdit}
          setOpen={setEditCommentModal}
        />
      )}

      {/* Post Header */}
      <div
        className="
          flex items-start justify-between mb-6
          bg-gray-50 dark:bg-gray-800
          rounded-xl
          border border-gray-200 dark:border-gray-700
          p-4
          shadow-sm dark:shadow-md
          transition-colors duration-300
        "
      >
        <div className="flex items-center gap-4">
          <section className="relative group">
            <Link href={`/profile/${authorInfo?.authorEmail}`}>
              <Image
                alt="User Avatar"
                className="size-14 rounded-full object-cover border border-gray-300 dark:border-gray-600 shadow-sm"
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
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {category} • {createdAt && <TimeAgo date={createdAt} />}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
          {isPremium && (
            <MdStars
              className="text-blue-500 text-2xl"
              title="Premium Content"
            />
          )}
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            title="Print Post"
            onClick={reactToPrintFn}
          >
            <AiFillPrinter className="text-xl" />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <h2 className="text-gray-900 dark:text-white mb-5 font-extrabold text-2xl sm:text-3xl leading-tight">
        {title}
      </h2>
      <div
        dangerouslySetInnerHTML={{ __html: description || "" }}
        className="text-gray-800 dark:text-gray-300 text-lg leading-relaxed mb-6"
      />
      {images && images.length > 0 && <ImageGallery images={images} />}

      {/* Vote + Share */}
      <div
        className="
          flex justify-between items-center mt-8 pt-5
          border-t border-gray-300 dark:border-gray-700
          text-gray-700 dark:text-gray-300
        "
      >
        <div className="flex items-center gap-6">
          <VoteSection
            postId={_id as string}
            userId={user?._id as string}
            voters={voters || []}
            votes={votes || 0}
          />
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <BiCommentDetail className="text-xl" />
            <span className="font-semibold">{comments?.length}</span>
          </div>
        </div>
        <button
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition"
          onClick={handleShare}
        >
          <FaShare className="text-lg" />
          <span className="text-sm font-medium">Share</span>
        </button>
      </div>

      {/* Comments */}
      <div
        className="
          flex flex-col gap-5 mt-8 pt-6
          border-t border-gray-200 dark:border-gray-700
          relative
        "
      >
        <h4 className="font-semibold text-gray-800 dark:text-gray-300 text-lg">
          Comments
        </h4>

        {(addLoading || deleteLoading) && (
          <div className="absolute inset-0 z-10 bg-white/95 dark:bg-gray-900/95 rounded-2xl flex justify-center items-center shadow-lg">
            <ClipLoader color="#3B82F6" size={35} />
          </div>
        )}

        {comments?.map((comment: TComment) => (
          <motion.div
            key={comment?._id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex gap-4"
          >
            <Link href={`/profile/${comment?.userInfo?.email}`}>
              <Image
                alt={comment?.userInfo?.name || "User"}
                className="size-10 rounded-full object-cover border border-gray-300 dark:border-gray-600 shadow-sm"
                height={40}
                src={
                  comment?.userInfo?.image ||
                  "https://i.ibb.co/VtP9tF6/default-user-image.png"
                }
                width={40}
              />
            </Link>
            <div className="flex-1">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl px-5 py-3 relative group shadow-sm transition-colors duration-300">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {comment?.userInfo?.name}
                  </h4>
                  {(user?.email === comment?.userInfo?.email ||
                    user?.role === "admin") && (
                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition">
                      <button
                        className="text-gray-500 hover:text-blue-500 transition"
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
                        className="text-gray-500 hover:text-red-500 transition"
                        title="Delete Comment"
                        type="button"
                        onClick={() => deleteComment(comment?._id as string)}
                      >
                        <RiDeleteBin4Line className="text-sm" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-gray-800 dark:text-gray-200 text-sm mt-2 whitespace-pre-wrap">
                  {comment?.comment}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Comment Form */}
      {user && (
        <form
          className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Image
            alt="User Avatar"
            className="size-10 rounded-full object-cover border border-gray-300 dark:border-gray-600 shadow-sm"
            height={40}
            src={
              user?.image || "https://i.ibb.co/VtP9tF6/default-user-image.png"
            }
            width={40}
          />
          <div className="relative flex-1">
            <textarea
              {...register("newComment", { required: true })}
              className="
                w-full h-12
                dark:bg-gray-700
                border border-gray-300 dark:border-gray-600
                rounded-xl
                py-2 px-4 pr-14
                text-gray-900 dark:text-white
                placeholder-gray-500 dark:placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500
                resize-none overflow-hidden
                transition-colors duration-300
              "
              placeholder="What's your thought?"
              rows={1}
              onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              onKeyDown={handleKeyDown}
              aria-label="Write a comment"
            />
            <button
              className="
                absolute right-4 top-1/2 -translate-y-1/2
                text-blue-600 hover:text-blue-700
                transition disabled:opacity-50 disabled:cursor-not-allowed
              "
              type="submit"
              disabled={
                addLoading || !newCommentValue || newCommentValue.trim() === ""
              }
              aria-label="Submit comment"
            >
              {addLoading ? (
                <ClipLoader color="#3B82F6" size={20} />
              ) : (
                <IoSendSharp className="text-xl" />
              )}
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
}
