import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { getServerSession } from "next-auth";
import ClientProvider from "@/components/ClientProvider";
import SideBar from "@/components/SideBar";
import { SessionProvider } from "@/components/SessionProvider";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Login from "@/components/Login";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatGPT Messenger",
  description: "clone using OpenAI API, Firebase, Next.js and Tailwind CSS",
};

export default async function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
                <SideBar />
              </div>

              <ClientProvider />

              <div className="bg-[#343541] flex-1">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}