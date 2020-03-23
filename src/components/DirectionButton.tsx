import React from 'react'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
    zIndex: theme.zIndex.drawer + 1,
  },
  downBtn: {
    position: 'fixed',
    top: '50vh',
    right: '1vw'
  },
  upBtn: {
    position: 'fixed',
    top: '40vh',
    right: '1vw'
  }
}));
function DirectionButton() {
  const classes = useStyles();
  return (
    <div>
      {/* 上下移动页面的button */}
      <IconButton className={classes.margin + ' ' + classes.upBtn}>
        <ArrowUpwardIcon fontSize="large" />
      </IconButton>
      <IconButton className={classes.margin + ' ' + classes.downBtn}>
        <ArrowDownwardIcon fontSize="large" />
      </IconButton>
    </div>
  )
}

export default DirectionButton
