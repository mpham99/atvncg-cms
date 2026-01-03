import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [{
            protocol: 'http',
            hostname: '127.0.0.1',
            port: '8080',
        }]
    },
    async redirects() {
        return [
            {
                source: '/admin',
                destination: '/admin/collections/artists',
                permanent: false,
            },
        ]
    },
};

export default withPayload(nextConfig);
