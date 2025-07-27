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

    try {
      const imageFile = data.image?.[0];
      if (!imageFile && !imagePreview) {
        toast.error("Please select an image to upload.");
        setLoading(false);
        return;
      }

      const imageURL = imagePreview
        ? await uploadImage(imageFile)
        : await uploadImage(data.image[0]);

      if (!imageURL) {
        toast.error("Image upload failed. Please try again.");
        setLoading(false);
        return;
      }

      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        image: imageURL,
        role: "user",
      };

      const result: any = await signUp(userData);

      if (result?.error) {
        const errorMsg =
          result.error.data?.message ||
          result.error.error ||
          "Registration failed. Please try again.";
        toast.error(errorMsg);
        setLoading(false);
        return;
      }

      if (result?.data?.success) {
        toast.success("Registered Successfully! Please Login");
        router.push("/login");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err: any) {
      toast.error("Unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Set the value for react-hook-form
      const setValue = register("image").onChange; // Get the onChange from register
      setValue(e);
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
            {/* Name */}
            <div>
              <div className="relative flex items-center">
                <input
                  className="w-full py-3 pl-12 pr-4 outline-none border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-300"
                  placeholder="Testa Model X"
                  type="text"
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
                    "Name must have at least 3 characters"}
                  {errors.name.type === "maxLength" &&
                    "Name must be less than 20 characters"}
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <div className="relative flex items-center">
                <input
                  className="w-full py-3 pl-12 pr-4 outline-none border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-300"
                  placeholder="ok@example.com"
                  type="email"
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
                    "Please enter a valid email"}
                </span>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative flex items-center">
                <input
                  className="w-full py-3 pl-12 pr-4 outline-none border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-300"
                  placeholder="Password"
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
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
                  {errors.password.type === "minLength" &&
                    "Password must be at least 6 characters"}
                </span>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <div className="relative flex flex-col items-center justify-center border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 transition-colors duration-200 overflow-hidden p-4">
                {imagePreview ? (
                  <div className="flex flex-col items-center gap-3">
                    <Image
                      alt="preview"
                      className="size-20 object-cover rounded-md"
                      height={96}
                      src={imagePreview}
                      width={96}
                    />
                    <button
                      className="px-4 py-1 text-sm rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                      type="button"
                      onClick={() => {
                        setImagePreview("");
                        const fileInput = document.getElementById(
                          "image-upload"
                        ) as HTMLInputElement;
                        if (fileInput) {
                          fileInput.value = "";
                          // Also clear the form value
                          const setValue = register("image").onChange;
                          setValue({ target: { files: [] } } as any);
                        }
                      }}
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <label
                    className="w-full flex flex-col items-center justify-center cursor-pointer py-6 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition"
                    htmlFor="image-upload"
                  >
                    <PiImage className="text-3xl mb-1" />
                    <span className="text-sm">
                      Upload Profile Image (Required)
                    </span>
                  </label>
                )}
                <input
                  id="image-upload"
                  {...register("image", {
                    required: "Image is required",
                    validate: {
                      fileExists: (files) =>
                        files?.length > 0 || "Image is required",
                    },
                  })}
                  accept="image/*"
                  className="hidden"
                  type="file"
                  onChange={handleImageChange}
                />
              </div>
              {errors.image && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.image.message as string}
                </span>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium text-sm cursor-pointer">
                <input
                  className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500"
                  type="checkbox"
                  {...register("terms", { required: true })}
                />
                Agree to the Terms and Conditions
              </label>
              {errors.terms && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.terms.type === "required" &&
                    "You must agree to the terms"}
                </span>
              )}
            </div>

            {/* Submit */}
            <div>
              <button
                className="w-full justify-center py-3 px-4 text-base font-semibold rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={loading}
                type="submit"
              >
                {loading ? (
                  <ClipLoader
                    color="#ffffff"
                    loading={loading}
                    size={25}
                    speedMultiplier={0.8}
                  />
                ) : (
                  "Create Account"
                )}
              </button>
            </div>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 transition-colors duration-200"
                  href="/login"
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
