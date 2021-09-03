import React from 'react';
import { FormControl, InputLabel, Select } from '@material-ui/core';

const Dropdown = ({
  options,
  handleChange,
  value,
  label,
  name,
  width = 360,
  required = false,
}) => {
  return (
    <FormControl
      required={required}
      variant='outlined'
      style={{ width: `${width}px` }}
    >
      <InputLabel htmlFor='outlined-age-native-simple'>{label}</InputLabel>
      <Select
        native
        value={value}
        onChange={handleChange}
        label={label}
        inputProps={{
          name: `${name}`,
          id: `outlined-${name}-native-simple`,
        }}
      >
        <option aria-label='None' value='' />
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
