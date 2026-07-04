import type { Metadata } from "next";
import { Montserrat, Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "App";
export const APP_SLUG = process.env.NEXT_PUBLIC_APP_SLUG ?? "app";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const montserratAlternates = Montserrat_Alternates({
  variable: "--font-montserrat-alternates",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: { template: `${APP_NAME} | %s`, default: APP_NAME },
  description: "Read, create and review posts!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl-PL"
      suppressHydrationWarning // for ThemeProvider
      className={`${montserrat.variable} ${montserratAlternates.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
