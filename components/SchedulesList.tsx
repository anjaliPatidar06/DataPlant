import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { DelIcon } from "@public/assets/icons";
import AddForm from "./AddForm";
import Toast from "@components/Toast";
import { useState } from "react";

interface IProps {
  schedules: [];
  handleSchedules: any;
  handleUpdate: any;
}

export default function SchedulesList(props: IProps) {
  const [openToast, setOpenToast] = useState(false);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/schedules/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      props.handleUpdate();

      if (response.status === 200) {
        setOpenToast(true);
      } else {
        console.error(
          "Failed to delete data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  return (
    <>
      {openToast && <Toast message={"Meeting Deleted!"} severity={"warning"} />}
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, fontFamily: "Nunito Sans" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                className="nunito"
                sx={{ fontWeight: "600!important" }}
              >
                Title
              </TableCell>
              <TableCell
                className="nunito"
                sx={{ fontWeight: "600!important" }}
              >
                Description
              </TableCell>
              <TableCell
                className="nunito"
                sx={{ fontWeight: "600!important" }}
              >
                Subject
              </TableCell>
              <TableCell
                className="nunito"
                sx={{ fontWeight: "600!important" }}
              >
                Schedule
              </TableCell>
              <TableCell
                className="nunito"
                sx={{ fontWeight: "600!important" }}
              >
                Actions
              </TableCell>
              {/* <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell> */}
            </TableRow>
          </TableHead>

          <TableBody>
            {props.schedules?.map((schedule: any) => (
              <TableRow
                key={schedule?._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell className="nunito" component="th" scope="row">
                  {schedule.title}
                </TableCell>
                <TableCell className="nunito">{schedule.description}</TableCell>
                <TableCell className="nunito">{schedule.subject}</TableCell>
                <TableCell className="nunito">
                  {schedule?.frequency} at{" "}
                  {typeof schedule?.repeat === "number" &&
                  days[schedule?.repeat] !== undefined
                    ? days[schedule?.repeat]
                    : schedule?.repeat}
                </TableCell>
                <TableCell className="nunito">
                  <div className="tableActions">
                    <span className="actionIcon">
                      <AddForm
                        edit={true}
                        schedule={schedule}
                        handleUpdate={props.handleUpdate}
                      />
                    </span>
                    {/* {edit && <Form edit={true} />} */}
                    &nbsp;
                    <span
                      onClick={() => {
                        handleDelete(schedule?._id);
                      }}
                      className="actionIcon"
                    >
                      <DelIcon />
                    </span>
                  </div>
                </TableCell>
                {/* <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
