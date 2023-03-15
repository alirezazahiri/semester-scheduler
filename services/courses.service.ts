import showToast from "@/utils/showToast";
import { TCourse } from "@/types/courses";
import { API_BASE_URL } from "@/constants/services.constants";

export const saveCourses = async (courses: string[], sid: string) => {
  const response = await fetch(`${API_BASE_URL}/courses/save`, {
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
  const response = await fetch(`${API_BASE_URL}/courses/get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  return allCourses.filter(course => result.data.includes(course.courseID))
};
