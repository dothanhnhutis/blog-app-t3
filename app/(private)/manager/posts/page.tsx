"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { HiOutlineFolderPlus } from "react-icons/hi2";
import { BsPlus } from "react-icons/bs";
import PostCard from "@/app/_components/PostCard";
import MediaChatImage from "@/images/mediachat.png";
import { trpc } from "@/app/_trpc/client";

const Posts = () => {
  // const posts = trpc.posts.get.useQuery();
  // console.log(posts.data);
  return (
    <>
      <div className="relative bg-[#ecf2ff] rounded-xl overflow-hidden px-[25px] pt-[30px] pb-5 mb-6">
        <h4 className="font-semibold text-2xl">Blog app</h4>
        <h6 className="font-normal text-lg">Get the latest news</h6>
        <div className="absolute right-[20px] top-0 w-[165px] h-[165px] ">
          <Image priority src={MediaChatImage} alt="mediachat" />
        </div>
      </div>

      <div className="flex flex-wrap -mt-6 -ml-6">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>

      <div className="flex flex-col space-y-1 items-center justify-center text-gray-400">
        <HiOutlineFolderPlus size={40} />
        <p className="text-black text-md font-medium">No posts</p>
        <p className="text-md">Get started by creating a new post.</p>
        <Link
          prefetch={false}
          href="/manager/posts/create"
          className="flex items-center justify-center p-2 font-semibold rounded-md text-lg text-white bg-indigo-500"
        >
          <BsPlus size={24} />
          <p className="font-bold text-base">New Post</p>
        </Link>
      </div>

      <div className="flex items-center justify-center mt-6">
        <nav>
          <ul className="flex items-center justify-center space-x-1">
            <li>
              <button
                disabled
                className="p-2 rounded-full disabled:text-gray-500 text-gray-700 hover:bg-gray-200 disabled:bg-transparent"
              >
                <BiChevronLeft size={20} />
              </button>
            </li>
            <li>
              <button className="w-9 h-9 rounded-full text-white bg-blue-400 hover:bg-blue-600">
                <span>1</span>
              </button>
            </li>
            <li>
              <button className="w-9 h-9 rounded-full text-gray-500 hover:bg-gray-100">
                <span>2</span>
              </button>
            </li>
            <li>
              <div className="w-9 h-9 text-center">...</div>
            </li>

            <li>
              <button className="p-2 rounded-full disabled:text-gray-500 text-gray-700 hover:bg-gray-200 disabled:bg-transparent">
                <BiChevronRight size={24} />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Posts;
