"use client";

import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { GoUnlock } from "react-icons/go";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { Button } from "@heroui/button";

import { useLoginMutation } from "@/src/redux/features/authentication/authApi";
import { useAppDispatch } from "@/src/redux/hooks";
import { TJwtDecoded } from "@/src/types";
import { setUser } from "@/src/redux/features/authentication/authSlice";

type TProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Login({ setOpen }: TProps) {
  const [errors, setErrors] = useState({ emailError: "", passwordError: "" });
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [demoUser, setDemoUser] = useState<any>({});

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    const res: any = await login({ email, password });

    if (res?.error?.data?.message === "user not exist") {
      setErrors({ ...errors, emailError: "Incorrect Email" });
      setLoading(false);
    } else if (res?.error?.data?.message === "Password incorrect") {
      setErrors({ ...errors, passwordError: "Incorrect Password" });
      setLoading(false);
    } else if (res?.data?.success) {
      const userImage = res?.data?.data?.image;
      const name = res?.data?.data?.name;

      const decoded: TJwtDecoded = jwtDecode(res.data.token);

      dispatch(
        setUser({
          user: { ...decoded, image: userImage, name },
          token: res.data.token,
        }),
      );
      Cookies.set("accessToken", res?.data?.token, { expires: 1 });

      toast.success("Logged In Successfully");
      setLoading(false);
      if (typeof setOpen === "function") setOpen(false);
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 h-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="w-full max-w-lg p-0">
        <div className="text-center mb-6">
          <div className="border rounded-xl p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 mb-6">
            <h1 className="text-lg lg:text-xl font-bold mb-2">
              Login With Demo For Testing
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full text-sm lg:text-base text-white font-semibold transition-colors duration-200 w-full sm:w-auto px-4"
                onClick={() =>
                  setDemoUser({
                    email: "demoUser@gmail.com",
                    password: "1234567",
                  })
                }
              >
                Login As User
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full text-sm lg:text-base text-white font-semibold transition-colors duration-200 w-full sm:w-auto px-4"
                onClick={() =>
                  setDemoUser({
                    email: "demoAdmin@gmail.com",
                    password: "1234567",
                  })
                }
              >
                Login As Admin
              </button>
            </div>
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white text-center">
            Login to your account
          </h1>
        </div>

        <div className="w-full">
          <div className="p-0">
            <form className="text-white" onSubmit={handleLogin}>
              <div className="mb-5">
                <div className="relative flex items-center">
                  <input
                    className="w-full py-3 pl-12 pr-4 outline-none border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-300"
                    defaultValue={demoUser?.email || ""}
                    name="email"
                    placeholder="Email"
                    type="email"
                    onChange={() =>
                      setErrors({ emailError: "", passwordError: "" })
                    }
                  />
                  <span className="text-xl absolute left-4 text-gray-500 dark:text-gray-400">
                    <AiOutlineMail />
                  </span>
                </div>
                {errors?.emailError && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {" "}
                    {errors?.emailError}{" "}
                  </span>
                )}
              </div>

              <div className="mb-6">
                <div className="relative flex items-center">
                  <input
                    className="w-full py-3 pl-12 pr-4 outline-none border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-300"
                    defaultValue={demoUser?.password || ""}
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={() =>
                      setErrors({ emailError: "", passwordError: "" })
                    }
                  />
                  <span className="text-xl absolute left-4 text-gray-500 dark:text-gray-400">
                    <GoUnlock />
                  </span>
                </div>
                {errors?.passwordError && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {" "}
                    {errors?.passwordError}
                  </span>
                )}
              </div>

              {/* <SocialLogin /> */}

              <div className="mt-8">
                <Button
                  className="w-full justify-center py-3 px-4 text-base font-semibold rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                  type="submit"
                >
                  {loading ? (
                    <ClipLoader
                      aria-label="Loading Spinner"
                      color="#ffffff"
                      loading={loading}
                      size={25}
                      speedMultiplier={0.8}
                    />
                  ) : (
                    "Log In"
                  )}
                </Button>
              </div>

              <div className="mt-6 text-center">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 transition-colors duration-200"
                    href="/register"
                  >
                    Register
                  </Link>
                </h4>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}