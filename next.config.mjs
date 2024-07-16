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
        domains: ['152.42.220.220', 'newogle.com'], // Add the domains you need
    }
};

export default nextConfig;
