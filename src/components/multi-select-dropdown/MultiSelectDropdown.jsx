import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from '@material-ui/core';

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultiSelectDropdown = ({ names }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    event.stopPropagation();
    setPersonName(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    event.stopPropagation();
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id='demo-mutiple-name-label'>Name</InputLabel>
      <Select
        labelId='demo-mutiple-name-label'
        id='demo-mutiple-name'
        multiple
        value={personName}
        onChange={handleChange}
        input={<Input />}
        MenuProps={MenuProps}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, personName, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectDropdown;
