import "./globals.css";

import { Inter } from "next/font/google";

import AuthProvider from "@/providers/AuthProvider";

import { ModalProvider } from "@/providers/modal-provider";
import { ToasterProvider } from "@/providers/toast-provider";

// import prismadb from "@/lib/prismadb";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
