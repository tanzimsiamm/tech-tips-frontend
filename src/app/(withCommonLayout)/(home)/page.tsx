"use client";

import { useAppSelector } from "@/src/redux/hooks";
import CreatePost from "./components/CreatePost";
import PostSection from "./components/Posts/PostSection";

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

