import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Birthday Club HK — Hong Kong birthday offers",
  description: "Find birthday dining, shopping and experience offers around Hong Kong, with links to every official source.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-HK">
      <body className="antialiased">{children}</body>
    </html>
  );
}
