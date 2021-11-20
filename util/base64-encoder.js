export function base64Encode(str) {
  return Buffer.from(str, "utf-8").toString("base64");
};