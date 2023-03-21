import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { SelectedCoursesContext } from "@/context/SelectedCoursesContext/index";

export default function ChosenCoursesTable() {
  const { selectedCourses } = useContext(SelectedCoursesContext);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="courses table">
        <TableHead>
          <TableRow>
            <TableCell align="right">کد درس</TableCell>
            <TableCell align="right">نام درس</TableCell>
            <TableCell align="center">واحد (کل)</TableCell>
            <TableCell align="center">واحد (عملی)</TableCell>
            <TableCell align="right">استاد درس</TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            bgcolor: "background.default",
            boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
          }}
        >
          {selectedCourses.map(
            ({ courseID, courseName, totalUnit, practicalUnit, professor }) => (
              <TableRow
                key={courseID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  align="right"
                  dir="ltr"
                >
                  {courseID}
                </TableCell>
                <TableCell align="right">{courseName}</TableCell>
                <TableCell align="center" sx={{ color: "primary.main" }}>
                  {totalUnit}
                </TableCell>
                <TableCell align="center" sx={{ color: "primary.main" }}>
                  {practicalUnit}
                </TableCell>
                <TableCell align="right">{professor}</TableCell>
              </TableRow>
            )
          )}
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row" align="right"></TableCell>
            <TableCell
              align="right"
              sx={{ color: "success.main", fontWeight: "bold" }}
            >
              مجموع واحد ها
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "success.main", fontWeight: "bold" }}
            >
              {selectedCourses.reduce((prev, curr) => prev + curr.totalUnit, 0)}
            </TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
