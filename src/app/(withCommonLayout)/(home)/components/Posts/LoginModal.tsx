"use client";

import { RiCloseLargeFill } from "react-icons/ri";
import React from "react";

import Login from "../../../login/page";

type TModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LoginModal({ open, setOpen }: TModalProps) {
  return (
    <section className="fixed inset-0 z-50 bg-black/40 dark:bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl relative">
        <button
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors duration-200"
          onClick={() => setOpen(false)}
        >
          <RiCloseLargeFill className="text-xl" />
        </button>

        <Login setOpen={setOpen} />
      </div>
    </section>
  );
}
