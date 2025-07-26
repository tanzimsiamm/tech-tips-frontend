"use client";

import { useState } from "react";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import Image from "next/image";

import UpdateUserModal from "../components/UpdateUserModal";

import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/src/redux/features/user/userApi";
import { TUser } from "@/src/types";

export default function ManageUsers() {
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const { data, isLoading, refetch } = useGetUsersQuery({ role: "user" });
  const [updateUser] = useUpdateUserMutation();
  const [deleteUserFromDB] = useDeleteUserMutation();
  const [updateUserEmail, setUpdateUserEmail] = useState("");

  const users: TUser[] = data?.data || [];

  const updateUserInfo = (userId: string, action: "block" | "activate") => {
    const actionText = action === "block" ? "block" : "activate";
    const actionVerb = action === "block" ? "Block" : "Activate";

    Swal.fire({
      title: `Are you sure?`,
      text: `Are you going to ${actionText} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${actionVerb}!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response: any = await updateUser({
            userId,
            payload: { isBlocked: action === "block" },
          }).unwrap();

          if (response.success) {
            Swal.fire({
              title: `${actionVerb}d!`,
              text: `User has been ${actionText}ed.`,
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong during the update.",
            icon: "error",
          });
          console.error(error);
        }
      }
    });
  };

  const deleteUser = (userId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you going to delete this user permanently?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response: any = await deleteUserFromDB(userId).unwrap();

          if (response.success) {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong during deletion.",
            icon: "error",
          });
          console.error(error);
        }
      }
    });
  };

  return (
    <section className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-black min-h-screen">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Manage Users
          </h2>
          {/* Add user button if needed, similar to Manage Admins */}
        </div>

        {openUpdateModal && (
          <UpdateUserModal
            open={openUpdateModal}
            setOpen={setOpenUpdateModal}
            userEmail={updateUserEmail}
          />
        )}

        <div className="overflow-x-auto relative min-h-[200px]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 z-10">
              <PulseLoader
                aria-label="Loading Spinner"
                color="#2563EB"
                size={13}
                speedMultiplier={0.7}
              />
            </div>
          )}

          <table className="min-w-full text-left text-sm text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-100 dark:bg-gray-700 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th
                  className="px-4 py-3 border-b border-gray-200 dark:border-gray-600 rounded-tl-xl"
                  scope="col"
                >
                  Image
                </th>
                <th
                  className="px-4 py-3 border-b border-gray-200 dark:border-gray-600"
                  scope="col"
                >
                  Name
                </th>
                <th
                  className="px-4 py-3 border-b border-gray-200 dark:border-gray-600"
                  scope="col"
                >
                  Email
                </th>
                <th
                  className="px-4 py-3 border-b border-gray-200 dark:border-gray-600"
                  scope="col"
                >
                  Role
                </th>
                <th
                  className="px-4 py-3 border-b border-gray-200 dark:border-gray-600 text-center"
                  scope="col"
                >
                  Edit
                </th>
                <th
                  className="px-4 py-3 border-b border-gray-200 dark:border-gray-600 text-center"
                  scope="col"
                >
                  Status
                </th>
                <th
                  className="px-4 py-3 border-b border-gray-200 dark:border-gray-600 rounded-tr-xl text-center"
                  scope="col"
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 flex items-center justify-center">
                    <Image
                      alt="profile"
                      className="size-9 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                      height={40}
                      src={
                        user.image ||
                        "https://i.ibb.co/VtP9tF6/default-user-image.png"
                      }
                      width={40}
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 font-medium text-blue-600 dark:text-blue-400">
                    {user.role}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button
                      className="p-2 rounded-full text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
                      title="Edit User"
                      onClick={() => {
                        setUpdateUserEmail(user.email!);
                        setOpenUpdateModal(true);
                      }}
                    >
                      <MdModeEdit className="text-xl" />
                    </button>
                  </td>

                  <td className="px-4 py-3 text-center">
                    {user.isBlocked ? (
                      <button
                        className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors duration-200"
                        title="Activate User"
                        onClick={() => updateUserInfo(user._id!, "activate")}
                      >
                        Blocked
                      </button>
                    ) : (
                      <button
                        className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-semibold hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors duration-200"
                        title="Block User"
                        onClick={() => updateUserInfo(user._id!, "block")}
                      >
                        Active
                      </button>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button
                      className="p-2 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200"
                      title="Delete User"
                      onClick={() => deleteUser(user._id!)}
                    >
                      <RiDeleteBinLine className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!isLoading && (!users || users.length === 0) && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400 text-lg">
              No users found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
