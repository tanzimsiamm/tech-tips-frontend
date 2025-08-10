"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { VscGithubInverted } from "react-icons/vsc";

export default function SocialLogin() {
  return (
    <section>
      <div className="flex justify-between gap-3">
        {/* Google Sign In */}
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="py-3 px-2 w-full bg-gray-200/70 dark:bg-gray-700/60 dark:text-gray-200 rounded flex gap-2 items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-200"
          aria-label="Sign in with Google"
        >
          <FcGoogle className="text-2xl" />
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Sign In Google
          </p>
        </button>

        {/* GitHub Sign In */}
        <button
          type="button"
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="py-3 px-2 w-full bg-gray-200/70 dark:bg-gray-700/60 dark:text-gray-200 rounded flex gap-2 items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-200"
          aria-label="Sign in with GitHub"
        >
          <VscGithubInverted className="text-2xl text-gray-700 dark:text-gray-300" />
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Sign In GitHub
          </p>
        </button>
      </div>
    </section>
  );
}
