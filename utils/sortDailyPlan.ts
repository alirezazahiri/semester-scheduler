import { TDailyPlan } from "@/types/plan";
import compareTime from "@/utils/compareTime";


const sortedPlan = (plan: TDailyPlan[]) =>
  plan?.sort((a, b) => compareTime(a.time.from, b.time.from));

export default sortedPlan;
