"use client";
import { useState, useEffect } from "react";
import AddForm from "@components/AddForm";
import {
  Box,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { DelIcon, EditIcon, SearchIcon } from "@public/assets/icons";

export default function Home() {
  const [schedules, setSchedules] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [updateData, setUpdateData] = useState(false);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const fetchData = async () => {
    try {
      const response = await fetch("/api/schedules");
      const result = await response.json();
      if (result) {
        setSchedules(result.schedules);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    !searchValue && fetchData();
  }, [updateData, searchValue]);

  const handleUpdate = () => {
    // fetchData();
    setUpdateData((prev) => !prev);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/schedules/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      handleUpdate();

      if (response.status === 200) {
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
  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/schedules?search=${searchValue}`);
      if (response.ok) {
        const result = await response.json();
        // Now 'result' contains the parsed JSON data
        setSchedules(result);
        // Set the result to your state or perform other actions
      } else {
        console.error(
          "Error fetching search results:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <>
      <Box className="mainContainer">
        <header className="header"></header>
        <nav className="navbar">
          <TextField
            placeholder={"Search"}
            name="searchText"
            value={searchValue}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  onClick={handleSearch}
                  sx={{ cursor: "pointer", marginTop: "3px" }}
                  position="end"
                >
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            size="small"
            className="searchField"
            margin="normal"
          />

          <AddForm
            edit={false}
            handleUpdate={handleUpdate}
            schedule={{
              id: "",
              title: "",
              description: "",
              subject: "",
              frequency: "",
              repeat: 0,
              time: "",
            }}
          />
        </nav>
        <section className="listContainer">
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
                {schedules?.map((schedule: any) => (
                  <TableRow
                    key={schedule.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell className="nunito" component="th" scope="row">
                      {schedule.title}
                    </TableCell>
                    <TableCell className="nunito">
                      {schedule.description}
                    </TableCell>
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
                            handleUpdate={handleUpdate}
                          />
                        </span>
                        {/* {edit && <Form edit={true} />} */}
                        &nbsp;
                        <span
                          onClick={() => {
                            handleDelete(schedule.id);
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
        </section>
      </Box>
    </>
  );
}
