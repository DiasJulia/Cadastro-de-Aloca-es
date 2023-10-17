/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SERVER_HOST_EXTERNAL: process.env.SERVER_HOST_EXTERNAL
    }
}

module.exports = nextConfig