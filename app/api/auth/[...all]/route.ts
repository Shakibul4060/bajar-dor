import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(async (request) => {
  const authInstance = await auth();
  return authInstance.handler(request);
});
