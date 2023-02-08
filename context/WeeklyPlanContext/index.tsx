import { TWeeklyPlan } from "@/types/plan";
import React, { createContext, useState } from "react";

interface ContextProps {
  weeklyPlan: TWeeklyPlan;
  setWeeklyPlan: (courseList?: TWeeklyPlan) => void;
}
interface IProps {
  children: JSX.Element;
}

export const WeeklyPlanContext = createContext<ContextProps>({
  weeklyPlan: {},
  setWeeklyPlan: () => {},
});

const WeeklyPlanContextProvider: React.FC<IProps> = ({ children }) => {
  const [weeklyPlan, setWeeklyPlan] = useState<TWeeklyPlan>({});

  const setPlan = (planList: TWeeklyPlan = {}) => {
    setWeeklyPlan(planList);
  };

  return (
    <WeeklyPlanContext.Provider value={{ weeklyPlan, setWeeklyPlan: setPlan }}>
      {children}
    </WeeklyPlanContext.Provider>
  );
};

export default WeeklyPlanContextProvider;
