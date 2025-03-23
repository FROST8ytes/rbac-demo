import { NewEmployeeRole, employeeRoles } from "~/db/schema";
import { db } from "../sqlite_service";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const newEmployeeRole: NewEmployeeRole = {
      ...body,
    };

    const result = await db.insert(employeeRoles).values(newEmployeeRole).run();
    return { newEmployeeRole: result };
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});
