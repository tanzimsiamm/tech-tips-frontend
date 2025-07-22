import { FaEnvelope, FaUser } from "react-icons/fa";
import Image from "next/image";
import { useAppSelector } from "@/src/redux/hooks";
import {
  useFollowUserMutation,
  useGetSingleUserQuery,
  useUnFollowUserMutation,
} from "@/src/redux/features/user/userApi";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import Link from "next/link";
import { RiUserUnfollowLine } from "react-icons/ri";
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
  const [unfollowUser, { isLoading: unFollowLoading }] =
    useUnFollowUserMutation();

  // get the authorData to check if the currentUser follows him or not
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
      console.log(error);
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
      console.log(error);
    }
  };

  return (
    <section className="hidden absolute top-8 left-0 group-hover:block z-50">
      <div className=" mt-7">
        <div className=" bg-white dark:bg-gray-900 shadow-2xl border-t-4 border-gray-100 dark:border-gray-700 rounded-lg w-80 p-4">
          <div className="flex items-center">
            {userInfo?.image ? (
              <Image
                width={300}
                height={300}
                src={userInfo.image}
                alt="User"
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-300 mr-4 flex items-center justify-center text-gray-600">
                <FaUser size={24} />
              </div>
            )}
            <div>
              <h2 className="font-bold text-lg">{userInfo?.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 flex items-center capitalize">
                <FaUser className="mr-2" /> {userInfo?.role}
              </p>
              <p className="text-gray-500 dark:text-gray-400 flex items-center">
                <FaEnvelope className="mr-2" /> {userInfo?.email}
              </p>
            </div>
          </div>

          {/* for myself  */}
          {user?.email === userInfo?.email ? (
            <div className="flex mt-4 space-x-2">
              <button className="flex-1 font-semibold bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-full">
                Create Post
              </button>
              <Link href={`/profile/${userInfo?.email}`}>
                <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-4 rounded-full font-semibold">
                  View Profile
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex mt-4 space-x-2">
              {/* for another user  */}
              {latestAuthorData?.followers?.find(
                (follower) => follower === user?.email
              ) ? (
                <>
                  <button
                    onClick={handleUnfollow}
                    className="flex-1 bg-gray-200 hover:bg-gray-300  text-gray-700 py-1 px-4 rounded-full font-semibold flex items-center gap-1 justify-center"
                  >
                    {!(followLoading || unFollowLoading) && (
                      <RiUserUnfollowLine />
                    )}{" "}
                    {followLoading || unFollowLoading ? (
                      <ClipLoader
                        color="#171A16"
                        size={16}
                        aria-label="Loading Spinner"
                        speedMultiplier={0.8}
                      />
                    ) : (
                      "Unfollow"
                    )}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleFollow}
                    className="flex-1 font-semibold bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-full"
                  >
                    {followLoading || unFollowLoading ? (
                      <ClipLoader
                        color="#ffffff"
                        size={16}
                        aria-label="Loading Spinner"
                        speedMultiplier={0.8}
                      />
                    ) : (
                      "Follow"
                    )}
                  </button>
                </>
              )}

              <Link href={`/profile/${userInfo?.email}`}>
                <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-4 rounded-full font-semibold">
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
