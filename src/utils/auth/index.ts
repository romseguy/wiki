import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";

const createMagic = (key: string) => {
  return (
    typeof window != "undefined" &&
    new Magic("pk_live_A29F9FA3034AA1AB", {
      extensions: [new OAuthExtension()],
      locale: "fr",
    })
  );
};

// singleton
export const magic = createMagic(
  process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY,
) as unknown as any; // as InstanceWithExtensions<SDKBase, OAuthExtension[]>;
