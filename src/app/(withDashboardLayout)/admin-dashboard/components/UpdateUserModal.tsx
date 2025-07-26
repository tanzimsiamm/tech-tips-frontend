"use client";

import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { useEffect } from "react";
import Image from "next/image";
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaImage,
} from "react-icons/fa";

import { TUser } from "@/src/types";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/src/redux/features/user/userApi";

type TModalProps = {
  userEmail: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UpdateUserModal({ setOpen, userEmail }: TModalProps) {
  const { register, handleSubmit, reset } = useForm();
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
  const {
    data,
    isLoading: dataLoading,
    isSuccess,
  } = useGetSingleUserQuery(userEmail);
  const user: TUser = data?.data;

  useEffect(() => {
    if (isSuccess && user) {
      reset({
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      });
    }
  }, [reset, user, isSuccess]);

  const onSubmit = async (data: any) => {
    const userData: Partial<TUser> = {
      name: data.name,
      email: data.email,
      role: data.role,
      image: data.image,
    };

    try {
      const response: any = await updateUser({
        userId: user._id!,
        payload: userData,
      }).unwrap();

      if (response?.success) {
        setOpen(false);
        toast.success("User updated successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="fixed inset-0 z-50 bg-black/40 dark:bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 overflow-y-auto">
      <form
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl relative flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        {(dataLoading || updateLoading) && (
          <div className="absolute inset-0 z-50 bg-white/80 dark:bg-gray-900/80 rounded-2xl flex justify-center items-center">
            <ClipLoader
              aria-label="Loading Spinner"
              color="#3B82F6"
              loading={true}
              size={60}
              speedMultiplier={0.8}
            />
          </div>
        )}

        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Edit User
          </h2>
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors duration-200"
            type="button"
            onClick={() => setOpen(false)}
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-6 space-y-6 flex-grow overflow-y-auto">
          <div className="mb-4 text-center">
            <Image
              alt="profile"
              className="size-24 object-cover rounded-full mx-auto border-4 border-white dark:border-gray-700 shadow-md"
              height={96}
              src={
                user?.image || "https://i.ibb.co/VtP9tF6/default-user-image.png"
              }
              width={96}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <div className="relative flex items-center">
              <input
                className="w-full py-3 pl-12 pr-4 outline-none border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-500 dark:placeholder-gray-400"
                id="name"
                type="text"
                {...register("name")}
              />
              <span className="text-xl absolute left-4 text-gray-500 dark:text-gray-400">
                <FaUser />
              </span>
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative flex items-center">
              <input
                className="w-full py-3 pl-12 pr-4 outline-none border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-500 dark:placeholder-gray-400"
                id="email"
                type="text"
                {...register("email")}
                disabled
              />
              <span className="text-xl absolute left-4 text-gray-500 dark:text-gray-400">
                <FaEnvelope />
              </span>
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              htmlFor="role"
            >
              Role
            </label>
            <div className="relative flex items-center">
              <select
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                id="role"
                {...register("role")}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <span className="text-xl absolute left-4 text-gray-500 dark:text-gray-400 pointer-events-none">
                <FaUserShield />
              </span>
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              htmlFor="image"
            >
              Profile Image URL
            </label>
            <div className="relative flex items-center">
              <input
                className="w-full py-3 pl-12 pr-4 outline-none border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-500 dark:placeholder-gray-400"
                id="image"
                type="text"
                {...register("image")}
              />
              <span className="text-xl absolute left-4 text-gray-500 dark:text-gray-400">
                <FaImage />
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 flex justify-end space-x-4 border-t border-gray-200 dark:border-gray-700">
          <button
            className="px-6 py-2 text-base font-semibold rounded-full text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            type="button"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 text-base font-semibold rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            disabled={dataLoading || updateLoading}
            type="submit"
          >
            {dataLoading || updateLoading ? (
              <ClipLoader
                aria-label="Loading Spinner"
                color="#ffffff"
                loading={true}
                size={20}
                speedMultiplier={0.8}
              />
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
