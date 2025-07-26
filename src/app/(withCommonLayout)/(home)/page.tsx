"use client";

import CreatePost from "./components/CreatePost";
import PostSection from "./components/Posts/PostSection";

import { useAppSelector } from "@/src/redux/hooks";

const Home = () => {
  const currentUser = useAppSelector((state) => state.auth.user);

  return (
    <>
      {currentUser && <CreatePost />}
      <PostSection />
    </>
  );
};

export default Home;
