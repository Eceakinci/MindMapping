
const nextConfig = {
    output: 'export',
    distDir: 'docs',
    basePath: process.env.GITHUB_PAGES === 'true' ? '/MindMapping' : '',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;