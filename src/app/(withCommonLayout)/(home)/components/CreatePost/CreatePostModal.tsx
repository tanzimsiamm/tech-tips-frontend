/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { TUser } from "@/src/redux/features/authentication/authSlice";
import { useGetSingleUserQuery } from "@/src/redux/features/user/userApi";
import { useState } from "react";
import { TPost } from "@/src/types";
import { useCreatePostMutation } from "@/src/redux/features/posts/postApi";
import { useAppSelector } from "@/src/redux/hooks";
import TextEditor from "./TextEditor";

type TModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreatePostModal({ open, setOpen }: TModalProps) {
  const { register, handleSubmit } = useForm();
  const [createPost, { isLoading }] = useCreatePostMutation();
  const user = useAppSelector((state) => state.auth.user);

  const { data } = useGetSingleUserQuery(user?.email as string);
  const userFromDB: TUser = data?.data || {};

  const [latestDescription, setLatestDescription] = useState("");

  const onSubmit = async (data: any) => {
    const postData: TPost = {
      title: data.title,
      category: data.category,
      description: latestDescription,
      images: [],
      isPremium: data.premium === "premium" ? true : false,
      authorInfo: {
        name: user?.name as string,
        email: user?.email as string,
        image: user?.image as string,
        role: user?.role as string,
        authorId: user?._id as string,
        authorEmail: user?.email as string,
      },
    };
    if (data.image1) postData.images.push(data.image1);
    if (data.image2) postData.images.push(data.image2);
    if (data.image3) postData.images.push(data.image3);

    try {
      const response = await createPost(postData).unwrap();

      if (response?.success) {
        setOpen(false);
        toast.success("You created a new post");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <section className="fixed inset-0 z-50 bg-black/40 dark:bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 overflow-y-auto">
      <form
        className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl relative flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-white/80 dark:bg-gray-900/80 rounded-xl flex justify-center items-center">
            <ClipLoader
              color="#3B82F6"
              loading={isLoading}
              size={60}
              aria-label="Loading Spinner"
              speedMultiplier={0.8}
            />
          </div>
        )}

        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Create New Post
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors duration-200"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-6 space-y-6 flex-grow overflow-y-auto">
          {/* Title Input */}
          <div className="flex items-center space-x-3">
            <FaPen className="text-blue-500 text-xl" />
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Post Title"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-300"
            />
          </div>

          {/* Category Input */}
          <div className="flex items-center space-x-3">
            <FaListAlt className="text-green-500 text-xl" />
            <select
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
              {...register("category", { required: true })}
              defaultValue=""
            >
              <option value="" disabled>
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
              <label className="font-semibold flex items-center gap-3">
                <TfiLayoutListPost className="text-purple-600 text-xl" />{" "}
                Content Type
              </label>

              <div className="flex space-x-6 items-center">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value={"premium"}
                    {...register("premium", {
                      required: "Please choose an option",
                    })}
                    className="form-radio h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500"
                  />
                  <span>Premium</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="free"
                    defaultChecked
                    {...register("premium", {
                      required: "Please choose an option",
                    })}
                    className="form-radio h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500"
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
              <label className="font-semibold">Description</label>
            </div>
            <TextEditor setLatestDescription={setLatestDescription} />
          </div>

          {/* Images Input */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
              <FaImage className="text-red-500 text-xl" />
              <label className="font-semibold">Image URLs (Optional)</label>
            </div>
            <input
              {...register("image1")}
              type="text"
              placeholder="Image URL 1"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-300"
            />
            <input
              {...register("image2")}
              type="text"
              placeholder="Image URL 2"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-300"
            />
            <input
              {...register("image3")}
              type="text"
              placeholder="Image URL 3"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-300"
            />
          </div>
        </div>

        <div className="p-4 flex justify-end space-x-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-6 py-2 text-base font-semibold rounded-full text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-base font-semibold rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader
                color="#ffffff"
                loading={isLoading}
                size={20}
                aria-label="Loading Spinner"
                speedMultiplier={0.8}
              />
            ) : (
              "Create Post"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
