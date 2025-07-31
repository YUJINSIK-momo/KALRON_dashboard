import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Amplify에서 정적 파일 제공을 위한 설정
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
