"use client";

import Image from "next/image";
import { useState } from "react";
import { FaPen } from "react-icons/fa";

import CreatePostModal from "./CreatePostModal";

import { useAppSelector } from "@/src/redux/hooks";

export default function CreatePost() {
  const user = useAppSelector((state) => state.auth.user);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div
      className="
        bg-white dark:bg-gray-900
        p-4 rounded-xl shadow-md
        w-full mx-auto mb-4
        border border-gray-200 dark:border-gray-700
        transition-colors duration-300
      "
    >
      {openModal && <CreatePostModal open={openModal} setOpen={setOpenModal} />}

      <div className="flex items-center mb-4">
        <FaPen className="text-blue-600 dark:text-blue-400 text-lg md:text-xl" />
        <h2 className="ml-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
          Create Post
        </h2>
      </div>

      <div className="flex items-center space-x-3 mb-4">
        <Image
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
          height={40}
          src={user?.image || "https://i.ibb.co/VtP9tF6/default-user-image.png"}
          width={40}
        />
        <button
          type="button"
          className="
            flex-1 p-3 border border-gray-300 dark:border-gray-600
            rounded-full text-left
            text-gray-700 dark:text-gray-300
            bg-gray-50 dark:bg-gray-800
            hover:bg-gray-200 dark:hover:bg-gray-700
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:ring-offset-2 dark:focus:ring-offset-gray-900
          "
          onClick={() => setOpenModal(true)}
          aria-label="Open create post modal"
        >
          What&apos;s on your mind?
        </button>
      </div>
    </div>
  );
}
