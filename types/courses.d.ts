export type TCourse = {
  college: string;
  group: string;
  courseID: string;
  courseName: string;
  totalUnit: number;
  practicalUnit: number;
  capacity: number;
  registeredCount: number;
  waitListCount: number;
  gender: string;
  professor: string;
  dateAndTime: {
    [day: string]: {
      from: string;
      to: string;
    };
    exam?: {
      date: string;
      time: string;
    };
  };
  description?: "";
};