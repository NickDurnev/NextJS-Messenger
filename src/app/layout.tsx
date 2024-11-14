import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";
import AppContainer from "./components/AppContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Connectify",
  description: "Messenger",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext session={session}>
          <ToasterContext />
          <AppContainer>{children}</AppContainer>
        </AuthContext>
      </body>
    </html>
  );
}
