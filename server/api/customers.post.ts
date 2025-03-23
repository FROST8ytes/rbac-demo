import { NewCustomer, customers } from "~/db/schema";
import { db } from "../sqlite_service";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const newCustomer: NewCustomer = {
      ...body,
    };

    const result = await db.insert(customers).values(newCustomer).run();
    return { newCustomer: result };
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});
