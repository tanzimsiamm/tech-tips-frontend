"use client";

import { useEffect, useState } from "react";
import {
  PiArrowFatDownLight,
  PiArrowFatUpLight,
  PiArrowFatLinesUpFill,
  PiArrowFatLinesDownFill,
} from "react-icons/pi";
import { PulseLoader } from "react-spinners";

import LoginModal from "./LoginModal";

import { useAppSelector } from "@/src/redux/hooks";
import { useVotePostMutation } from "@/src/redux/features/posts/postApi";

const VoteSection = ({
  postId,
  userId,
  votes,
  voters,
}: {
  postId: string;
  userId: string;
  votes: number;
  voters: { userId: string; voteType: string }[];
}) => {
  const [votePost, { isLoading }] = useVotePostMutation();
  const currentUser = useAppSelector((state) => state.auth.user);
  const [givenVote, setGivenVote] = useState<
    { voteType: string; userId: string } | undefined
  >();
  const [loginModal, setLoginModal] = useState<boolean>(false);

  useEffect(() => {
    const isExistVote = voters?.find(
      (voter) => voter?.userId === currentUser?._id,
    );
    setGivenVote(isExistVote);
  }, [voters, currentUser]);

  const handleVote = async (voteType: string) => {
    if (!currentUser) {
      return setLoginModal(true);
    }
    try {
      await votePost({ postId, userId, voteType }).unwrap();
    } catch (err) {
      console.error("Error voting:", err);
    }
  };

  const upvoteActive = givenVote?.voteType === "upvote";
  const downvoteActive = givenVote?.voteType === "downvote";

  return (
    <section>
      {loginModal && <LoginModal open={loginModal} setOpen={setLoginModal} />}

      <div className="relative flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
        {isLoading && (
          <div className="absolute inset-0 z-10 rounded-full flex items-center justify-center bg-gray-100/90 dark:bg-gray-800/90">
            <PulseLoader
              aria-label="Loading Spinner"
              color="#9CA3AF" // Tailwind's gray-400 hex
              size={5}
              speedMultiplier={0.8}
            />
          </div>
        )}

        <button
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 disabled:cursor-not-allowed"
          disabled={isLoading}
          onClick={() => handleVote("upvote")}
          aria-pressed={upvoteActive}
          aria-label="Upvote post"
        >
          {upvoteActive ? (
            <PiArrowFatLinesUpFill className="text-blue-600 dark:text-blue-400 text-xl" />
          ) : (
            <PiArrowFatUpLight className="text-gray-500 dark:text-gray-400 text-xl hover:text-blue-600 dark:hover:text-blue-400" />
          )}
        </button>

        <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm select-none">
          {votes}
        </span>

        <button
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 disabled:cursor-not-allowed"
          disabled={isLoading}
          onClick={() => handleVote("downvote")}
          aria-pressed={downvoteActive}
          aria-label="Downvote post"
        >
          {downvoteActive ? (
            <PiArrowFatLinesDownFill className="text-red-600 dark:text-red-400 text-xl" />
          ) : (
            <PiArrowFatDownLight className="text-gray-500 dark:text-gray-400 text-xl hover:text-red-600 dark:hover:text-red-400" />
          )}
        </button>
      </div>
    </section>
  );
};

export default VoteSection;
