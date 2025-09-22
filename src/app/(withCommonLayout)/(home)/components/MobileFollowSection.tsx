// components/MobileFollowSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useFollowUserMutation,
  useGetSingleUserQuery,
  useGetUsersQuery,
  useUnFollowUserMutation,
} from "@/src/redux/features/user/userApi";
import { useAppSelector } from "@/src/redux/hooks";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { FaUserPlus } from "react-icons/fa6";
import { RiUserUnfollowLine } from "react-icons/ri";
import { TUser } from "@/src/types";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

const MobileFollowSection = () => {
  const [activeTab, setActiveTab] = useState<"following" | "suggestions">(
    "following"
  );
  const router = useRouter();
  const loggedUser = useAppSelector((state) => state.auth.user);
  const { data } = useGetSingleUserQuery(loggedUser?.email as string);
  const { data: allUserData } = useGetUsersQuery({ role: "user" });

  const userDetails: TUser = data?.data || {};

  const [followUser, { isLoading: followLoading }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: unFollowLoading }] =
    useUnFollowUserMutation();

  const totalUsers: TUser[] = allUserData?.data || [];
  const filterUsers: TUser[] = totalUsers
    .filter((user: TUser) => {
      const result = userDetails?.following?.find(
        (followingUser: string | TUser) =>
          typeof followingUser === "string"
            ? user?.email === followingUser
            : user?.email === (followingUser as TUser)?.email
      );
      if (!result) return user;
    })
    .filter((user: TUser) => user.email !== loggedUser?.email);

  const handleFollow = async (targetedId: any) => {
    try {
      const response = await followUser({
        userId: loggedUser?._id as string,
        targetedUserId: targetedId,
      });
      if (response && "data" in response && response.data?.success) {
        toast.success("You followed the user");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const handleUnfollow = async (targetedId: any) => {
    try {
      const response = await unfollowUser({
        userId: loggedUser?._id as string,
        targetedUserId: targetedId,
      });
      if (response && "data" in response && response.data?.success) {
        toast.success("You unfollowed the user");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <>
      {/* Show warning on PC devices */}
      <div className="hidden lg:flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <h1 className="text-3xl md:text-5xl font-bold text-red-600 text-center px-6">
          🚫 This page is for{" "}
          <span className="text-blue-600">Small Devices</span> only.
          <br />
          👉 Please go to{" "}
          <Link href="/" className="underline text-blue-500">
            Newsfeed
          </Link>
          .
        </h1>
      </div>

      {/* Mobile layout */}
      <div className="lg:hidden min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <IoArrowBack size={20} />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Connections
          </h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === "following"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("following")}
          >
            Following ({userDetails?.following?.length || 0})
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === "suggestions"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("suggestions")}
          >
            Suggestions ({filterUsers.length})
          </button>
        </div>

        {/* Content */}
        <div className="space-y-3">
          {activeTab === "following" ? (
            <div className="relative">
              {unFollowLoading && (
                <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/90 rounded-md flex justify-center items-center z-10">
                  <ClipLoader color="#3B82F6" size={30} speedMultiplier={0.8} />
                </div>
              )}

              {userDetails?.following?.length ? (
                userDetails.following.map((user: any) => (
                  <div
                    key={user?._id}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                  >
                    <Link
                      href={`/profile/${user?.email}`}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-12 h-12">
                        <Image
                          width={48}
                          height={48}
                          src={user?.image}
                          alt={user?.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {user?.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          @{user?.email.split("@")[0]}
                        </p>
                      </div>
                    </Link>

                    <button
                      onClick={() => handleUnfollow(user?._id)}
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-red-500 px-3 py-1.5 rounded-full text-sm font-medium flex items-center"
                    >
                      <RiUserUnfollowLine className="mr-1" size={14} />
                      Unfollow
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400">
                    You're not following anyone yet.
                  </p>
                  <button
                    onClick={() => setActiveTab("suggestions")}
                    className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Discover people to follow
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              {followLoading && (
                <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/90 rounded-md flex justify-center items-center z-10">
                  <ClipLoader color="#3B82F6" size={30} speedMultiplier={0.8} />
                </div>
              )}

              {filterUsers.length ? (
                filterUsers.map((user: TUser) => (
                  <div
                    key={user?._id}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                  >
                    <Link
                      href={`/profile/${user?.email}`}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-12 h-12">
                        <Image
                          width={48}
                          height={48}
                          src={user?.image}
                          alt={user?.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {user?.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          @{user?.email.split("@")[0]}
                        </p>
                      </div>
                    </Link>

                    <button
                      onClick={() => handleFollow(user?._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center"
                    >
                      <FaUserPlus className="mr-1" size={14} />
                      Follow
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400">
                    No suggestions available.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileFollowSection;
