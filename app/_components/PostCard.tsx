import Link from "next/link";
import Image from "next/image";
import React from "react";
import { AiOutlineComment, AiOutlineEye } from "react-icons/ai";
import { PiDotOutlineLight } from "react-icons/pi";

import BlogImage from "@/images/blog-img1.jpg";
import Avatar from "@/images/user-1.jpg";
type Props = {
  id: string;
  thumnail: string;
  title: string;
  author: {
    id: string;
    avatarUrl: string | null;
  };
};

const PostCard = () => {
  return (
    <div className="lg:basis-1/3 lg:max-w-1/3 sm:basis-1/2 sm:max-w-1/2 pt-6 pl-6">
      <div className="bg-white rounded-xl overflow-hidden shadow [transition:box-shadow_300ms_cubic-bezier(0.4, 0, 0.2, 1)_0ms] hover:scale-[1.01] hover:[transition:0.1s_ease-in]">
        <Link prefetch={false} href="" className="h-[240px]">
          <Image
            priority
            src={BlogImage}
            width={1080}
            height={720}
            alt="mediachat"
          />
        </Link>

        <div className="relative p-6">
          <div className="w-10 h-10 overflow-hidden rounded-full absolute -top-[20px]">
            <Image
              priority
              src={Avatar}
              width={40}
              height={40}
              alt="mediachat"
            />
          </div>

          <div className="absolute -top-[35px] right-6 bg-white rounded-xl">
            <span className="text-sm font-medium px-3 text-gray-600 ">
              2 min Read
            </span>
          </div>
          <div className=" text-center inline-flex mt-6">
            <span className="px-2 text-ellipsis text-sm font-semibold rounded-full overflow-hidden bg-gray-200 text-gray-600">
              Gadget
            </span>
          </div>
          <div className="my-6">
            <Link
              prefetch={false}
              href=""
              className="font-semibold text-xl text-gray-600 line-clamp-3 lg:line-clamp-2"
            >
              As yen tumbles, gadget-loving Japan goes for secondhand iPhones
            </Link>
          </div>
          <div className="flex items-center text-gray-600 space-x-1 lg:space-x-2">
            <div className="flex items-center space-x-1">
              <AiOutlineEye size={20} />
              <span className="text-base font-normal w-10 truncate">999</span>
            </div>
            <div className="flex items-center space-x-1">
              <AiOutlineComment size={20} />
              <span className="text-base font-normal w-10 truncate">999</span>
            </div>
            <div className="flex items-center justify-end flex-auto">
              <PiDotOutlineLight size={24} />
              <span className="text-xs font-normal lg:text-sm lg:font-normal line-clamp-1">
                Sun, Sep 17
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
