import { TCourse } from "@/types/courses";
import { TSchedule } from "@/types/plan";

export const getCourseWeeklyPlan = (course: TCourse) => {
  const { dateAndTime } = course;
  const result: TSchedule[] = [];
  let i = 0;
  for (const [day, time] of Object.entries(dateAndTime)) {
    if (day !== "exam") {
      result[i] = {
        day: "",
        time: {
          from: "",
          to: "",
        },
        courseName: "",
        courseID: "",
        totalUnit: 0,
        practicalUnit: 0,
        remainingCapacity: 0,
        professor: "",
        description: "",
      };
      result[i].day = day;
      result[i].time = time as { from: string; to: string };
      result[i].courseName = course.courseName;
      result[i].courseID = course.courseID;
      result[i].totalUnit = course.totalUnit;
      result[i].practicalUnit = course.practicalUnit;
      result[i].remainingCapacity = course.capacity - course.registeredCount;
      result[i].professor = course.professor;
      result[i].description = course.description || "";
      i++;
    }
  }
  return result;
};
