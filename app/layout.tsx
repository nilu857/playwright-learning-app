import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Playwright Academy - Master Browser Automation",
  description: "Learn Playwright from basics to advanced with comprehensive tutorials, interactive code examples, and TypeScript guides. Master browser automation testing.",
  keywords: ["Playwright", "Browser Automation", "Testing", "TypeScript", "E2E Testing", "Web Testing"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
