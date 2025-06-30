'use client'

import { useVotePostMutation } from "@/src/redux/features/posts/postApi";
import { useAppSelector } from "@/src/redux/hooks";
import { useEffect, useState } from "react";
import { PiArrowFatDownLight, PiArrowFatUpLight, PiArrowFatLinesUpFill, PiArrowFatLinesDownFill } from "react-icons/pi";
import { PulseLoader } from "react-spinners";
import LoginModal from "./LoginModal";

const VoteSection = ({ postId, userId, votes, voters }: { postId: string, userId: string, votes: number, voters: { userId: string, voteType: string }[] }) => {

  const [votePost, { isLoading }] = useVotePostMutation();
  const currentUser = useAppSelector(state => state.auth.user);
  const [givenVote, setGivenVote] = useState<{ voteType: string, userId: string } | undefined>();
  const [loginModal, setLoginModal] = useState<boolean>(false);

  useEffect(() => {
    const isExistVote = voters?.find(voter => voter?.userId === currentUser?._id);
    setGivenVote(isExistVote);
  }, [voters, currentUser]);

  const handleVote = async (voteType: string) => {
    if (!currentUser) {
      return setLoginModal(true);
    }

    try {
      await votePost({ postId, userId, voteType }).unwrap();
    }
    catch (err) {
      console.error('Error voting:', err);
    }
  };

  const upvoteActive = givenVote?.voteType === 'upvote';
  const downvoteActive = givenVote?.voteType === 'downvote';

  return (
    <section>
      {loginModal && <LoginModal open={loginModal} setOpen={setLoginModal} />}

      <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 rounded-full flex items-center justify-center bg-gray-100/80 dark:bg-gray-700/80">
            <PulseLoader
              color='#B1B4B9'
              size={5}
              aria-label="Loading Spinner"
              speedMultiplier={0.8}
            />
          </div>
        )}

        <button
          onClick={() => handleVote('upvote')}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {upvoteActive ? (
            <PiArrowFatLinesUpFill className="text-blue-500 text-xl" />
          ) : (
            <PiArrowFatUpLight className="text-gray-500 dark:text-gray-400 text-xl hover:text-blue-500 dark:hover:text-blue-400" />
          )}
        </button>

        <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">
          {votes}
        </span>

        <button
          onClick={() => handleVote('downvote')}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {downvoteActive ? (
            <PiArrowFatLinesDownFill className="text-red-500 text-xl" />
          ) : (
            <PiArrowFatDownLight className="text-gray-500 dark:text-gray-400 text-xl hover:text-red-500 dark:hover:text-red-400" />
          )}
        </button>
      </div>
    </section>
  );
};

export default VoteSection;
