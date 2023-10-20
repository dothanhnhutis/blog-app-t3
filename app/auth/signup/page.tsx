"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillGithub, AiOutlineCheck } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";

import { signIn } from "next-auth/react";
import { trpc } from "@/app/api/_trpc/client";
import InputAuth from "@/app/_components/InputAuth";
import useCountDown from "@/hook/useCountDown";

const signupSchema = z.object({
  email: z.string().email("invaid_email"),
  password: z
    .string()
    .min(8, "too_small")
    .max(40, "too_big")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/,
      "format_error"
    ),
  otp: z.string().length(6, "length_error"),
});

const SignUp = () => {
  const [onFocus, setOnFocus] = useState<
    "otp" | "email" | "password" | undefined
  >(undefined);
  const [passwordType, setpasswordType] = useState<"password" | "text">(
    "password"
  );
  const [form, setForm] = useState<z.infer<typeof signupSchema>>({
    email: "",
    password: "",
    otp: "",
  });
  const [count, setCount] = useCountDown("sms-send", form.email);
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [errorFormValidate, setErrorFormValidate] = useState<
    { message: string }[]
  >([]);
  useEffect(() => {
    const val = signupSchema.safeParse(form);
    if (!val.success) {
      setErrorFormValidate(
        val.error.issues.map((i) => ({ message: i.message }))
      );
    } else {
      setErrorFormValidate([]);
    }
    if (
      (form.email !== "" || form.password !== "" || form.otp !== "") &&
      userMutation.isSuccess
    ) {
      userMutation.reset();
    }
  }, [form]);

  const userMutation = trpc.user.create.useMutation({
    onSuccess: () => {
      setForm({
        email: "",
        password: "",
        otp: "",
      });
      otpMutation.reset();
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const val = signupSchema.safeParse(form);
    if (val.success) {
      userMutation.mutate({ ...form });
    }
  };

  useEffect(() => {
    setisExistEmail(false);
  }, [form.email]);

  const [isExistEmail, setisExistEmail] = useState(false);

  const handleSendEmail = async () => {
    otpMutation.mutate({ email: form.email, type: "SIGNINUP" });
  };

  const otpMutation = trpc.otp.create.useMutation({
    onSuccess: (data) => {
      if (!data) {
        setisExistEmail(true);
      } else {
        setCount();
      }
    },
  });

  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      time - Date.now() > 0 ? setTime((prev) => prev - 1000) : setTime(0);
    }, 1000);
  }, [time]);

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
          {onFocus !== "email" &&
            form.email.length > 0 &&
            errorFormValidate.find((e) => e.message === "invaid_email") && (
              <p className="text-red-500 font-normal text-xs">
                Enter a valid email address
              </p>
            )}
          {isExistEmail && (
            <p className="font-normal text-xs">
              You have registered,
              <Link className="text-red-500 text-sm" href="/auth/signin">
                Sign in
              </Link>
            </p>
          )}
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
          {(onFocus === "password" || form.password.length > 0) && (
            <>
              <p className="font-medium text-sm">Your password must include:</p>
              <p
                className={`inline-flex space-x-2 items-center ${
                  errorFormValidate.filter(
                    (e) => e.message === "too_small" || e.message === "too_big"
                  ).length > 0
                    ? "text-gray-500"
                    : "text-green-400"
                } `}
              >
                <AiOutlineCheck size={12} />
                <span className="font-normal text-xs">8 to 20 characters</span>
              </p>
              <p
                className={`inline-flex space-x-2 items-center ${
                  !errorFormValidate.find((e) => e.message === "format_error")
                    ? "text-green-400"
                    : "text-gray-500"
                }`}
              >
                <AiOutlineCheck size={12} />
                <span className="font-normal text-xs">
                  Letters, numbers and special characters
                </span>
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col mb-10">
          <label className="text-base font-medium pb-1" htmlFor="otp">
            Code
          </label>
          <div className="border rounded-md overflow-hidden flex items-center ">
            <InputAuth
              setOnFocus={setOnFocus}
              value={form.otp}
              onChange={handleOnchange}
              className="flex-grow p-2"
              type="text"
              name="otp"
              id="otp"
            />

            {otpMutation.isSuccess && count > 0 ? (
              <p className="border-l p-2 w-14 text-center opacity-50">
                {count}s
              </p>
            ) : otpMutation.isLoading ? (
              <div className="flex items-center justify-center space-x-1 border-l p-2 w-20 text-center opacity-50">
                <span>Send</span>
                <p className="h-3 w-3 border-t-transparent border-solid animate-spin rounded-full border-gray-500 border-2"></p>
              </div>
            ) : onFocus === "email" ||
              !errorFormValidate.find((e) => e.message === "invaid_email") ? (
              <button
                onClick={handleSendEmail}
                type="button"
                className="hover:bg-slate-100 border-l p-2 w-14"
              >
                Send
              </button>
            ) : (
              <p className="border-l p-2 w-14 text-center opacity-50"> Send</p>
            )}
          </div>

          {onFocus !== "otp" &&
            form.otp.length > 0 &&
            errorFormValidate.find((e) => e.message === "length_error") && (
              <p className="text-red-500 font-normal text-xs ">
                Enter the 6-digit code
              </p>
            )}

          {userMutation.isSuccess && (
            <p
              className={`${
                userMutation.data ? "text-green-400" : "text-red-500"
              } font-normal text-xs `}
            >
              {userMutation.data
                ? "Successful account registration"
                : "Email verification code has expired"}
            </p>
          )}
        </div>

        {userMutation.isLoading ? (
          <div className="flex items-center justify-center space-x-1 rounded-lg bg-[#5d87ff] text-white py-2 w-full text-center opacity-60">
            <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
            <span>Processing...</span>
          </div>
        ) : signupSchema.safeParse(form).success ? (
          <button
            type="submit"
            className="rounded-lg bg-[#5d87ff] text-white py-2 w-full"
          >
            Sign Up
          </button>
        ) : (
          <p className="rounded-lg bg-[#5d87ff] text-white py-2 w-full text-center opacity-60">
            Sign Up
          </p>
        )}
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
