import * as React from "react";
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { listOfTypes } from "../../constants/listsOfSearch";

const ITEM_HEIGHT = 20;
const ITEM_PADDING_TOP = 30;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function TypesSelect({
  attribute,
  name,
  formData,
  setFormData,
}) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData({
      ...formData,
      [attribute]: typeof value === "string" ? value.split(",") : value,
    });
  };

  return (
    <FormControl>
      <InputLabel>{name}</InputLabel>
      <Select
        // multiple
        value={formData[attribute]}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                sx={{
                  color: "#fff",
                  fontWeight: "bolder",
                }}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {["All", ...listOfTypes.sort()].map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={formData[attribute].indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
