const path = require('path');

module.exports = {
    reactStrictMode: true,
    // Other existing configurations...

    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Resolve aliases
        config.resolve.alias['@'] = path.resolve(__dirname);

        // Important: return the modified config
        return config;
    },
};
