"use client";

import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/outline";
import ModelSelection from "./ModelSelection";
import NewChat from "./NewChat";
import ChatRow from "./ChatRow";  
import { useSession, signOut } from "next-auth/react";

function SideBar() {
  const { data: session } = useSession();
  const [chats, loading] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          {/* <div className="flex justify-between my-2 mx-2">
            <Link className="text-2xl font-bold text-gray-400" href="/">
              <HomeIcon className="h-10 w-10 text-gray-400 hover:text-blue-700 hover:animate-pulse" />
            </Link>
            <a
              className="text-2xl font-bold hover:border-blue-700 hover:animate-pulse text-gray-400 border-2 outline-1 border-white rounded-full p-0"
              href="https://github.com/PKFireBarry/ChatGPT-Messenger"
              target="_blank"
            >
              <p className="p-2 hover:text-blue-700 hover:animate-pulse">
                Github
              </p>
            </a>
          </div> */}

          <NewChat />

          <div className="sm:inline hidden">
            <ModelSelection />
          </div>

          <div className="flex flex-col space-y-2 my-2">
            {loading && (
              <div className="animate-pulse text-white text-center">
                <p>Loading Chats...</p>
              </div>
            )}

            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>

      {session && (
        <div className="flex-col md:flex-row rounded-lg px-5 py-3 text-sm flex items-center justify-center cursor-pointer transition-all duration-200 ease-out hover:bg-gray-700/70 text-gray-300 gap-2">
          <p className="text-center text-white">Logout</p>
          <img
            src={session.user?.image!}
            alt="profile picture"
            className="h-12 w-12 cursor-pointer hover:opacity-50 rounded-full"
            onClick={() => signOut()}
          />
        </div>
      )}
    </div>
  );
}

export default SideBar;
