export type TCourse = {
  collegeID: string;
  collegeName: string;
  groupName: string;
  groupID: string;
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
    [day: string]:
      | {
          from: string;
          to: string;
        }
      | {
          date: string;
          time: string;
        };
  };
  description?: "";
};
