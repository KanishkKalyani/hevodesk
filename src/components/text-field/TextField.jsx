import React from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const HdTextField = (props) => (
  <StylesProvider injectFirst>
    <TextField
      {...props}
      variant={props.variant}
      InputLabelProps={{
        ...props.InputLabelProps,
        ...(props.InputProps?.startAdornment
          ? { className: 'MuiInputLabel-inputAdornedStart' }
          : {}),
      }}
    />
  </StylesProvider>
);

export default HdTextField;

HdTextField.defaultProps = {
  variant: 'outlined',
};
