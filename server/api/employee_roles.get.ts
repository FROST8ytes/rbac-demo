import { EmployeeRole, employeeRoles } from "~/db/schema";
import { db } from "../sqlite_service";

export default defineEventHandler(async (event) => {
  try {
    const result = await db.select().from(employeeRoles).all();
    return { employeeRoles: result };
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});
