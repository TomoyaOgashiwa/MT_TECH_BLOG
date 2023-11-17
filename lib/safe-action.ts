import { cookies } from "next/headers";

import { createSafeActionClient } from "next-safe-action";

export const safeAction = createSafeActionClient();

export const authAction = createSafeActionClient({
  // Can also be a non async function.
  async middleware() {
    const session = cookies().get("session")?.value;

    if (!session) throw new Error("Session not found");

    // In the real world, you would check if the session is valid by querying a database.
    // We'll keep it very simple here.

    // const userId = await getUserIdFromSessionId(session);

    // if (!userId) {
    //   throw new Error("Session is not valid!");
    // }

    // return { userId };
  },
});
