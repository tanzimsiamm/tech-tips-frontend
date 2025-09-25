"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/src/redux/hooks";
import { setUser } from "@/src/redux/features/authentication/authSlice";

export default function OAuthCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = searchParams.get("token");
    const userData = searchParams.get("user");

    if (token && userData) {
      try {
        const user = JSON.parse(decodeURIComponent(userData));
        dispatch(setUser({ user, token }));
        Cookies.set("accessToken", token, { expires: 1 });
        router.push("/");
      } catch (err) {
        console.error("Failed to parse user data:", err);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, []);

  return <div className="p-6 text-center">Logging you in...</div>;
}
