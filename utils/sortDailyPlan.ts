import { TDailyPlan } from "@/types/plan";
const compareTime = (t1: string, t2: string) => {
  const s1 = t1.split(":").map((s) => Number(s));
  const s2 = t2.split(":").map((s) => Number(s));

  const totalSeconds1 = s1[0] * 3600 + s1[1] * 60;
  const totalSeconds2 = s2[0] * 3600 + s2[1] * 60;

  return totalSeconds1 > totalSeconds2 ? 1 : -1;
};

const sortedPlan = (plan: TDailyPlan[]) =>
  plan?.sort((a, b) => compareTime(a.time.from, b.time.from));

export default sortedPlan;
