import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://httpducks.com/*.jpg"),
      { protocol: "https", hostname: "29bjc1a365.ufs.sh", pathname: "/f/*" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
