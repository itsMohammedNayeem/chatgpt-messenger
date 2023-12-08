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
  const [chats, loading, error] = useCollection(query(collection(db, "chats")));

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <div className="flex justify-between my-2 mx-2">
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
          </div>
          <div className="sm:inline hidden my-2">
            <ModelSelection />
          </div>

          <NewChat />

          <div className="flex flex-col space-y-2 my-2">
            {loading && (
              <p className="animate-pulse text-gray-400 text-center">
                Loading Chats...
              </p>
            )}

            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
        {/*a way to go back to the home page that is fixed to the buttom of the page*/}
      </div>

      {session && (
        <img
          src={session.user?.image!}
          alt="profile picture"
          className="h-12 w-12 cursor-pointer mx-auto mb-2 hover:opacity-50 rounded-full"
          onClick={() => signOut()}
        />
      )}
    </div>
  );
}

export default SideBar;
