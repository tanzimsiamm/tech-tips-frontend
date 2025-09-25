"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/src/redux/hooks";
import { setUser } from "@/src/redux/features/authentication/authSlice";

export default function GoogleCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = searchParams.get("token");
    const userData = searchParams.get("user");

    if (token && userData) {
      dispatch(setUser({ user: JSON.parse(userData), token }));
      Cookies.set("accessToken", token, { expires: 1 });
      router.push("/");
    } else {
      router.push("/login");
    }
  }, []);

  return <div>Logging in...</div>;
}
