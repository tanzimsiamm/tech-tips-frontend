"use client";

import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import {
  FaPen,
  FaImage,
  FaListAlt,
  FaAlignLeft,
  FaTimes,
} from "react-icons/fa";
import { TfiLayoutListPost } from "react-icons/tfi";
import { useEffect, useState } from "react";

import TextEditor from "./TextEditor";

import {
  useGetSinglePostQuery,
  useUpdatePostMutation,
} from "@/src/redux/features/posts/postApi";
import { useAppSelector } from "@/src/redux/hooks";
import { useGetSingleUserQuery } from "@/src/redux/features/user/userApi";
import { TPost, TUser } from "@/src/types";

type TModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postId: string;
};

export default function UpdatePostModal({
  open,
  setOpen,
  postId,
}: TModalProps) {
  const { register, handleSubmit, reset } = useForm();
  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const user = useAppSelector((state) => state.auth.user);

  const { data } = useGetSingleUserQuery(user?.email as string);
  const userFromDB: TUser = data?.data || {};

  const {
    data: postData,
    isSuccess,
    isLoading: dataGetLoading,
  } = useGetSinglePostQuery(postId);
  const post: TPost = postData?.data;

  const [description, setDescription] = useState("");
  const [latestDescription, setLatestDescription] = useState("");

  useEffect(() => {
    if (isSuccess && post) {
      reset({
        title: post?.title,
        category: post?.category,
        premium: post?.isPremium ? "premium" : "free",
        image1: post?.images?.[0] || "",
        image2: post?.images?.[1] || "",
        image3: post?.images?.[2] || "",
      });
      setDescription(post?.description);
      setLatestDescription(post?.description);
    }
  }, [reset, post, isSuccess]);

  const onSubmit = async (data: any) => {
    const postImages: string[] = [];

    if (data.image1) postImages.push(data.image1);
    if (data.image2) postImages.push(data.image2);
    if (data.image3) postImages.push(data.image3);

    const postData: Partial<TPost> = {
      title: data.title,
      category: data.category,
      description: latestDescription,
      images: postImages,
      isPremium: data.premium === "premium",
    };

    try {
      const response = await updatePost({
        postId: post?._id as string,
        payload: postData,
      }).unwrap();

      if (response?.success) {
        setOpen(false);
        toast.success("Post updated successfully!");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (!open) return null;

  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-post-title"
      className="fixed inset-0 z-50 bg-black/40 dark:bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 overflow-y-auto"
    >
      <form
        className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl relative flex flex-col max-h-[90vh] transition-colors duration-300"
        onSubmit={handleSubmit(onSubmit)}
      >
        {(isLoading || dataGetLoading) && (
          <div className="absolute inset-0 z-50 bg-white/90 dark:bg-gray-900/90 rounded-2xl flex justify-center items-center">
            <ClipLoader
              aria-label="Loading Spinner"
              color="#3B82F6"
              loading={true}
              size={60}
              speedMultiplier={0.8}
            />
          </div>
        )}

        <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
          <h2
            id="edit-post-title"
            className="text-xl font-bold text-gray-900 dark:text-gray-100"
          >
            Edit Post
          </h2>
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close edit post modal"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-6 space-y-6 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200 dark:scrollbar-thumb-blue-600 dark:scrollbar-track-gray-700">
          {/* Title Input */}
          <div className="flex items-center space-x-3">
            <FaPen className="text-blue-600 dark:text-blue-400 text-xl flex-shrink-0" />
            <input
              {...register("title", { required: true })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-400"
              id="postTitle"
              placeholder="Post Title"
              type="text"
              aria-required="true"
            />
          </div>

          {/* Category Input */}
          <div className="flex items-center space-x-3">
            <FaListAlt className="text-green-600 dark:text-green-400 text-xl flex-shrink-0" />
            <select
              {...register("category", { required: true })}
              id="postCategory"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
              aria-required="true"
            >
              <option disabled value="">
                Select Category
              </option>
              <option value="Web">Web</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="AI">AI</option>
              <option value="Technology">Technology</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Premium Selection */}
          {userFromDB?.memberShip && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 text-gray-700 dark:text-gray-300">
              <span className="font-semibold flex items-center gap-3" id="contentTypeLabel">
                <TfiLayoutListPost className="text-purple-600 dark:text-purple-400 text-xl" />
                Content Type
              </span>
              <div
                role="radiogroup"
                aria-labelledby="contentTypeLabel"
                className="flex space-x-6 items-center"
              >
                <label
                  className="flex items-center space-x-2 cursor-pointer"
                  htmlFor="premiumRadio"
                >
                  <input
                    type="radio"
                    value={"premium"}
                    {...register("premium", {
                      required: "Please choose an option",
                    })}
                    className="form-radio h-4 w-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500"
                    id="premiumRadio"
                  />
                  <span>Premium</span>
                </label>
                <label
                  className="flex items-center space-x-2 cursor-pointer"
                  htmlFor="freeRadio"
                >
                  <input
                    type="radio"
                    value="free"
                    {...register("premium", {
                      required: "Please choose an option",
                    })}
                    className="form-radio h-4 w-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500"
                    id="freeRadio"
                  />
                  <span>Free</span>
                </label>
              </div>
            </div>
          )}

          {/* Description Input (TextEditor) */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
              <FaAlignLeft className="text-yellow-500 text-xl" />
              <label className="font-semibold" htmlFor="postDescription">
                Description
              </label>
            </div>
            <TextEditor
              description={description}
              setLatestDescription={setLatestDescription}
            />
          </div>

          {/* Images Input */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
              <FaImage className="text-red-600 dark:text-red-500 text-xl" />
              <label className="font-semibold" htmlFor="imageUrl1">
                Image URLs (Optional)
              </label>
            </div>
            <input
              {...register("image1")}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-400"
              id="imageUrl1"
              placeholder="Image URL 1"
              type="text"
            />
            <input
              {...register("image2")}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-400"
              id="imageUrl2"
              placeholder="Image URL 2"
              type="text"
            />
            <input
              {...register("image3")}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-400"
              id="imageUrl3"
              placeholder="Image URL 3"
              type="text"
            />
          </div>
        </div>

        <div className="p-4 flex justify-end space-x-4 border-t border-gray-300 dark:border-gray-700">
          <button
            className="px-6 py-2 text-base font-semibold rounded-full text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            type="button"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 text-base font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            disabled={isLoading || dataGetLoading}
            type="submit"
          >
            {isLoading || dataGetLoading ? (
              <ClipLoader
                aria-label="Loading Spinner"
                color="#ffffff"
                loading={true}
                size={20}
                speedMultiplier={0.8}
              />
            ) : (
              "Modify Post"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
