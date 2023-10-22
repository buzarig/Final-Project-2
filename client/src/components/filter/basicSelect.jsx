/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({
  nameCheckboxes,
  valueSelect,
  onValueSelect,
  listSelect = []
}) {
  return (
    <Box sx={{ minWidth: 262 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{nameCheckboxes}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={valueSelect}
          label={nameCheckboxes}
          onChange={onValueSelect}
        >
          <MenuItem value="">Nothing</MenuItem>
          {listSelect.length &&
            listSelect.map((item, i) => (
              <MenuItem key={i} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
