"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

const Login = () => {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center">
      <Image
        src="https://links.papareact.com/2i6"
        width={300}
        height={300}
        alt="logo"
      />
      <button
        className="text-white border-2 p-2 rounded-md font-bold text-2xl animate-pulse"
        onClick={() => signIn("google")}
      >
        Sign In
      </button>
    </div>
  );
};

export default Login;
