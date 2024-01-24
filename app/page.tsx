"use client";
import { useState, useEffect } from "react";
import AddForm from "@components/AddForm";
import {
  Box,
} from "@mui/material";
import Search from "@components/Search";
import SchedulesList from "@components/SchedulesList";

export default function Home() {

  const [schedules, setSchedules] = useState<any>([]);
  const [updateData, setUpdateData] = useState(false);
  const fetchData = async () => {
    try {
      const response = await fetch("/api/schedules");
      const result = await response.json();
      if (result) {
        setSchedules(result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [updateData]);

  const handleUpdate = () => {
    // fetchData();
    setUpdateData((prev) => !prev);
  };
const handleSchedules =(searchData = schedules) => {
    setSchedules(searchData);
}
 return (
    <>
      <Box className="mainContainer">
        <header className="header"></header>
        <section className="navbar">
          <Search handleSchedules={handleSchedules} />

          <AddForm
            edit={false}
            handleUpdate={handleUpdate}
            schedule={{
              _id: "",
              title: "",
              description: "",
              subject: "",
              frequency: "",
              repeat: 0,
              time: "",
            }}
          />
        </section>
        <section className="listContainer">
          <SchedulesList schedules={schedules} handleSchedules={handleSchedules} handleUpdate={handleUpdate} />
          </section>
      </Box>
    </>
  );
}
