"use client"

import { Saira } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { FilterContextProvider } from "@/context/filter-context";

const saira = Saira({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"]
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={saira.className}>
        <FilterContextProvider>
          <Header />
          {children}
        </FilterContextProvider>
      </body>
    </html >
  );
}
