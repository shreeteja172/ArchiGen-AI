import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ArchiGen AI — UML class diagrams from a plain-English idea",
    template: "%s · ArchiGen AI",
  },
  description:
    "Describe your software project in plain English and get a structured UML class diagram in seconds. Saved to your workspace, ready to export.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#6366f1",
              colorPrimaryForeground: "#ffffff",
              colorBackground: "#101014",
              colorForeground: "#ededf2",
              colorMuted: "#17171d",
              colorMutedForeground: "#8b8b9c",
              colorInput: "#17171d",
              colorInputForeground: "#ededf2",
              colorBorder: "#26262e",
              colorRing: "#6366f1",
              borderRadius: "0.625rem",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
