//@ts-nocheck
import DOMPurify from "isomorphic-dompurify";

export function sanitize(str?: string) {
  if (!str) return "";
  return DOMPurify.sanitize(str, {
    ADD_ATTR: ["target"],
    ADD_TAGS: ["iframe"],
  });
}
