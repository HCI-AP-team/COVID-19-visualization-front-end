import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
const useLabelStyle = makeStyles({
    root: {
      display: "flex",
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    label: {
      height: '15px',
      width: '30px',
      marginRight: '5px',
      fontSize: '5px'
    }
  })
  
  
  
  
  
  function Label(props: any) {
    const classes = useLabelStyle();
    const { color, value} = props;
    return (
      <div className={classes.root}>
        <div className={classes.label} style={{ backgroundColor: color }}></div>
        <span>{value}</span>
      </div>
    )
  }
  export default Label