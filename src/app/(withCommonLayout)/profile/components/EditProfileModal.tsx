/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { FaPen, FaCheckCircle, FaTimes } from 'react-icons/fa'; // Added FaTimes for close icon
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setUser } from "@/src/redux/features/authentication/authSlice";
import { useGetSingleUserQuery, useUpdateUserMutation } from "@/src/redux/features/user/userApi";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { MdPhotoCamera } from "react-icons/md";
import uploadImage from "@/src/utils/uploadImage";
import { TUser } from "@/src/types";


type TModalProps = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


export default function EditProfileModal({ open, setOpen }: TModalProps) {

  const { register, handleSubmit, reset } = useForm();
  const [updateUser] = useUpdateUserMutation();
  const currentUser = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth)
  const [coverPreview, setCoverPreview] = useState("")
  const [profilePreview, setProfilePreview] = useState("")
  const [submitLoading, setSubmitLoading] = useState(false);


  const { data, isSuccess, isLoading: dataGettingLoading } = useGetSingleUserQuery(currentUser?.email as string);
  const userFromDB: TUser = data?.data;


  useEffect(() => {
    if (isSuccess && userFromDB) {
      reset({
        name: userFromDB.name,
      });
      setCoverPreview(userFromDB.coverImg || "");
      setProfilePreview(userFromDB.image || "");
    }
  }, [reset, userFromDB, isSuccess]);

  const [profileImageFile, setProfileImage] = useState<File | undefined>(undefined);
  const [coverImageFile, setCoverImage] = useState<File | undefined>(undefined);


  const onSubmit = async (data: any) => {
    setSubmitLoading(true);
    let coverImage: string | undefined;
    let profileImage: string | undefined;

    if (coverImageFile) {
      coverImage = await uploadImage(coverImageFile);
    } else {
      coverImage = userFromDB?.coverImg;
    }

    if (profileImageFile) {
      profileImage = await uploadImage(profileImageFile);
    } else {
      profileImage = userFromDB?.image;
    }

    const userNewData = {
      userId: currentUser?._id as string,
      payload: {
        name: data.name,
        image: profileImage,
        coverImg: coverImage,
      }
    }

    try {
      const response: any = await updateUser(userNewData).unwrap();

      if (response?.success) {
        dispatch(setUser({
          ...auth, user: {
            ...auth.user,
            name: response?.data?.name,
            image: response?.data?.image,
            coverImg: response?.data?.coverImg
          }
        }))
        setOpen(false)
        toast.success('Profile updated successfully!')
        setSubmitLoading(false)
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.log(error)
      setSubmitLoading(false)
    }
  }

  const handleCoverPreview = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="fixed inset-0 z-50 bg-black/40 dark:bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 overflow-y-auto">

      <form className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl relative flex flex-col" onSubmit={handleSubmit(onSubmit)}>

        {(submitLoading || dataGettingLoading) && (
          <div className="absolute inset-0 z-50 bg-white/80 dark:bg-gray-900/80 rounded-2xl flex justify-center items-center">
            <ClipLoader
              color='#3B82F6'
              loading={true}
              size={60}
              aria-label="Loading Spinner"
              speedMultiplier={0.8}
            />
          </div>
        )}

        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors duration-200"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto">
          {/* Cover Image Section */}
          <div className="relative w-full h-36 bg-gray-200 dark:bg-gray-700 rounded-t-xl">
            <Image
              src={coverPreview || (userFromDB?.coverImg || 'https://placehold.co/600x150/E2E8F0/FFFFFF?text=Cover+Image')}
              alt="Cover"
              width={600}
              height={150}
              className="w-full h-full object-cover rounded-t-xl"
            />
            <label htmlFor='cover-upload' className="absolute bottom-3 right-3 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full cursor-pointer transition-colors duration-200">
              <MdPhotoCamera className="text-2xl" />
              <input id="cover-upload" onChange={handleCoverPreview} type="file" className="hidden" accept="image/*" />
            </label>
          </div>

          {/* Profile Image and User Info */}
          <div className="relative -mt-16 ml-4 sm:ml-6 flex items-end space-x-4 pb-4">
            <div className="relative size-28 sm:size-32 rounded-full border-4 border-white dark:border-gray-800 bg-gray-300 dark:bg-gray-700 flex-shrink-0">
              <Image
                src={profilePreview || (userFromDB?.image || 'https://i.ibb.co/VtP9tF6/default-user-image.png')}
                alt="Profile"
                width={128}
                height={128}
                className="w-full h-full rounded-full object-cover"
              />
              <label htmlFor='profile-upload' className="absolute bottom-0 right-0 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full cursor-pointer transition-colors duration-200">
                <MdPhotoCamera className="text-xl" />
                <input id="profile-upload" onChange={handleProfilePreview} type="file" className="hidden" accept="image/*" />
              </label>
            </div>
            <div className="mb-2">
              <h1 className="text-xl sm:text-2xl font-bold flex items-center text-gray-900 dark:text-white">
                {userFromDB?.name}
                {userFromDB?.memberShip && <FaCheckCircle className="text-blue-500 ml-2 text-lg" />}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{userFromDB?.email}</p>
            </div>
          </div>

          {/* Name Input */}
          <div className="p-6 pt-0 space-y-6">
            <div className="flex items-center space-x-3">
              <FaPen className="text-blue-500 text-xl flex-shrink-0" />
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Full name"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 flex justify-end space-x-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-6 py-2 text-base font-semibold rounded-full text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-base font-semibold rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            disabled={submitLoading || dataGettingLoading}
          >
            {(submitLoading || dataGettingLoading) ? (
              <ClipLoader
                color='#ffffff'
                loading={true}
                size={20}
                aria-label="Loading Spinner"
                speedMultiplier={0.8}
              />
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </section>
  )
}
