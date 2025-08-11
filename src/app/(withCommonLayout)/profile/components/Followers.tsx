import Image from "next/image";
import { RiUserUnfollowLine } from "react-icons/ri";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import Link from "next/link";

import { useAppSelector } from "@/src/redux/hooks";
import { TUser } from "@/src/types";
import { useUnFollowUserMutation } from "@/src/redux/features/user/userApi";

interface TProps {
  followers: TUser[];
  following: TUser[];
  ranDomUserEmail: string;
}

const Followers = ({ followers, following, ranDomUserEmail }: TProps) => {
  const loggedUser = useAppSelector((state) => state.auth.user);
  const [unfollowUser, { isLoading: unFollowLoading }] =
    useUnFollowUserMutation();

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
    <div className="flex flex-col gap-4 mt-4">
      {/* Following Section */}
      {following?.length > 0 && (
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-300 dark:border-gray-700 relative">
          {unFollowLoading && (
            <div className="absolute inset-0 z-10 bg-white/80 dark:bg-gray-900/90 rounded-xl flex justify-center items-center">
              <ClipLoader
                aria-label="Loading Spinner"
                color="#3B82F6"
                size={38}
                speedMultiplier={0.8}
              />
            </div>
          )}

          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Following ({following?.length})
          </h2>
          <div className="space-y-4 max-h-48 overflow-y-auto scrollbar-hide">
            {following?.map((user) => (
              <div
                key={user?._id}
                className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0"
              >
                <Link
                  className="flex items-center space-x-3 group"
                  href={`/profile/${user?.email}`}
                >
                  <div className="w-10 h-10 flex-shrink-0">
                    <Image
                      alt={user?.name || "User"}
                      className="w-full h-full rounded-full object-cover border border-gray-300 dark:border-gray-600 group-hover:scale-105 transition-transform duration-200"
                      height={40}
                      src={
                        user?.image ||
                        "https://i.ibb.co/VtP9tF6/default-user-image.png"
                      }
                      width={40}
                    />
                  </div>
                  <p className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {user?.name}
                  </p>
                </Link>

                {loggedUser?.email === ranDomUserEmail && (
                  <button
                    className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-1 px-3 rounded-full text-sm font-semibold flex items-center gap-1 justify-center transition-colors duration-200"
                    disabled={unFollowLoading}
                    onClick={() => handleUnfollow(user?._id as string)}
                    aria-label={`Unfollow ${user?.name}`}
                  >
                    <RiUserUnfollowLine />
                    Unfollow
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Followers Section */}
      {followers?.length > 0 && (
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-300 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Followers ({followers?.length})
          </h2>
          <div className="space-y-4 max-h-48 overflow-y-auto scrollbar-hide">
            {followers?.map((follower) => (
              <div
                key={follower?._id}
                className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0"
              >
                <Link
                  className="flex items-center space-x-3 group"
                  href={`/profile/${follower?.email}`}
                >
                  <div className="w-10 h-10 flex-shrink-0">
                    <Image
                      alt={follower?.name || "User"}
                      className="w-full h-full rounded-full object-cover border border-gray-300 dark:border-gray-600 group-hover:scale-105 transition-transform duration-200"
                      height={40}
                      src={
                        follower?.image ||
                        "https://i.ibb.co/VtP9tF6/default-user-image.png"
                      }
                      width={40}
                    />
                  </div>
                  <p className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {follower?.name}
                  </p>
                </Link>
                {/* No follow/unfollow button for followers list */}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No content message */}
      {following?.length === 0 && followers?.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-lg">
          No followers or following to display.
        </div>
      )}
    </div>
  );
};

export default Followers;
