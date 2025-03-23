import { Employee, employees, employeeRoles } from "~/db/schema";
import { db } from "../sqlite_service";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const result = await db
      .select({
        employee_id: employees.employee_id,
        employee_full_name: employees.employee_full_name,
        employee_user_name: employees.employee_user_name,
        employee_password: employees.employee_password,
        employee_role: employeeRoles.role_name,
      })
      .from(employees)
      .leftJoin(
        employeeRoles,
        eq(employees.employee_role, employeeRoles.role_id)
      )
      .all();
    return { employees: result };
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});
