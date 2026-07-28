export function getEnv() {
  return process.env.ENV || process.env.NODE_ENV;
}

export function isProd() {
  return getEnv() === "production";
}
