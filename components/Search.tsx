import { InputAdornment, TextField } from "@mui/material";
import { SearchIcon } from "@public/assets/icons";
import { useEffect, useState } from "react";

interface IProps {
    handleSchedules: any;
  }

export default function Search (props:IProps) {
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        handleSearch();
    }, [searchValue]);
    const handleSearch = async () => {
        try {
          const response = await fetch(`/api/schedules?search=${searchValue}`);
          if (response.ok) {
            const result = await response.json();
            // Now 'result' contains the parsed JSON data
            props.handleSchedules(result);
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
    )
}