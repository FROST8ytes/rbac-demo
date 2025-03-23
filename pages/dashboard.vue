<script setup lang="ts">
import gsap from "gsap";

const { user, clear: clearSession } = useUserSession();

const startDate = new Date("2023-11-10");
const chartLoading = ref(true);
const chartData: Ref<
  {
    time: string;
    deposits: number;
    withdrawals: number;
  }[]
> = ref([]);

const daysSinceNewCustomer = ref(0);
const tweenedDaysSinceNewCustomer = reactive({
  daysSinceNewCustomer: 0,
});

watch(daysSinceNewCustomer, (n) => {
  gsap.to(tweenedDaysSinceNewCustomer, { duration: 1.0, daysSinceNewCustomer: Number(n) || 0 });
});

const customersRecruited = ref(0);
const tweenedcustomersRecruited = reactive({
  customersRecruited: 0,
});

watch(customersRecruited, (n) => {
  gsap.to(tweenedcustomersRecruited, { duration: 1.0, customersRecruited: Number(n) || 0 });
});

const dates = ref(0);
const tweenedDates = reactive({
  dates: 0,
});

watch(dates, (n) => {
  gsap.to(tweenedDates, { duration: 1.0, dates: Number(n) || 0 });
});

onBeforeMount(() => {
  const today = new Date();
  today.setMinutes(0);
  today.setSeconds(0);

  const values = [];

  for (let i = 29; i >= 0; i--) {
    const intervalDate = new Date(today);
    intervalDate.setDate(today.getDate() - i);
    values.push(intervalDate.toString());
  }

  let originalSavings = 99999;

  for (const value of values) {
    const randomSavings = Math.floor(Math.random() * 100000);
    chartData.value.push({
      time: value,
      deposits: randomSavings,
      withdrawals: originalSavings + randomSavings,
    });

    originalSavings += randomSavings;
  }
});

onMounted(() => {
  const todayDate = new Date();
  const differenceInTime = todayDate.getTime() - startDate.getTime();
  daysSinceNewCustomer.value = Math.round(differenceInTime / (1000 * 3600 * 24));

  customersRecruited.value = 19;
  dates.value = 23;

  chartLoading.value = false;
});
</script>

<template>
  <div class="grid gap-4 w-full">
    <section class="flex items-start justify-between">
      <div class="grow">
        <p class="text-neutral-400 m-0">Hi, welcome {{ user.full_name }}!</p>
        <h1 class="text-[36px] font-[700]">Statistics</h1>
      </div>
    </section>
    <main class="grid gap-4">
      <AreaChart
        :data="chartData"
        index="time"
        :categories="['deposits', 'withdrawals']"
        :x-formatter="
          (tick, i) => {
            const time = chartData[tick]['time'];
            const date = new Date(time);
            const options = {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            };
            return !isNaN(date.getTime()) ? `${date.toLocaleString('en-US', options)}` : time;
          }
        "
        :y-formatter="
          (tick, i) => {
            return typeof tick === 'number'
              ? `${new Intl.NumberFormat('en-MY', {
                  style: 'currency',
                  currency: 'MYR',
                })
                  .format(tick)
                  .toString()}`
              : '';
          }
        "
      />
    </main>
    <footer>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-1 xl:grid-cols-3">
        <Card>
          <CardHeader class="px-4 pt-4 pb-2">
            <div class="flex items-center justify-between">
              <p>Days Since New Customer</p>
              <Badge class="cursor-pointer">+∞ </Badge>
            </div>
          </CardHeader>
          <CardContent class="flex items-center justify-end px-4 pt-0 pb-2 border-b">
            <div>
              <span class="text-foreground">{{
                tweenedDaysSinceNewCustomer.daysSinceNewCustomer.toFixed(0)
              }}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="px-4 pt-4 pb-2">
            <div class="flex items-center justify-between">
              <p>Meetings</p>
              <Badge class="cursor-pointer">+∞ </Badge>
            </div>
          </CardHeader>
          <CardContent class="flex items-center justify-end px-4 pt-0 pb-2 border-b">
            <div>
              <span class="text-foreground">{{ tweenedDates.dates.toFixed(0) }}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="px-4 pt-4 pb-2">
            <div class="flex items-center justify-between">
              <p>Customers Recruited</p>
              <Badge class="cursor-pointer">-420 </Badge>
            </div>
          </CardHeader>
          <CardContent class="flex items-center justify-end px-4 pt-0 pb-2 border-b">
            <div>
              <span class="text-foreground">{{
                tweenedcustomersRecruited.customersRecruited.toFixed(0)
              }}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </footer>
  </div>
</template>

<style scoped></style>
