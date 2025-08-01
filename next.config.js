/** @type {import('next').NextConfig} */
const nextConfig = {
  // Amplify에서 정적 파일 제공을 위한 설정
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  // 빌드 출력 최적화
  output: 'standalone',
};

module.exports = nextConfig; 