import type { Metadata } from "next";
import "./globals.css";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Birthday Club HK — Hong Kong birthday offers",
  description: "Find birthday dining, shopping and experience offers around Hong Kong, with links to every official source.",
  icons: {
    icon: `${publicBasePath}/favicon.svg`,
    shortcut: `${publicBasePath}/favicon.svg`,
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
