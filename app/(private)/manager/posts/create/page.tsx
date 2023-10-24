import React from "react";
import Image from "next/image";
import { getServerAuthSession } from "@/server/auth";
import MediaChatImage from "@/images/mediachat.png";
import PostForm1 from "@/app/_components/PostForm1";

const CreateNewPost = async () => {
  const session = await getServerAuthSession();

  return (
    <div>
      <div className="relative bg-[#ecf2ff] rounded-xl overflow-hidden px-[25px] pt-[30px] pb-5 mb-6">
        <h4 className="font-semibold text-2xl">Blog app</h4>
        <h6 className="font-normal text-lg">Create new post now</h6>
        <div className="absolute right-[20px] top-0 w-[165px] h-[165px] ">
          <Image priority src={MediaChatImage} alt="mediachat" />
        </div>
      </div>
      <PostForm1 session={session} type="create" />
    </div>
  );
};

export default CreateNewPost;
