'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";



import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider } from "@apollo/client";
import client from "@/components/apollo/ApolloClient";
import NavBar from "@/components/ui/navbar";
import Sidebar from "@/components/Sidebar";
import { UserMenuLinks } from "@/constants/menuLinks";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider client={client}>
          <ChakraProvider>  
            
            
            
            <NavBar />
            {children}
          </ChakraProvider>  
        </ApolloProvider>  
      </body>

    </html>
  );
}
