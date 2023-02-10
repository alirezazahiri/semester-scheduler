import compareTime from "@/utils/compareTime";
import { TDailyPlan } from "@/types/plan";
import sortedPlan from "@/utils/sortDailyPlan";
import getTimeScale from "@/utils/getTimeScale";

export const isInterfering = (time1: string, time2: string): boolean => {
  const [[start1, end1], [start2, end2]] = [time1.split("-"), time2.split("-")];

  if (compareTime(start1, start2) === 0) return true;
  if (compareTime(start1, start2) === 1 && compareTime(start1, end2) === -1)
    return true;
  if (compareTime(start2, start1) === 1 && compareTime(start2, end1) === -1)
    return true;

  return false;
};

const calculateDayRow = (plan: TDailyPlan[], dayName: string) => {
  const sorted = sortedPlan(plan);
  const times = sorted?.map((p) => `${p.time.from}-${p.time.to}`);
  let newPlans: (TDailyPlan & { timeScale: number })[] = [];
  // let temp: TDailyPlan | { practicalUnit: string; totalUnit: string };

  for (let i = 0; i < times?.length; i++) {
    const startTime = i === 0 ? "7:30" : times[i - 1].split("-")[1];
    if (i > 0 && isInterfering(times[i - 1], times[i])) {
      //TODO: figure another way to show interference
      // const message = `تداخل دو درس ${sorted[i-1].courseName} و ${sorted[i].courseName} در روز ${dayName}`
      // console.log(message);
      continue;
    }
    const diffFromStart = getTimeScale(startTime, times[i].split("-")[0]);
    if (diffFromStart !== 0) {
      newPlans.push({
        courseID: `diff${i}*${diffFromStart}`,
        courseName: "NOT_A_COURSE",
        time: { from: "", to: "" },
        totalUnit: diffFromStart * 2,
        timeScale: diffFromStart,
        practicalUnit: 0,
        professor: "",
        description: "",
      });
    }
    newPlans.push({
      ...sorted[i],
      timeScale: getTimeScale(sorted[i].time.from, sorted[i].time.to),
    });
  }
  return newPlans;
};

export default calculateDayRow;
