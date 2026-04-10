import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FrontendSchool - Онлайн-школа фронтенд-разработки",
  description: "Учим создавать современные веб-приложения с нуля до профессионального уровня",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}
