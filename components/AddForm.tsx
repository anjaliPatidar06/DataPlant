"use client";
import { useEffect, useState } from "react";

import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import AddIcon from "@public/assets/Icon.png";
import { EditIcon, Elipse } from "@public/assets/icons";

interface IProps {
  schedule: {
    id: string;
    title: string;
    description: string;
    subject: string;
    frequency: string;
    repeat: number;
    time: string;
  };
  edit: boolean;
  handleUpdate: any;
}

export default function AddForm(props: IProps) {
  const [title, setTitle] = useState(props.schedule?.title);
  const [description, setDescription] = useState(props.schedule?.description);
  const [subject, setSubject] = useState(props.schedule?.subject);
  const [frequency, setFrequency] = useState(props.schedule?.frequency);
  const [time, setTime] = useState(props.schedule?.time);
  const [repeat, setRepeat] = useState<number | string>(props.schedule?.repeat);
  const [selectedDay, setSelectedDay] = useState(repeat);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    console.log(repeat);
  }, [repeat]);
  const clearInputs = () => {
    setTitle("");
    setDescription("");
    setSubject("");
    setTime("");
    setFrequency("");
    setRepeat("");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function generateActionUUID() {
    const uuidTemplate = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    return uuidTemplate.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  const handleEdit = async (id: string) => {
    const newData = {
      id: props?.schedule.id,
      title: title,
      description: description,
      subject: subject,
      frequency: frequency,
      repeat: repeat,
      time: time,
    };
    try {
      const response = await fetch(`/api/schedules/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      props.handleUpdate();
      handleClose();
      if (response.ok) {
        const result = await response.json();
        console.log("Data updated successfully:", result.data);
      } else {
        console.error(
          "Failed to update data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  const handleSubmit = async () => {
    handleClose();
    const newData = {
      id: generateActionUUID(),
      title: title,
      description: description,
      subject: subject,
      frequency: frequency,
      repeat: repeat,
      time: time,
    };

    try {
      const response = await fetch("/api/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      props.handleUpdate();
      if (response.ok) {
        const result = await response.json();
        console.log("Data added successfully:", result.data);
        clearInputs();
      } else {
        console.error(
          "Failed to add data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(value);
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "subject":
        setSubject(value);
        break;
      case "frequency":
        setFrequency(value);
        break;
      case "time":
        setTime(value);
        break;
      case "repeat":
        setRepeat(value);
        break;
      default:
        break;
    }
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Popover
        className="mainPopover"
        id={id}
        onClose={handleClose}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right", // Adjusted to right
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right", // Adjusted to right
        }}
      >
        <div className="popover">
          <p className="nunito fs-16" style={{ lineHeight: "24px" }}>
            {props.edit ? "Edit" : "Add"} Schedule
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <span className="nunito fs-13 keyData">Title</span>

            <TextField
              // key={keyName}
              // name={keyName}
              className="valueData"
              type=""
              size="small"
              name="title"
              value={title}
              onChange={handleChange}
              //  id="context-borders"
              // multiline
              variant="outlined"
              // inputProps={{
              //   whiteSpace: "pre-line",
              //   fontSize: "14px",
              //   fontFamily: "Inter",
              //   fontStyle: "normal",
              //   fontWeight: "400",
              //   lineHeight: "normal",
              // }}
              // sx={{
              //   width: "100%",
              // }}
              // defaultValue={
              //   "rr"
              //   // ( payload?.[keyName] )
              // }

              //  value={
              //   inputValue
              // }
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <span className="nunito fs-13 keyData">Description</span>

            <TextField
              // key={keyName}
              // name={keyName}
              className="valueData nunito"
              type=""
              size="small"
              name="description"
              value={description}
              onChange={handleChange}
              //  id="context-borders"
              multiline
              variant="outlined"
              // inputProps={{
              //   whiteSpace: "pre-line",
              //   fontSize: "14px",
              //   fontFamily: "Inter",
              //   fontStyle: "normal",
              //   fontWeight: "400",
              //   lineHeight: "normal",
              // }}
              // sx={{
              //   width: "100%",
              // }}
              // defaultValue={
              //   "rr"
              //   // ( payload?.[keyName] )
              // }

              //  value={
              //   inputValue
              // }
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <span className="nunito fs-13 keyData">Subject</span>

            <TextField
              // key={keyName}
              // name={keyName}
              className="valueData"
              type=""
              size="small"
              name="subject"
              value={subject}
              onChange={handleChange}
              //  id="context-borders"
              // multiline
              variant="outlined"
              // inputProps={{
              //   whiteSpace: "pre-line",
              //   fontSize: "14px",
              //   fontFamily: "Inter",
              //   fontStyle: "normal",
              //   fontWeight: "400",
              //   lineHeight: "normal",
              // }}
              // sx={{
              //   width: "100%",
              // }}
              // defaultValue={
              //   "rr"
              //   // ( payload?.[keyName] )
              // }

              //  value={
              //   inputValue
              // }
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <span className="nunito fs-13 keyData">Frequency</span>

            <FormControl
              className="valueData"
              sx={{
                height: "32px",
              }}
            >
              <Select
                value={frequency}
                onChange={handleChange}
                name="frequency"
                // displayEmpty
                // inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem className="menuItem" value={"Monthly"}>
                  Monthly
                </MenuItem>
                <MenuItem className="menuItem" value={"Weekly"}>
                  Weekly
                </MenuItem>
                <MenuItem className="menuItem" value={"Daily"}>
                  Daily
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          {frequency && frequency !== "Daily" && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <span className="nunito fs-13 keyData">Repeat</span>
              {frequency === "Monthly" && (
                <FormControl
                  className="valueData"
                  sx={{
                    height: "32px",
                  }}
                >
                  <Select
                    value={repeat}
                    onChange={handleChange}
                    name="repeat"
                    // displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem className="menuItem" value={"First Monday"}>
                      First Monday
                    </MenuItem>
                    <MenuItem className="menuItem" value={"Last Friday"}>
                      Last Friday
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
              {frequency === "Weekly" && (
                <div className="weeklyDiv">
                  {["S", "M", "T", "W", "T", "F", "S"].map((t, index) => (
                    <span
                      style={{ cursor: "pointer" }}
                      key={index}
                      onClick={() => {
                        setRepeat(index);
                        setSelectedDay(index);
                      }}
                    >
                      {" "}
                      <Elipse
                        text={t}
                        fill={selectedDay === index ? "#ebe8ef" : "white"}
                      />
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <span className="nunito fs-13 keyData">Time</span>

            <FormControl
              className="valueData"
              sx={{
                height: "32px",
              }}
            >
              <Select
                value={time}
                onChange={handleChange}
                name="time"
                // displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem className="menuItem" value={"10:00 AM"}>
                  10:00 AM
                </MenuItem>
                <MenuItem className="menuItem" value={"12:00 PM"}>
                  12:00 PM
                </MenuItem>
                <MenuItem className="menuItem" value={"03:00 PM"}>
                  03:00 PM
                </MenuItem>
                <MenuItem className="menuItem" value={"05:00 PM"}>
                  05:00 PM
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="formButtons nunito">
            <button
              type="button"
              onClick={() => {
                handleClose(), !props.edit && clearInputs();
              }}
              className="formButton nunito"
              style={{ background: "#ebe8ef", color: "#333" }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="formButton nunito"
              style={{ background: "#391E5A", color: "#FFF" }}
              onClick={() => {
                props.edit ? handleEdit(props.schedule?.id) : handleSubmit();
              }}
            >
              {props.edit ? "Update" : "Done"}
            </button>
          </div>
        </div>
      </Popover>
      {props.edit ? (
        <span style={{ display: "inline-block" }} onClick={handleClick}>
          <EditIcon />
        </span>
      ) : (
        <div className="addButton nunito" onClick={handleClick}>
          <>
            <img src={AddIcon.src} />{" "}
            <span style={{ fontWeight: 400, fontSize: "12px", color: "#FFF" }}>
              Add
            </span>
          </>
        </div>
      )}
    </>
  );
}
