import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import getCurrentUser from "./actions/getCurrentUser";
import Script from "next/script";
import ToastProvider from "@/components/ToastProvider";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FleeMarket",
  description: "중고마켓 프로젝트",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
          <Navbar currentUser={currentUser} />
          <ToastProvider />
          {children}
        <Script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=bef9938a021e11e64a08fb47e13e99b5&libraries=services,clusterer&autoload=false"
        />
      </body>
    </html>
  );
}
