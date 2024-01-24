import { FormControl, Select, MenuItem } from "@mui/material";
import { Elipse } from "@public/assets/icons";
import { useState } from "react";

interface IProps {
  handleChange: any;
  frequency: string;
  setRepeat: any;
  repeat: any;
}
export default function Frequency(props: IProps) {
  const [selectedDay, setSelectedDay] = useState(props.repeat);
  return (
    <>
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
            value={props.frequency}
            onChange={props.handleChange}
            name="frequency"
          >
            {["Monthly", "Weekly", "Daily"].map((item) => (
              <MenuItem className="menuItem" value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {props.frequency && props.frequency !== "Daily" && (
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
          {props.frequency === "Monthly" && (
            <FormControl
              className="valueData"
              sx={{
                height: "32px",
              }}
            >
              <Select
                value={props.repeat}
                onChange={props.handleChange}
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
          {props.frequency === "Weekly" && (
            <div className="weeklyDiv">
              {["S", "M", "T", "W", "T", "F", "S"].map((t, index) => (
                <span
                  style={{ cursor: "pointer" }}
                  key={index}
                  onClick={() => {
                    props.setRepeat(index);
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
    </>
  );
}
