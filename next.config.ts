import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    turbopack: {
        root: __dirname, // ensures the current folder is treated as the root
    },
};

export default nextConfig;
