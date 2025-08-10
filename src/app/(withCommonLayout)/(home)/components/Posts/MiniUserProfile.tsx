import { FaEnvelope, FaUser } from "react-icons/fa";
import Image from "next/image";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import Link from "next/link";
import { RiUserUnfollowLine } from "react-icons/ri";

import {
  useFollowUserMutation,
  useGetSingleUserQuery,
  useUnFollowUserMutation,
} from "@/src/redux/features/user/userApi";
import { useAppSelector } from "@/src/redux/hooks";
import { TUser } from "@/src/types";

const MiniUserProfile = ({
  userInfo,
}: {
  userInfo: {
    email: string;
    image: string;
    name: string;
    role: string;
    authorId: string;
    authorEmail: string;
  };
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const [followUser, { isLoading: followLoading }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: unFollowLoading }] = useUnFollowUserMutation();

  const { data } = useGetSingleUserQuery(userInfo?.authorEmail);
  const latestAuthorData: TUser = data?.data || {};

  const handleFollow = async () => {
    try {
      const response = await followUser({
        userId: user?._id as string,
        targetedUserId: userInfo.authorId,
      });

      if ("data" in response && response.data?.success) {
        toast.success("You followed the user");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await unfollowUser({
        userId: user?._id as string,
        targetedUserId: userInfo.authorId,
      });

      if ("data" in response && response.data?.success) {
        toast.success("You unfollowed the user");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <section className="hidden absolute top-8 left-0 group-hover:block z-50">
      <div className="mt-7">
        <div className="bg-white dark:bg-gray-900 shadow-2xl border-t-4 border-gray-100 dark:border-gray-700 rounded-lg w-80 p-4 transition-colors duration-300">
          <div className="flex items-center">
            {userInfo?.image ? (
              <Image
                alt="User"
                className="w-16 h-16 rounded-full object-cover mr-4"
                height={300}
                src={userInfo.image}
                width={300}
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700 mr-4 flex items-center justify-center text-gray-600 dark:text-gray-400">
                <FaUser size={24} />
              </div>
            )}
            <div>
              <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100">{userInfo?.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 flex items-center capitalize">
                <FaUser className="mr-2" /> {userInfo?.role}
              </p>
              <p className="text-gray-500 dark:text-gray-400 flex items-center break-all">
                <FaEnvelope className="mr-2" /> {userInfo?.email}
              </p>
            </div>
          </div>

          {user?.email === userInfo?.email ? (
            <div className="flex mt-4 space-x-2">
              <button className="flex-1 font-semibold bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                Create Post
              </button>
              <Link href={`/profile/${userInfo?.email}`}>
                <button className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-1 px-4 rounded-full font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                  View Profile
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex mt-4 space-x-2">
              {latestAuthorData?.followers?.some(
                (follower) => follower === user?.email
              ) ? (
                <button
                  className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-1 px-4 rounded-full font-semibold flex items-center gap-2 justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                  onClick={handleUnfollow}
                  disabled={followLoading || unFollowLoading}
                >
                  {!followLoading && !unFollowLoading && <RiUserUnfollowLine />}
                  {followLoading || unFollowLoading ? (
                    <ClipLoader
                      aria-label="Loading Spinner"
                      color="#171A16"
                      size={16}
                      speedMultiplier={0.8}
                    />
                  ) : (
                    "Unfollow"
                  )}
                </button>
              ) : (
                <button
                  className="flex-1 font-semibold bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleFollow}
                  disabled={followLoading || unFollowLoading}
                >
                  {followLoading || unFollowLoading ? (
                    <ClipLoader
                      aria-label="Loading Spinner"
                      color="#ffffff"
                      size={16}
                      speedMultiplier={0.8}
                    />
                  ) : (
                    "Follow"
                  )}
                </button>
              )}

              <Link href={`/profile/${userInfo?.email}`}>
                <button className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-1 px-4 rounded-full font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                  View Profile
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MiniUserProfile;
