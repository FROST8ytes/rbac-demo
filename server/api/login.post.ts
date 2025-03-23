import { z } from "zod";
import { employees, employeeRoles } from "~/db/schema";
import { db } from "../sqlite_service";
import { eq, and } from "drizzle-orm";

const bodySchema = z.object({
  username: z.string().min(5),
  password: z.string().min(5),
});

export default defineEventHandler(async (event) => {
  const { username, password } = await readValidatedBody(
    event,
    bodySchema.parse
  );

  try {
    const result = await db
      .select({
        employee_id: employees.employee_id,
        employee_full_name: employees.employee_full_name,
        employee_user_name: employees.employee_user_name,
        employee_role: employeeRoles.role_name,
      })
      .from(employees)
      .where(
        and(
          eq(employees.employee_user_name, username),
          eq(employees.employee_password, password)
        )
      )
      .leftJoin(
        employeeRoles,
        eq(employees.employee_role, employeeRoles.role_id)
      );

    await setUserSession(event, {
      user: {
        full_name: result[0].employee_full_name,
        username: result[0].employee_user_name,
        role: result[0].employee_role,
      },
    });
    return {};
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});
