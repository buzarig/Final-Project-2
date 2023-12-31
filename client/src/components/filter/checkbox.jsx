/* eslint-disable react/prop-types */
import React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({
  nameCheckboxes,
  dataOptions,
  value,
  onDataOptions
}) {
  return (
    <Autocomplete
      multiple
      limitTags={3}
      id="checkboxes-tags-demo"
      options={dataOptions}
      value={value}
      onChange={(event, newValue) => {
        onDataOptions(newValue);
      }}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label={nameCheckboxes} placeholder="Favorites" />
      )}
    />
  );
}
