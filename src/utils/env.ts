export function getEnv() {
  return process.env.ENV || process.env.NODE_ENV;
}

// if (getEnv() !== "production") {
//   const originalError = console.error;
//   const originalWarning = console.warn;
//   const originalInfo = console.info;
//   console.info = (...args) => {
//     if (typeof args[0] !== "string") return;
//     if (
//       args[0].includes("The object notation")
//       //||
//     ) {
//       return;
//     }
//     originalInfo(...args);
//   };
//   console.warn = (...args) => {
//     if (typeof args[0] !== "string") return;
//     if (
//       args[0].includes("The object notation") ||
//       args[0].includes("Fast Refresh") ||
//       args[0].includes("You are using legacy implementation.")
//     ) {
//       return;
//     }
//     originalWarning(...args);
//   };
//   console.error = (...args) => {
//     if (typeof args[0] !== "string") return;
//     if (
//       args[0].includes(
//         "Support for defaultProps will be removed from function components in a future major release.",
//       )
//       //|| args[0].includes("React 17")
//     ) {
//       return;
//     }
//     originalError(...args);
//   };
// } else {
//   const CleanConsole = require("@eaboy/clean-console");
//   CleanConsole.init({
//     initialMessages: [
//       { message: `Bienvenue sur ${process.env.NEXT_PUBLIC_SHORT_URL}` },
//     ],
//     debugLocalStoregeKey: "allowConsole",
//   });
// }
