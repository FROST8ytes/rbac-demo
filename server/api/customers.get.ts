import { Customer, customers } from "~/db/schema";
import { db } from "../sqlite_service";

export default defineEventHandler(async (event) => {
  try {
    const result = await db.select().from(customers).all();
    return { customers: result };
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});
