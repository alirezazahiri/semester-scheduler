import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { SelectedCoursesContext } from "@/context/SelectedCoursesContext/index";
import showToast from "@/utils/showToast";
import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import { e2p } from "@/utils/numbers";

type ExamType = { date: string; time: string };

export default function ChosenCoursesTable() {
  const { selectedCourses } = useContext(SelectedCoursesContext);

  const copyCourseIDHandler = async (courseID: string) => {
    await window.navigator.clipboard
      .writeText(courseID)
      .then((_) => showToast("کد درس با موفقیت کپی شد", "success"))
      .catch((_) => showToast("کپی کردن کد درس با خطا مواجه شد", "error"));
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="courses table">
          <TableHead>
            <TableRow
              sx={{
                "*": {
                  color: "primary.contrastText",
                  fontWeight: "bold",
                },
              }}
            >
              <TableCell align="right">کد درس</TableCell>
              <TableCell align="right">نام درس</TableCell>
              <TableCell align="center">واحد (کل)</TableCell>
              <TableCell align="center">واحد (عملی)</TableCell>
              <TableCell align="right">استاد درس</TableCell>
              <TableCell align="right">تاریخ امتحان</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              bgcolor: "background.default",
              boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
            }}
          >
            {selectedCourses
              .sort((a, b) => b.totalUnit - a.totalUnit)
              .map(
                ({
                  courseID,
                  courseName,
                  totalUnit,
                  practicalUnit,
                  professor,
                  dateAndTime,
                }) => {
                  const [examFrom, examTo] = dateAndTime.exam
                    ? e2p((dateAndTime.exam as ExamType).time as string).split(
                        "-"
                      )
                    : ["", ""];
                  return (
                    <TableRow
                      key={courseID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <Tooltip
                        title="برای کپی کردن کلیک کنید"
                        arrow
                        followCursor
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          align="right"
                          dir="ltr"
                          onClick={() => copyCourseIDHandler(courseID)}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row-reverse",
                              alignItems: "center",
                              gap: "4px",
                              cursor: "pointer",
                              fontWeight: "800",
                              color: "primary.contrastText",
                            }}
                          >
                            <ContentCopyIcon sx={{ color: "primary.main" }} />

                            {courseID}
                          </Box>
                        </TableCell>
                      </Tooltip>
                      <TableCell
                        align="right"
                        sx={{
                          fontSize: "13px",
                          color: "primary.contrastText",
                          fontWeight: "bold",
                        }}
                      >
                        {courseName}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "primary.light",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        {e2p(`${totalUnit}`)}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "primary.light",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        {e2p(`${practicalUnit}`)}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: "primary.contrastText",
                          fontWeight: "bold",
                        }}
                      >
                        {professor}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: "primary.contrastText",
                          fontWeight: "bold",
                        }}
                      >
                        {dateAndTime?.exam ? (
                          <Box
                            component="div"
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "4px",
                            }}
                          >
                            ساعت
                            <Box
                              component="span"
                              sx={{
                                color: "primary.light",
                                fontWeight: "bold",
                              }}
                            >
                              {examFrom}
                            </Box>
                            تا
                            <Box
                              component="span"
                              sx={{
                                color: "primary.light",
                                fontWeight: "bold",
                              }}
                            >
                              {examTo}
                            </Box>
                            در تاریخ
                            <Box
                              component="span"
                              sx={{
                                color: "primary.light",
                                fontWeight: "bold",
                              }}
                            >
                              {e2p(
                                (dateAndTime.exam as ExamType).date
                                  .split(".")
                                  .join("/")
                              )}
                            </Box>
                          </Box>
                        ) : (
                          <Box
                            component="span"
                            sx={{
                              color: "secondary.main",
                            }}
                          >
                            ندارد
                          </Box>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="right"></TableCell>
              <TableCell
                align="right"
                sx={{
                  color: "success.main",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                مجموع واحد ها
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "success.main",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {e2p(
                  `${selectedCourses.reduce(
                    (prev, curr) => prev + curr.totalUnit,
                    0
                  )}`
                )}
              </TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

/*
`ساعت ${(
                          e2p((dateAndTime.exam as ExamType).time as string)
                        )
                          .split("-")
                          .join(" تا ")} در تاریخ ${
                          e2p((dateAndTime.exam as ExamType).date.split(".").join("/"))
                        }`
*/
