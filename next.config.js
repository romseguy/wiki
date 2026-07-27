//const withPWA = require("next-pwa")({ dest: "public", reloadOnOnline: false });

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} = require("next/constants");

let plugins = [
  //withPWA,
];

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = (phase, defaultConfig) => {
  if (phase === PHASE_PRODUCTION_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    //plugins.unshift(withPWA);
  }
  const config = plugins.reduce(
    (acc, plugin) => {
      const update = plugin(acc);
      return typeof update === "function"
        ? update(phase, defaultConfig)
        : update;
    },
    { ...nextConfig },
  );

  return config;
};
