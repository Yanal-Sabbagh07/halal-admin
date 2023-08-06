"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
const Signout = () => {
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("/login");
  };
  return (
    <button
      onClick={handleSignOut}
      className=" flex h-12 w-28 cursor-pointer items-center justify-center 
      rounded-full  border border-gray-400 text-slate-900 hover:bg-gray-300   md:flex"
    >
      Sign out
    </button>
  );
};

export default Signout;
