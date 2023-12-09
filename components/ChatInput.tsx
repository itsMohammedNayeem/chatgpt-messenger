"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { db } from "@/firebase";
import useSWR from "swr";
import ModelSelection from "./ModelSelection";
import { useSession } from "next-auth/react";

type Props = Readonly<{
  chatId: string;
}>;

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  //useSWR to get model
  const { data: model } = useSWR("model", { fallbackData: "text-davinci-003" });

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    //toast notification

    const notification = toast.loading("ChatGPT is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      toast.success("ChatGPT has responded!", {
        id: notification,
      });
    });
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      <form className="flex flex-1 p-5 space-x-5" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type your message here..."
          value={prompt}
          disabled={!session}
          onChange={(e) => setPrompt(e.target.value)}
          className="bg-transparent flex-1 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300"
        />

        <button
          type="submit"
          disabled={!prompt || !session}
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>

      <div className="md:hidden lg:hidden ">
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;
