"use client";

import { FaUserFriends, FaUserPlus } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

import { useGetSingleUserQuery } from "@/src/redux/features/user/userApi";
import { useAppSelector } from "@/src/redux/hooks";
import { TUserForMyFollowers } from "@/src/types";

const MyFollowers = () => {
  const loggedUser = useAppSelector((state) => state.auth.user);

  const { data } = useGetSingleUserQuery(loggedUser?.email as string);
  const userDetails: TUserForMyFollowers = data?.data || {};
  const { followers, following } = userDetails;

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
        Your Network
      </h1>

      {/* Followers Table */}
      <div className="bg-white dark:bg-gray-900 shadow-sm rounded-xl p-4 sm:p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center mb-4">
          <FaUserFriends className="mr-3 text-blue-500" />
          Followers ({followers?.length || 0})
        </h2>

        {followers && followers.length > 0 ? (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {followers?.map((follower) => (
                  <tr
                    key={follower?._id}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                  >
                    <td className="p-4">
                      <Link href={`/profile/${follower?.email}`}>
                        <Image
                          alt={follower?.name || "User"}
                          className="size-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                          height={40}
                          src={
                            follower?.image ||
                            "https://i.ibb.co/VtP9tF6/default-user-image.png"
                          }
                          width={40}
                        />
                      </Link>
                    </td>
                    <td className="p-4 text-gray-900 dark:text-white font-medium">
                      <Link
                        className="hover:underline"
                        href={`/profile/${follower?.email}`}
                      >
                        {follower?.name}
                      </Link>
                    </td>
                    <td className="p-4 text-gray-700 dark:text-gray-300 text-sm">
                      {follower?.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No followers yet.
          </p>
        )}
      </div>

      {/* Following Table */}
      <div className="bg-white dark:bg-gray-900 shadow-sm rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center mb-4">
          <FaUserPlus className="mr-3 text-blue-500" />
          Following ({following?.length || 0})
        </h2>

        {following && following.length > 0 ? (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {following?.map((followedUser) => (
                  <tr
                    key={followedUser?._id}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                  >
                    <td className="p-4">
                      <Link href={`/profile/${followedUser?.email}`}>
                        <Image
                          alt={followedUser?.name || "User"}
                          className="size-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                          height={40}
                          src={
                            followedUser?.image ||
                            "https://i.ibb.co/VtP9tF6/default-user-image.png"
                          }
                          width={40}
                        />
                      </Link>
                    </td>
                    <td className="p-4 text-gray-900 dark:text-white font-medium">
                      <Link
                        className="hover:underline"
                        href={`/profile/${followedUser?.email}`}
                      >
                        {followedUser?.name}
                      </Link>
                    </td>
                    <td className="p-4 text-gray-700 dark:text-gray-300 text-sm">
                      {followedUser?.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            Not following anyone yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyFollowers;
