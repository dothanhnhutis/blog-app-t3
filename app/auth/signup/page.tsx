"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillGithub, AiOutlineCheck } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { ZodIssueCode, z } from "zod";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";

import { RegisterSubmit, UserProfile } from "@/common.type";
import { signIn } from "next-auth/react";
import { trpc } from "@/app/api/_trpc/client";

const signupSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "8 to 40 characters")
    .max(40, "8 to 40 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/,
      "Letters, numbers and special characters"
    ),
  otp: z.string().length(6, "Enter the 6-digit code"),
});

const InputAuth = ({
  type,
  name,
  setOnFocus,
  ...props
}: {
  id: string;
  name: "otp" | "email" | "password";
  value: string;
  className: string;
  type: "text" | "password" | "email";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setOnFocus: React.Dispatch<
    React.SetStateAction<"otp" | "email" | "password" | undefined>
  >;
}) => {
  return (
    <input
      name={name}
      onFocus={() => setOnFocus(name)}
      onBlur={() => setOnFocus(undefined)}
      {...props}
    />
  );
};

const SignUp = () => {
  const [onFocus, setOnFocus] = useState<
    "otp" | "email" | "password" | undefined
  >(undefined);
  const [passwordType, setpasswordType] = useState<"password" | "text">(
    "password"
  );
  const [form, setform] = useState<z.infer<typeof signupSchema>>({
    email: "",
    password: "",
    otp: "",
  });
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setform((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [errorFormValidate, setErrorFormValidate] = useState<
    { message: string; code: ZodIssueCode }[]
  >([]);
  useEffect(() => {
    const val = signupSchema.safeParse(form);
    if (!val.success) {
      setErrorFormValidate(
        val.error.issues.map((i) => ({ message: i.message, code: i.code }))
      );
    } else {
      setErrorFormValidate([]);
    }
    console.log(errorFormValidate);
  }, [form]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const val = signupSchema.safeParse(form);
    if (!val.success) console.log(val.error.issues);
  };

  const handleSendEmail = async () => {};

  return (
    <>
      <div className="flex mt-6 space-x-4 items-center justify-center">
        <button
          onClick={() => signIn("google")}
          tabIndex={-1}
          className="group flex items-center space-x-2 rounded-md px-4 py-2 border border-gray-300 hover:bg-gray-50"
        >
          <FcGoogle size={20} />
          <span className="group-hover:text-[#5D87FF]">
            Sign up with Google
          </span>
        </button>
        <button
          onClick={() => signIn("github")}
          tabIndex={-1}
          className="group flex items-center space-x-2 rounded-md px-4 py-2 border border-gray-300 hover:bg-gray-50"
        >
          <AiFillGithub size={20} />
          <span className="group-hover:text-[#5D87FF]">
            Sign up with Github
          </span>
        </button>
      </div>
      <div className="my-6 flex items-center before:content-[''] before:flex before:flex-1 before:border-b after:content-[''] after:flex after:flex-1 after:border-b after:border-gray-300">
        <p className="px-2 ">or sign up with</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-3">
          <label className="text-base font-medium pb-1" htmlFor="email">
            Email
          </label>
          <InputAuth
            className="p-2 border rounded-md overflow-hidden"
            setOnFocus={setOnFocus}
            value={form.email}
            onChange={handleOnchange}
            type="email"
            name="email"
            id="email"
          />
          <p className="text-red-500 font-normal text-xs">
            Enter a valid email address
          </p>

          <p className="font-normal text-xs">
            You have registered,
            <Link className="text-red-500 text-sm" href="/auth/signin">
              Sign in
            </Link>
          </p>
        </div>

        <div className="flex flex-col mb-3">
          <label className="text-base font-medium pb-1" htmlFor="password">
            Password
          </label>
          <div className="flex p-2 border rounded-md overflow-hidden space-x-2">
            <InputAuth
              setOnFocus={setOnFocus}
              value={form.password}
              onChange={handleOnchange}
              className="flex-grow"
              type={passwordType}
              name="password"
              id="password"
            />
            <p>{passwordType}</p>
            <button
              tabIndex={-1}
              type="button"
              className="text-gray-600"
              onClick={() =>
                setpasswordType(
                  passwordType === "password" ? "text" : "password"
                )
              }
            >
              {passwordType === "password" ? (
                <PiEyeClosedBold size={20} />
              ) : (
                <PiEyeBold size={20} />
              )}
            </button>
          </div>

          <p className="font-medium text-sm">Your password must include:</p>
          <p
            className={`inline-flex space-x-2 items-center text-gray-500 text-green-400`}
          >
            <AiOutlineCheck size={12} />
            <span className="font-normal text-xs">8 to 20 characters</span>
          </p>
          <p
            className={`inline-flex space-x-2 items-center text-gray-500 text-green-400`}
          >
            <AiOutlineCheck size={12} />
            <span className="font-normal text-xs">
              Letters, numbers and special characters
            </span>
          </p>
        </div>

        <div className="flex flex-col mb-10">
          <label className="text-base font-medium pb-1" htmlFor="otp">
            Code
          </label>
          <div className="border rounded-md overflow-hidden flex items-center ">
            <input
              maxLength={6}
              minLength={6}
              value={form.otp}
              onChange={handleOnchange}
              type="otp"
              name="otp"
              id="otp"
              autoCapitalize="false"
              className="flex-grow p-2"
            />

            <p className="border-l p-2 w-14 text-center opacity-50">30s</p>

            <div className="flex items-center justify-center space-x-1 border-l p-2 w-20 text-center opacity-50">
              <span>Send</span>
              <p className="h-3 w-3 border-t-transparent border-solid animate-spin rounded-full border-gray-500 border-2"></p>
            </div>

            <p className="border-l p-2 w-14 text-center opacity-50"> Send</p>

            <button
              onClick={handleSendEmail}
              type="button"
              className="hover:bg-slate-100 border-l p-2 w-14"
            >
              Send
            </button>
          </div>

          <p className="text-red-500 font-normal text-xs ">
            Enter the 6-digit code
          </p>

          <p className="text-red-500 font-normal text-xs ">
            Email verification code has expired
          </p>

          <p className="text-green-400 font-normal text-xs ">
            Successful account registration
          </p>
        </div>

        <div className="flex items-center justify-center space-x-1 rounded-lg bg-[#5d87ff] text-white py-2 w-full text-center opacity-60">
          <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
          <span>Processing...</span>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-[#5d87ff] text-white py-2 w-full"
        >
          Sign Up
        </button>

        <p className="rounded-lg bg-[#5d87ff] text-white py-2 w-full text-center opacity-60">
          Sign Up
        </p>
      </form>

      <div className="flex items-center justify-center space-x-2 mt-6">
        <p>Already have an Account?</p>
        <Link
          tabIndex={-1}
          href="/auth/signin"
          className="text-[#5d87ff] font-normal text-base"
        >
          Sign In
        </Link>
      </div>
    </>
  );
};

export default SignUp;
