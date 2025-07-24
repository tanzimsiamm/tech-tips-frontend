"use client";

import { FaCheckCircle } from "react-icons/fa";
import { BsEnvelopeFill, BsThreeDots } from "react-icons/bs";
import { useAppSelector } from "@/src/redux/hooks";
import Image from "next/image";
import { MdModeEdit } from "react-icons/md";
import MyPosts from "../components/MyPosts";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { RiUserUnfollowLine } from "react-icons/ri";
import { useState, useEffect, useRef } from "react";
import EditProfileModal from "../components/EditProfileModal";
import Followers from "../components/Followers";
import {
  useFollowUserMutation,
  useGetSingleUserQuery,
  useUnFollowUserMutation,
} from "@/src/redux/features/user/userApi";
import CreatePost from "../../(home)/components/CreatePost";
import { TUser } from "@/src/types";

const ProfileMenu = ({ isOwnProfile, userEmail }: { isOwnProfile: boolean, userEmail: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShareProfile = () => {
    const profileLink = window.location.href;
    navigator.clipboard.writeText(profileLink)
      .then(() => toast.success("Profile link copied to clipboard!"))
      .catch(() => toast.error("Failed to copy link."));
    setIsOpen(false);
  };

  const handleReportUser = () => {
    toast.info(`Reporting user: ${userEmail}`);
    setIsOpen(false);
  };

  const handleBlockUser = () => {
    toast.info(`Blocking user: ${userEmail}`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 p-2 text-lg rounded-full ml-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <BsThreeDots />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-20 ring-1 ring-black ring-opacity-5">
          <button
            onClick={handleShareProfile}
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
          >
            Share Profile
          </button>
          {!isOwnProfile && (
            <>
              <button
                onClick={handleReportUser}
                className="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
              >
                Report User
              </button>
              <button
                onClick={handleBlockUser}
                className="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
              >
                Block User
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};


const Profile = ({ params }: { params: { userEmail: string } }) => {
  const { userEmail } = params;

  const loggedUser = useAppSelector((state) => state.auth.user) as TUser | null;
  const [editModal, setEditModal] = useState(false);

  const { data, isLoading, refetch } = useGetSingleUserQuery(userEmail);
  const userDetails: TUser = data?.data || {
    _id: "",
    email: "",
    name: "",
    image: "",
    coverImg: "",
    followers: [],
    following: [],
  };

  const {
    email,
    image,
    memberShip,
    name,
    coverImg,
    followers = [],
    following = [],
  } = userDetails;

  type PackageType = { name?: string };
  const packageInfo = memberShip?.package as PackageType | undefined;

  const [followUser, { isLoading: followLoading }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: unFollowLoading }] =
    useUnFollowUserMutation();

  const [followersData, setFollowersData] = useState<TUser[]>([]);
  const [followingData, setFollowingData] = useState<TUser[]>([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(false);


  useEffect(() => {
    const fetchUserData = async () => {
      if (followers.length === 0 && following.length === 0) return;

      setIsFetchingUsers(true);
      try {
        const fetchedFollowers = await Promise.all(
          followers.map(async (email: string) => {
            await new Promise(resolve => setTimeout(resolve, 100));
            return { email, name: `User ${email.split('@')[0]}`, image: "https://i.ibb.co/VtP9tF6/default-user-image.png" };
          })
        );
        setFollowersData(fetchedFollowers as TUser[]);

        const fetchedFollowing = await Promise.all(
          following.map(async (email: string) => {
            await new Promise(resolve => setTimeout(resolve, 100));
            return { email, name: `User ${email.split('@')[0]}`, image: "https://i.ibb.co/VtP9tF6/default-user-image.png" };
          })
        );
        setFollowingData(fetchedFollowing as TUser[]);

      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load followers/following data");
      } finally {
        setIsFetchingUsers(false);
      }
    };

    fetchUserData();
  }, [followers, following]);

  const handleFollow = async () => {
    try {
      if (!loggedUser?._id || !userDetails._id) return;

      const response: any = await followUser({
        userId: loggedUser._id,
        targetedUserId: userDetails._id,
      }).unwrap();

      if (response?.success) {
        toast.success("You followed the user");
        refetch();
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const handleUnfollow = async () => {
    try {
      if (!loggedUser?._id || !userDetails._id) return;

      const response: any = await unfollowUser({
        userId: loggedUser._id,
        targetedUserId: userDetails._id,
      }).unwrap();

      if (response?.success) {
        toast.success("You unfollowed the user");
        refetch();
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const isOwnProfile = loggedUser?.email === email;
  const isFollowing = followers?.some(
    (follower) => follower === loggedUser?.email
  );
  const isLoadingAction = followLoading || unFollowLoading;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-0 mb-4">
      {(isLoading || isFetchingUsers) && (
        <div className="absolute inset-0 z-10 bg-white/80 dark:bg-gray-800/90 rounded-xl flex justify-center items-center">
          <ClipLoader
            color="#3B82F6"
            size={38}
            aria-label="Loading Spinner"
            speedMultiplier={0.8}
          />
        </div>
      )}

      {editModal && (
        <EditProfileModal open={editModal} setOpen={setEditModal} />
      )}

      <div className="relative">
        <Image
          src={
            coverImg ||
            "https://placehold.co/1000x200/1DA1F2/FFFFFF?text=Cover+Photo"
          }
          alt="Cover"
          width={1000}
          height={200}
          className="w-full h-36 sm:h-48 md:h-56 object-cover rounded-t-xl"
        />
        <div className="absolute left-4 sm:left-6 -bottom-16 sm:-bottom-20 flex items-end space-x-4">
          <Image
            src={image || "https://i.ibb.co/VtP9tF6/default-user-image.png"}
            alt="Profile"
            width={120}
            height={120}
            className="size-28 sm:size-36 rounded-full border-4 border-white dark:border-gray-800 object-cover"
          />
        </div>
      </div>

      <div className="p-4 sm:p-6 pt-20 sm:pt-24 md:pt-28">
        <div className="flex justify-end mb-4">
          {isOwnProfile ? (
            <button
              onClick={() => setEditModal(true)}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 text-sm md:text-base rounded-full flex items-center font-semibold transition-colors duration-200"
            >
              <MdModeEdit className="mr-2 text-lg" />
              Edit Profile
            </button>
          ) : (
            <div className="flex items-center gap-3">
              {isFollowing ? (
                <button
                  onClick={handleUnfollow}
                  className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 text-sm md:text-base rounded-full flex items-center font-semibold gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoadingAction}
                >
                  {isLoadingAction ? (
                    <ClipLoader
                      color="#171A16"
                      size={16}
                      aria-label="Loading Spinner"
                      speedMultiplier={0.8}
                    />
                  ) : (
                    <RiUserUnfollowLine />
                  )}
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={handleFollow}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm md:text-base rounded-full flex items-center font-semibold gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoadingAction}
                >
                  {isLoadingAction ? (
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
              )}
              <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 text-sm md:text-base rounded-full flex items-center font-semibold transition-colors duration-200">
                <BsEnvelopeFill className="mr-2 text-lg" />
                Message
              </button>
            </div>
          )}
          <ProfileMenu isOwnProfile={isOwnProfile} userEmail={email} />
        </div>

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center text-gray-900 dark:text-white">
            {name}
            {memberShip && (
              <FaCheckCircle className="text-blue-500 ml-2 text-xl" />
            )}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base">{email}</p>
        </div>

        {memberShip && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-xl shadow-sm border border-blue-100 dark:border-blue-800">
            <h2 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">
              {packageInfo?.name || "Premium Member"}
            </h2>
            <div className="flex items-center justify-between">
              <div className="text-blue-600 dark:text-blue-400 font-bold text-xl">
                {(memberShip.package as { name?: string })?.name ||
                  "Premium Member"}
              </div>
              <span className="bg-blue-100 dark:bg-blue-800 py-1 px-3 rounded-full text-blue-700 dark:text-blue-200 text-sm font-semibold">
                {"Active"}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              Progress: 87% through the current membership period.
            </p>
          </div>
        )}

        <Followers
          followers={followersData}
          following={followingData}
          ranDomUserEmail={email}
        />

        {isOwnProfile && <CreatePost />}

        <MyPosts userEmail={email} />
      </div>
    </div>
  );
};

export default Profile;