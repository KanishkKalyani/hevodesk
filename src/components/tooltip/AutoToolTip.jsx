import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core/Tooltip';

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: 'black !important',
  },
  tooltip: {
    padding: '5px !important',
    margin: '5px !important',
    backgroundColor: theme.palette.common.black,
    fontSize: 'inherit',
    color: 'white !important',
    top: '5px',

    left: '-5px',
    position: 'relative',
  },
}));

const AutoToolTip = (props) => {
  const classes = useStylesBootstrap();
  return (
    <>
      {props.showToolTip ? (
        <Tooltip arrow title={props.title} classes={classes}>
          {props.children}
        </Tooltip>
      ) : (
        props.children
      )}
    </>
  );
};
export default AutoToolTip;

AutoToolTip.defaultProps = {
  showToolTip: true,
};
