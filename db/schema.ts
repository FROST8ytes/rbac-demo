import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

// Define customers table schema
export const customers = sqliteTable("customers", {
  customer_id: integer("customer_id").primaryKey({ autoIncrement: true }),
  customer_full_name: text("customer_full_name").notNull(),
  customer_account_number: text("customer_account_number").notNull().unique(),
  customer_balance: real("customer_balance").default(0.0),
});

export const users = sqliteTable("users", {
  user_id: integer("user_id").primaryKey({ autoIncrement: true }),
  user_name: text("user_name").notNull().unique(),
  user_password: text("user_password").notNull(),
  customer_id: integer("customer_id")
    .notNull()
    .references(() => customers.customer_id),
});

export const employees = sqliteTable("employees", {
  employee_id: integer("employee_id").primaryKey({ autoIncrement: true }),
  employee_full_name: text("employee_full_name").notNull(),
  employee_user_name: text("employee_user_name").notNull().unique(),
  employee_password: text("employee_password").notNull(),
  employee_role: integer("employee_role")
    .notNull()
    .references(() => employeeRoles.role_id),
});

export const employeeRoles = sqliteTable("employee_roles", {
  role_id: integer("role_id").primaryKey({ autoIncrement: true }),
  role_name: text("role_name").notNull().unique(),
});

export type Customer = InferSelectModel<typeof customers>;
export type NewCustomer = InferInsertModel<typeof customers>;
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export type Employee = InferSelectModel<typeof employees>;
export type NewEmployee = InferInsertModel<typeof employees>;
export type EmployeeRole = InferSelectModel<typeof employeeRoles>;
export type NewEmployeeRole = InferInsertModel<typeof employeeRoles>;
