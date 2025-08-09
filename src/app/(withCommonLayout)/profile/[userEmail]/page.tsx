'use client'

import { FaCheckCircle } from 'react-icons/fa';
import { BsEnvelopeFill, BsThreeDots } from 'react-icons/bs';
import { useFollowUserMutation, useGetSingleUserQuery, useUnFollowUserMutation } from '@/src/redux/features/user/userApi';
import { useAppSelector } from '@/src/redux/hooks';
import Image from 'next/image';
import { MdModeEdit } from "react-icons/md";
import MyPosts from '../components/MyPosts';
import { ClipLoader } from 'react-spinners';
import { toast } from 'sonner';
import { RiUserUnfollowLine } from "react-icons/ri";
import { useState } from 'react';
import EditProfileModal from '../components/EditProfileModal';
import Followers from '../components/Followers';
import { TUser } from '@/src/types';
import CreatePost from '../../(home)/components/CreatePost';

const Profile = ({ params }: { params: { userEmail: string } }) => {
  const { userEmail } = params;
  const loggedUser = useAppSelector(state => state.auth.user);
  const [editModal, setEditModal] = useState(false);

  const { data } = useGetSingleUserQuery(userEmail);
  const userDetails: TUser = data?.data || {};

  const { email, image, memberShip, name, coverImg, followers, following } = userDetails;

  // follow and unfollow 
  const [followUser, { isLoading: followLoading }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: unFollowLoading }] = useUnFollowUserMutation();

  const handleFollow = async () => {
    try {
      const response = await followUser({
        userId: loggedUser?._id as string,
        targetedUserId: userDetails?._id as string,
      });
      if (response?.success) {
        toast.success('You followed the user');
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await unfollowUser({
        userId: loggedUser?._id as string,
        targetedUserId: userDetails?._id as string,
      });
      if (response?.success) {
        toast.success('You unfollowed the user');
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="md:bg-white dark:bg-gray-800/50 p-4 rounded-lg shadow-sm max-w-4xl mx-auto">
      {/* Cover Photo */}
      <div className="relative rounded-t-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
        <Image
          src={coverImg || 'https://i.ibb.co.com/mqccxqc/minimalist-purple-mountains-sunset-wallpaper.jpg'}
          alt="Cover"
          width={1200}
          height={400}
          className="w-full h-40 md:h-56 object-cover"
        />
        
        <div className="relative z-20 flex items-end px-4 md:px-6 -mt-16 md:-mt-20 space-x-4">
          <div className="relative">
            <Image
              src={image || '/default-avatar.png'}
              alt="Profile"
              width={144}
              height={144}
              className="size-20 md:size-32 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-md"
            />
          </div>
          <div className="pb-2 md:pb-4">
            <h1 className="text-xl md:text-3xl font-bold text-white dark:text-white flex items-center">
              {name}
              {memberShip && <FaCheckCircle className="text-blue-400 ml-2" />}
            </h1>
            <p className="text-gray-200 dark:text-gray-300">{email}</p>
          </div>
        </div>
      </div>

      {/* Open Edit Modal */}
      {editModal && <EditProfileModal open={editModal} setOpen={setEditModal} />}

      {/* Profile Actions */}
      <div className="flex justify-between items-center mt-4 px-2">
        {loggedUser?.email !== userDetails.email ? (
          <div className="flex items-center gap-3">
            {userDetails?.followers?.find(follower => follower?.email === loggedUser?.email) ? (
              <button
                onClick={handleUnfollow}
                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center font-medium gap-2 transition-colors duration-200"
                disabled={followLoading || unFollowLoading}
              >
                {!(followLoading || unFollowLoading) && <RiUserUnfollowLine />}
                {(followLoading || unFollowLoading) ? (
                  <ClipLoader
                    color='#6B7280'
                    size={16}
                    aria-label="Loading Spinner"
                    speedMultiplier={0.8}
                  />
                ) : 'Unfollow'}
              </button>
            ) : (
              <button
                onClick={handleFollow}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center font-medium gap-2 transition-colors duration-200"
                disabled={followLoading || unFollowLoading}
              >
                {(followLoading || unFollowLoading) ? (
                  <ClipLoader
                    color='#ffffff'
                    size={16}
                    aria-label="Loading Spinner"
                    speedMultiplier={0.8}
                  />
                ) : 'Follow'}
              </button>
            )}

            <button className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg flex items-center font-medium transition-colors duration-200">
              <BsEnvelopeFill className="mr-2" />
              Message
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditModal(true)}
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg flex items-center font-medium transition-colors duration-200"
            >
              <MdModeEdit className="mr-2" />
              Edit Profile
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 p-2 rounded-lg hidden md:block">
              <BsThreeDots />
            </button>
          </div>
        )}
      </div>

      {/* Followers/Following Section */}
      <Followers followers={followers} following={following} ranDomUserEmail={userDetails?.email} />

      {/* Membership Section */}
      {memberShip && (
        <div className={`mt-6 mb-6 p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/50 dark:to-orange-800/50 rounded-lg shadow-inner`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-orange-800 dark:text-orange-200">Premium Membership</h2>
              <p className="text-orange-600 dark:text-orange-300 mt-1">{memberShip?.package?.name}</p>
            </div>
            <span className="bg-orange-200 dark:bg-orange-700 text-orange-800 dark:text-orange-200 py-1 px-3 rounded-full text-sm font-semibold">
              Designer
            </span>
          </div>
          <div className="mt-3">
            <div className="w-full bg-orange-200 dark:bg-orange-800 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full" 
                style={{ width: '87%' }}
              ></div>
            </div>
            <p className="text-right text-sm text-orange-600 dark:text-orange-300 mt-1">
              87% complete
            </p>
          </div>
        </div>
      )}

      {/* Create Post Section */}
      {loggedUser?.email === userDetails?.email && <CreatePost />}

      {/* User Posts */}
      <div className="mt-8">
        <MyPosts userEmail={userDetails?.email} />
      </div>
    </div>
  );
};

export default Profile;