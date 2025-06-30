/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import { RiUserUnfollowLine } from "react-icons/ri";
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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSendNotificationMutation } from "@/src/redux/features/notification/notificationApi";
import { TUser } from "@/src/types";

const RightSidebar = () => {
  const loggedUser = useAppSelector((state) => state.auth.user);
  const { data } = useGetSingleUserQuery(loggedUser?.email as string);
  const { data: allUserData } = useGetUsersQuery({ role: "user" });

  const [sendNotification, { isSuccess }] = useSendNotificationMutation();

  const userDetails: TUser = data?.data || {
    _id: "",
    name: "",
    email: "",
    role: "",
    image: "",
    followers: [],
    following: [],
    memberShip: null,
  };

  const pathName = usePathname();

  const [followUser, { isLoading: followLoading }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: unFollowLoading }] =
    useUnFollowUserMutation();

  const totalUsers: TUser[] = allUserData?.data || [];

  // Find full user objects for the following list
  const followingUsers =
    userDetails?.following
      ?.map((followingId) => {
        return totalUsers.find((user) => user._id === followingId);
      })
      .filter((user): user is TUser => user !== undefined) || [];

  const filterUsers: TUser[] = totalUsers.filter((user: TUser) => {
    const isFollowing = followingUsers.some(
      (followingUser) => user?._id === followingUser?._id
    );
    return !isFollowing && user.email !== loggedUser?.email;
  });

  const handleFollow = async (targetedId: string) => {
    try {
      const response: any = await followUser({
        userId: loggedUser?._id as string,
        targetedUserId: targetedId,
      });
      if (response?.data?.success) {
        toast.success("You followed the user");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const handleUnfollow = async (targetedId: string) => {
    try {
      const response: any = await unfollowUser({
        userId: loggedUser?._id as string,
        targetedUserId: targetedId,
      });
      if (response?.data?.success) {
        toast.success("You unfollowed the user");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <>
      {(pathName?.includes("profile") || pathName === "/") && loggedUser && (
        <div className="w-full lg:w-64 xl:w-72 space-y-4">
          {followingUsers?.length > 0 && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Following ({followingUsers?.length})
              </h2>
              <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-hide relative">
                {unFollowLoading && (
                  <div className="absolute inset-0 z-10 bg-white/80 dark:bg-gray-800/90 rounded-xl flex justify-center items-center">
                    <ClipLoader
                      color="#3B82F6"
                      size={38}
                      aria-label="Loading Spinner"
                      speedMultiplier={0.8}
                    />
                  </div>
                )}
                {followingUsers?.map((user) => (
                  <div
                    key={user?._id}
                    className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 last:pb-0"
                  >
                    <Link
                      href={`/profile/${user?.email}`}
                      className="flex items-center space-x-3 group"
                    >
                      <div className="size-10 flex-shrink-0">
                        <Image
                          width={40}
                          height={40}
                          src={
                            user?.image ||
                            "https://i.ibb.co/VtP9tF6/default-user-image.png"
                          }
                          alt={user?.name || "User"}
                          className="w-full h-full rounded-full object-cover border border-gray-300 dark:border-gray-600 group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <p className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {user?.name}
                      </p>
                    </Link>
                    <button
                      onClick={() => handleUnfollow(user?._id as string)}
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-1 px-3 rounded-full text-sm font-semibold flex items-center gap-1 justify-center transition-colors duration-200"
                      disabled={unFollowLoading}
                    >
                      <RiUserUnfollowLine />
                      Unfollow
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              People you can follow
            </h2>
            <div className="space-y-4 max-h-[525px] overflow-y-auto scrollbar-hide relative">
              {followLoading && (
                <div className="absolute inset-0 z-10 bg-white/80 dark:bg-gray-800/90 rounded-xl flex justify-center items-center">
                  <ClipLoader
                    color="#3B82F6"
                    size={38}
                    aria-label="Loading Spinner"
                    speedMultiplier={0.8}
                  />
                </div>
              )}
              {filterUsers?.map((user: TUser) => (
                <div
                  key={user?._id}
                  className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 last:pb-0"
                >
                  <Link
                    href={`/profile/${user?.email}`}
                    className="flex items-center space-x-3 group"
                  >
                    <div className="size-10 flex-shrink-0">
                      <Image
                        width={40}
                        height={40}
                        src={
                          user?.image ||
                          "https://i.ibb.co/VtP9tF6/default-user-image.png"
                        }
                        alt={user?.name || "User"}
                        className="w-full h-full rounded-full object-cover border border-gray-300 dark:border-gray-600 group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <p className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {user?.name}
                    </p>
                  </Link>
                  <button
                    onClick={() => handleFollow(user?._id as string)}
                    className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-1 px-3 rounded-full text-sm font-semibold flex items-center gap-1 justify-center transition-colors duration-200"
                    disabled={followLoading}
                  >
                    <FaUserPlus /> Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RightSidebar;
