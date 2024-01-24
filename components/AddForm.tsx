"use client";
import { useState } from "react";
import Popover from "@mui/material/Popover";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import AddIcon from "@public/assets/Icon.png";
import { EditIcon, Elipse } from "@public/assets/icons";
import Toast from "./Toast";
import Frequency from "./Frequency";
import Time from "./Time";

interface IProps {
  schedule: {
    _id: string;
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

  const [message, setMessage] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
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
    clearInputs();
  };
  const handleToast = (msg: string) => {
    setMessage(msg);
    setOpenToast(true);
  };
  const handleEdit = async (id: string) => {
    const newData = {
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
        handleToast("Meeting Updated!");
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
        handleToast("Meeting Added");
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
      {openToast && <Toast message={message} severity={"success"} />}
      <Popover
        className="mainPopover"
        id={id}
        onClose={handleClose}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
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
              className="valueData"
              type=""
              size="small"
              name="title"
              value={title}
              onChange={handleChange}
              variant="outlined"
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
              className="valueData nunito"
              type=""
              size="small"
              name="description"
              value={description}
              onChange={handleChange}
              multiline
              variant="outlined"
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
              className="valueData"
              type=""
              size="small"
              name="subject"
              value={subject}
              onChange={handleChange}
              variant="outlined"
            />
          </div>
          <Frequency
            handleChange={handleChange}
            frequency={frequency}
            setRepeat={setRepeat}
            repeat={repeat}
          />
          <Time handleChange={handleChange} time={time} />

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
                props.edit
                  ? handleEdit(props.schedule?._id)
                  : title && handleSubmit();
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
