/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/MindMapping',
    assetPrefix: '/MindMapping/',
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;