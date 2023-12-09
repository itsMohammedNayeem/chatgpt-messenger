"use client";

import { query, collection, orderBy } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { db } from "@/firebase";
import { useSession } from "next-auth/react";

type Props = Readonly<{
  chatId: string;
}>;

function Chat({ chatId }: Props) {
  const { data: session } = useSession();

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

          return (
            <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-gray-400 scrollbar-thumb-black">
              {!messages?.docs.length && (
                <div>
                  <p className="text-center mt-10 text-white">
                    Type a prompt in below to get started!
                  </p>
                  <ArrowDownCircleIcon className="h-10 w-10 mt-5 text-white mx-auto animate-bounce" />
                </div>
              )}

              {messages?.docs.map((message) => (
                <Message key={message.id} message={message.data()} />
              ))}
            </div>
          );
}

export default Chat;
