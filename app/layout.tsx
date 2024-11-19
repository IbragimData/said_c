"use client";
import localFont from "next/font/local";
import "./globals.css";
import { NavBar } from "@/models";
import { useEffect, useState } from "react";
import { Auth } from "@/models/Auth/Auth";
import axios from "axios";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuth, setIsAuth] = useState(false);

  const Proverka= async()=>{
    try{
      await axios.get("http://localhost:5002/api/auth/protected", {headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }})
      setIsAuth(true)
    }catch(e){
      setIsAuth(false)
      console.log(e)
    }
  }
  useEffect(()=>{
    Proverka()
  },[])

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isAuth ? (
          <div className="global">
            <NavBar />
            <main>{children}</main>
          </div>
        ) : (
          <Auth />
        )}
      </body>
    </html>
  );
}
