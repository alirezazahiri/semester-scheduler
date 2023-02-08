export type TSchedule = {
  day: string;
  time: {
    from: string;
    to: string;
  };
  courseName: string;
  courseID: string;
  totalUnit: number;
  remainingCapacity: number;
  professor: string;
  description: string;
};

export type TDailyPlan = {
  courseID: string;
  courseName: string;
  time: { from: string; to: string };
};
export type TWeeklyPlan = { [day: string]: TDailyPlan[] };
