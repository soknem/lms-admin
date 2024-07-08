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
        ],
    },
};

export default nextConfig;
