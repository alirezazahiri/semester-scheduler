import showToast from "@/utils/showToast";
import { TCourse } from "@/types/courses";

export const saveCourses = async (courses: string[], sid: string) => {
  const response = await fetch(`/api/courses/save`, {
    method: "POST",
    body: JSON.stringify({ courses, sid }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  if (result.success)
    showToast("دروس انتخاب شده با موفقیت ثبت شد", "success", 2500, true);
  else showToast("ثبت دروس با خطا مواجه شد", "error", 2500, true);
};

export const getCourses = async (allCourses: TCourse[]) => {
  const response = await fetch(`/api/courses/get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  if (result.success)
    return allCourses.filter((course) => result.data.includes(course.courseID));
  showToast(
    "خطا هنگام دریافت دروس انتخاب شده، لطفا دوباره تلاش کنید",
    "error",
    3000,
    true
  );
};
