<script setup lang="ts">
definePageMeta({
  middleware: ["authenticated"],
});

const route = useRoute();
const id = useId();

const { data } = await useFetch("/api/customers");
</script>

<template>
  <div class="grid">
    <Card class="rounded-xl bg-muted/50">
      <CardHeader>
        <CardTitle>Customers</CardTitle>
        <CardDescription>Customer banking details</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>All Customers</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead class="text-right">Account Number</TableHead>
              <TableHead class="text-right">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody v-if="data">
            <TableRow v-for="customer in data.customers" :key="customer.customer_id">
              <TableCell class="font-medium">{{ customer.customer_id }}</TableCell>
              <TableCell>{{ customer.customer_full_name }}</TableCell>
              <TableCell class="text-right">{{ customer.customer_account_number }}</TableCell>
              <TableCell class="text-right">RM {{ customer.customer_balance }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped></style>
