import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { useSession } from "next-auth/react";

type Props = {
  id: string;
};

function ChatRow({ id }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const { data: session } = useSession();

  const [messages] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")
  );

  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname]);

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  return (
    <Link
      className={`chatRow justify-center ${active && "bg-gray-700/50"}`}
      href={`/chat/${id}`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className="flex-1 hidden md:inline-flex truncate p-1">
        {messages?.docs[messages.docs.length - 1]?.data().text || "New Chat"}
      </p>
      <TrashIcon
        className="h-5 w-5 text-gray-700 hover:text-red-700"
        onClick={removeChat}
      />
    </Link>
  );
}

export default ChatRow;
