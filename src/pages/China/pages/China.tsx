import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react'
import red from '@material-ui/core/colors/red';
import Slide from '@material-ui/core/Slide';
import { Paper } from '@material-ui/core';
import DisplayDetail from '../components/DisplayDetail'
import CreateChinaMap from '../components/CreateChinaMap'
import Label from '../components/Label'
const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#b3e5fc'
  },
  labels: {
    marginTop: '20vh',
    marginRight: '5vw',
    border: 'solid 2px black',
    borderRadius: '5px',
    padding: '2px',
    backgroundColor:'#e1f5fe'
  },
  detail: {
    width: "30vw",
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '4px',
    transition: 'all 1s linear',
    '& span': {
      display: 'flex',
      padding: '2px',
      justifyContent: 'space-between',
      height: '5vh',
      alignItems: 'center'
    }
  }
})



function China() {
  const [currentChoose, setCurrentChoose] = useState('');
  const labels: object[] = [
    {
      color: red[50],
      value: '0-49'
    },
    {
      color: red[100],
      value: '50-99'
    },
    {
      color: red[200],
      value: '100-499'
    },
    {
      color: red[400],
      value: '500-999'
    },
    {
      color: red[600],
      value: '1000-2000'
    },
    {
      color: red[900],
      value: '2000+'
    }
  ]
  const classes = useStyles()
  const [checked, setChecked] = useState(true);

  return (
    <div className={classes.root}>
      <CreateChinaMap handleChange={() => setChecked(prev => !prev)} setCurrentChoose={setCurrentChoose} />
      <div className={classes.labels}>
        <strong>确诊人数</strong>
        {labels.map((el: any, index: number) => <Label key={index} color={el.color} value={el.value} />)}
      </div>
      <div id="detail" className={classes.detail}>
        <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
          <Paper elevation={5}>
            <DisplayDetail currentChoose={currentChoose} />
          </Paper>
        </Slide>
      </div>
    </div>
  )
}

export default China
