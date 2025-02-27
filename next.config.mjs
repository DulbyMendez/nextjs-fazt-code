/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "avatars.githubusercontent.com",
              port: ""
            },
            {
              protocol: "https",
              hostname: "picsum.photos",
              port: ""
            },
        ]
    }
};

export default nextConfig;
