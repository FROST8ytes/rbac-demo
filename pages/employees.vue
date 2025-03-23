<script setup lang="ts">
definePageMeta({
  middleware: ["authenticated"],
});

const route = useRoute();
const id = useId();

const { data } = await useFetch("/api/employees");
</script>

<template>
  <div class="grid">
    <Card class="rounded-xl bg-muted/50">
      <CardHeader>
        <CardTitle>Employees</CardTitle>
        <CardDescription>Employee details and roles</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>All Employees</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody v-if="data">
            <TableRow v-for="employee in data.employees" :key="employee.employee_id">
              <TableCell class="font-medium">{{ employee.employee_id }}</TableCell>
              <TableCell>{{ employee.employee_full_name }}</TableCell>
              <TableCell>{{ employee.employee_user_name }}</TableCell>
              <TableCell>{{ employee.employee_role }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped></style>
