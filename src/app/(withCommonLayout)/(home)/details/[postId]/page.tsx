/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FaShare, FaThumbsUp, FaReply, FaEdit, FaPen } from "react-icons/fa";
import { RiDeleteBin4Line } from "react-icons/ri";
import Image from "next/image";
import TimeAgo from "react-timeago";
import { IoSendSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/src/redux/hooks";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { BiCommentDetail } from "react-icons/bi";
import MiniUserProfile from "../../components/Posts/MiniUserProfile";
import VoteSection from "../../components/Posts/VoteSection";
import { useGetSinglePostQuery } from "@/src/redux/features/posts/postApi";
import { MdStars } from "react-icons/md";
import { AiFillPrinter } from "react-icons/ai";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import EditCommentModal from "../../components/Posts/EditCommentModal";
import Link from "next/link";
import ImageGallery from "../../components/Posts/ImageGallary";
import { TComment, TPost } from "@/src/types";
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
} from "@/src/redux/features/comments/commetApi";

export default function PostDetails({
  params,
}: {
  params: { postId: string };
}) {
  const { data } = useGetSinglePostQuery(params?.postId);
  const post: TPost = data?.data || {};

  const { register, handleSubmit, reset } = useForm();
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
  } = post;

  const { data: commentsData } = useGetCommentsQuery({ postId: _id });
  const comments: TComment[] = commentsData?.data || [];

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const onSubmit = async (data: any) => {
    if (!user) {
      toast.error("Please log in to comment.");
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

      if (response?.success) {
        reset();
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div
      ref={contentRef}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 w-full mx-auto mb-4 border border-gray-200 dark:border-gray-700"
    >
      {openEditCommentModal && (
        <EditCommentModal
          setOpen={setEditCommentModal}
          comment={commentForEdit}
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
          <button
            onClick={reactToPrintFn}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            title="Print Post"
          >
            <AiFillPrinter className="text-xl" />
          </button>
        </div>
      </div>

      <h2 className="text-gray-900 dark:text-white mb-3 font-bold text-xl sm:text-2xl">
        {post?.title}
      </h2>

      <div
        className="text-gray-800 dark:text-gray-200 text-base leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>

      {images && images.length > 0 && <ImageGallery images={images} />}

      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
          <VoteSection
            postId={_id as string}
            userId={user?._id as string}
            votes={votes!}
            voters={voters!}
          />

          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <BiCommentDetail className="text-xl" />
            <span className="font-semibold">{comments?.length}</span>
          </div>
        </div>
        <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">
          <FaShare className="text-lg" />
          <span className="text-sm font-medium">Share</span>
        </button>
      </div>

      <div className="flex flex-col space-y-4 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 relative">
        <h4 className="font-semibold text-gray-700 dark:text-gray-300">
          Comments
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

        {comments?.map((comment: TComment) => (
          <div key={comment?._id} className="flex space-x-3">
            <Link href={`/profile/${comment?.userInfo?.email}`}>
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
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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

              <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400 text-xs mt-1 ml-2">
                <span className="font-medium">
                  <TimeAgo date={comment.createdAt!} />
                </span>
                <button className="flex items-center space-x-1 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  <FaThumbsUp className="text-xs" />
                  <span>Like</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  <FaReply className="text-xs" />
                  <span>Reply</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {user && (
        <form
          className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700"
          onSubmit={handleSubmit(onSubmit)}
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
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={addLoading}
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
