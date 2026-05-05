import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";

// const inter = Inter({
//   subsets: ["latin", "cyrillic"],
//   variable: "--font-inter",
// });

export const metadata: Metadata = {
  title: "Учёт сотрудников - Мехмат",
  description: "Система учёта сотрудников механико-математического факультета",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
