import { FormControl, Select, MenuItem } from "@mui/material";

interface IProps {
    time: string;
    handleChange: any;
}

export default function Time(props:IProps) {
    return (
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
                value={props.time}
                onChange={props.handleChange}
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
    )
}