import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import ClinetProvider from "../components/ClinetProvider";
import SideBar from "../components/SideBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatGPT Messenger",
  description: "clone using OpenAI API, Firebase, Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
            <SideBar />
          </div>

          <ClinetProvider />

          <div className="bg-[#343541] flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}