// next.config.js
module.exports = {
  images: {
    domains: [
      'i.ibb.co',
      'placehold.co',
      'example.com'
      // Add all other domains you use
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    dangerouslyAllowSVG: true, // Only if you need SVG support
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  }
}