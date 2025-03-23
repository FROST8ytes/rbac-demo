import { NewEmployee, employees } from "~/db/schema";
import { db } from "../sqlite_service";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const newEmployee: NewEmployee = {
      ...body,
    };

    const result = await db.insert(employees).values(newEmployee).run();
    return { newEmployee: result };
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});
