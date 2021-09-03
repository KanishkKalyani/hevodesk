import React from 'react';
import { InputLabel } from '@material-ui/core';

function TextFieldShimmer(props) {
  return (
    <div className='position-relative'>
      <InputLabel
        className='position-absolute'
        variant='outlined'
        shrink={true}
        disabled={true}
      >
        {props.label}
      </InputLabel>

      <span className='text-field-input-shimmer'>
        <div
          className='shimmer shimmer-line my-1'
          style={{ width: '120px', height: '8px' }}
        />
      </span>
    </div>
  );
}

export default TextFieldShimmer;
