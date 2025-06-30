/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FieldValues, useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { GoUnlock } from "react-icons/go";
import { PiImage } from "react-icons/pi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSignUpMutation } from "@/src/redux/features/authentication/authApi";
import uploadImage from "@/src/utils/uploadImage";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [signUp] = useSignUpMutation();
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState("");

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);

    const imageURL = await uploadImage(data.image);
    if (!imageURL) {
      toast.error("Image not uploaded");
      setLoading(false);
      return;
    }

    const userData = {
      ...data,
      role: "user",
      image: imageURL,
    };

    const result: any = await signUp({
      ...userData,
      role: "user",
    });

    if (result?.error?.data?.message) {
      toast.error("Email is already exist");
      setLoading(false);
      return;
    } else if (result?.data?.success) {
      toast.success("Registered Successfully! Please Login");
      router.push("/login");
    }
    setLoading(false);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-6">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full py-3 pl-12 pr-4 outline-none border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-300"
                  {...register("name", {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                  })}
                />
                <span className="text-xl absolute left-4 text-gray-500 dark:text-gray-400">
                  <IoPersonOutline />
                </span>
              </div>
              {errors.name && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.name.type === "required" && "Name is required"}
                  {errors.name.type === "minLength" &&
                    "Name Must Have 3 Characters"}
                  {errors.name.type === "maxLength" &&
                    "Name Maximum 20 Characters"}
                </span>
              )}
            </div>

            <div>
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full py-3 pl-12 pr-4 outline-none border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-300"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                <span className="text-xl absolute left-4 text-gray-500 dark:text-gray-400">
                  <AiOutlineMail />
                </span>
              </div>
              {errors.email && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.email.type === "required" && "Email is required"}
                  {errors.email.type === "pattern" &&
                    "Please input a valid email"}
                </span>
              )}
            </div>

            <div>
              <div className="relative flex items-center">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full py-3 pl-12 pr-4 outline-none border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-300"
                  {...register("password", {
                    required: true,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,8}$/,
                  })}
                />
                <span className="text-xl absolute left-4 text-gray-500 dark:text-gray-400">
                  <GoUnlock />
                </span>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.password.type === "required" &&
                    "Password is required"}
                  {errors.password.type === "pattern" &&
                    "Min 1 uppercase, 1 lowercase, 1 special char, 1 number, 6-8 chars."}
                </span>
              )}
            </div>

            <div>
              <div className="relative flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 transition-colors duration-200 cursor-pointer overflow-hidden">
                <input
                  {...register("image", { required: true })}
                  onChange={handleImageChange}
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                />
                {imagePreview ? (
                  <div className="relative w-full h-24 flex items-center justify-center p-2">
                    <Image
                      width={96}
                      height={96}
                      alt="preview"
                      className="size-20 object-cover rounded-md"
                      src={imagePreview}
                    />
                    <span className="ml-4 text-gray-600 dark:text-gray-300 text-sm">
                      Image Selected
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-4 text-gray-500 dark:text-gray-400">
                    <PiImage className="text-3xl mb-1" />
                    <span className="text-sm">
                      Upload Profile Image (Required)
                    </span>
                  </div>
                )}
              </div>
              {errors.image && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.image.type === "required" && "Image is required"}
                </span>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium text-sm cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500"
                  {...register("terms", { required: true })}
                />
                I agree to the Terms and Conditions
              </label>
              {errors.terms && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.terms.type === "required" &&
                    "You must agree to the terms"}
                </span>
              )}
            </div>

            {/* <SocialLogin /> */}

            <div>
              <button
                className="w-full justify-center py-3 px-4 text-base font-semibold rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader
                    color="#ffffff"
                    loading={loading}
                    size={25}
                    aria-label="Loading Spinner"
                    speedMultiplier={0.8}
                  />
                ) : (
                  "Create Account"
                )}
              </button>
            </div>

            <div className="mt-6 text-center">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 transition-colors duration-200"
                >
                  Log In
                </Link>
              </h4>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
