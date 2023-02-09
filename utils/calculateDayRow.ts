import { TDailyPlan } from "@/types/plan";
import sortedPlan from "@/utils/sortDailyPlan";
import getTimeScale from "@/utils/getTimeScale";

const calculateDayRow = (plan: TDailyPlan[]) => {
  const sorted = sortedPlan(plan);
  const times = sorted?.map((p) => `${p.time.from}-${p.time.to}`);
  let newPlans: TDailyPlan[] = [];

  for (let i = 0; i < times?.length; i++) {
    const startTime = i === 0 ? "7:30" : times[i - 1].split("-")[1];
    const diffFromStart = getTimeScale(startTime, times[i].split("-")[0]);
    if (diffFromStart !== 0) {
      console.log(startTime, times[i].split("-")[0], diffFromStart);
      newPlans.push({
        courseID: `diff${i}*${diffFromStart}`,
        courseName: "NOT_A_COURSE",
        time: { from: "", to: "" },
        totalUnit: diffFromStart * 2,
        practicalUnit: 0,
      });
    }
    console.log(
      sorted[i].time.from,
      sorted[i].time.to,
      (sorted[i].totalUnit - sorted[i].practicalUnit) * 0.5 +
        sorted[i].practicalUnit * 2
    );
    newPlans.push({
      ...sorted[i],
      totalUnit: sorted[i].totalUnit === 2 ? 4 : sorted[i].totalUnit
    });
  }
  return newPlans;
};

export default calculateDayRow;
