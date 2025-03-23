import { NewUser, users } from "~/db/schema";
import { db } from "../sqlite_service";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const newUser: NewUser = {
      ...body,
    };

    const result = await db.insert(users).values(newUser).run();
    return { newUser: result };
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});
