import Image from "next/image";
import React from "react";
import ProfileThumnail from "@/images/profilebg.jpg";
import { FiFileText, FiLink, FiUserCheck } from "react-icons/fi";
import { SlSocialFacebook } from "react-icons/sl";
import { BiChevronLeft, BiChevronRight, BiLogoTiktok } from "react-icons/bi";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import PostCard from "@/app/_components/PostCard";
import UserAvatar from "@/images/user-2.jpg";
import Link from "next/link";
import { BsLink45Deg } from "react-icons/bs";
const Profile = () => {
  return (
    <>
      <div className="rounded-lg overflow-hidden mb-6 border">
        <div className="relative w-full h-[330px] ">
          <Image
            priority
            src={ProfileThumnail}
            className="object-cover"
            alt="thumnail"
            fill
          />
          {/* <label
            htmlFor=""
            className="absolute top-0 left-0 bg-black w-full h-full z-10"
          >
            Sửa
          </label> */}
        </div>

        <div className="relative flex flex-wrap items-center justify-center w-full">
          <div className="order-2 basis-full xl:order-none xl:basis-1/3">
            <div className="flex items-center justify-center gap-8 m-6">
              <div className="flex flex-col items-center justify-center">
                <FiFileText size={20} />
                <p className="text-2xl font-bold">900</p>
                <p className="text-xl font-light">Posts</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <FaRegUserCircle size={20} />
                <p className="text-2xl font-bold">900</p>
                <p className="text-xl font-light">Followers</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <FiUserCheck size={20} />
                <p className="text-2xl font-bold">900</p>
                <p className="text-xl font-light">Following</p>
              </div>
            </div>
          </div>

          <div className="order-1 basis-full xl:order-none xl:basis-1/3 mt-[-85px]">
            <div className="flex flex-col items-center justify-center">
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[5px] rounded-full">
                <Image
                  className="bg-white p-1 rounded-full"
                  priority
                  src={UserAvatar}
                  width={100}
                  height={100}
                  alt="thumnail"
                />
              </div>
              <h4 className="text-xl font-medium">Julia Roberts</h4>
              <p className="text-sm font-normal">Project Manager</p>
            </div>
          </div>

          <div className="order-3 basis-full xl:order-none xl:basis-1/3">
            <div className="flex items-center justify-center gap-4 hidden">
              <Link
                href=""
                prefetch={false}
                className="text-white bg-[#5d87ff] p-2 rounded-full"
              >
                <FiLink size={16} />
              </Link>
              <Link
                href=""
                prefetch={false}
                className="text-white bg-blue-500 p-2 rounded-full"
              >
                <SlSocialFacebook size={16} />
              </Link>
              <Link
                href=""
                prefetch={false}
                className="text-white bg-black p-2 rounded-full"
              >
                <BiLogoTiktok size={16} />
              </Link>
              <Link
                href=""
                prefetch={false}
                className="text-white bg-red-600 p-2 rounded-full"
              >
                <AiOutlineYoutube size={16} />
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 flex justify-end items-center order-1 basis-full xl:order-none mt-2">
          <div className="flex items-center justify-center px-4 py-2 gap-2 border-b-2 border-[#5d87ff] text-[#5d87ff]">
            <FiFileText size={16} />
            <p className="text-sm font-medium">Posts</p>
          </div>
          <div className="flex items-center justify-center px-4 py-2 gap-2">
            <FiFileText size={16} />
            <p className="text-sm font-medium">Followers</p>
          </div>
          <div className="flex items-center justify-center px-4 py-2 gap-2">
            <FiFileText size={16} />
            <p className="text-sm font-medium">Following</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mt-6 -ml-6">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
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

export default Profile;
