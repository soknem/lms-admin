/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lms-api.istad.co',
                pathname: '**',
            },
            {
                protocol: 'http',
                hostname: '152.42.220.220',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
                pathname: '**',
            },
        ]
    }
};

export default nextConfig;