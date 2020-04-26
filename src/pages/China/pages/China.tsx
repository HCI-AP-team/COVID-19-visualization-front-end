import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react'
import ScrollReveal from 'scrollreveal'
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
    backgroundColor: '#748ba4'
  },
  labels: {
    marginTop: '20vh',
    marginRight: '5vw',
    border: 'solid 2px black',
    borderRadius: '5px',
    padding: '2px',
    minWidth: '144px',
    backgroundColor: '#e1f5fe'
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
  },
    h1: {
        width: '100vw',
        height: '10vh',
        color: '#1d2228',//字体颜色
        fontSize: '50px',
        textAlign: 'center',
        backgroundColor: '#748ba4'//#E8E8FF
    }
})



function China(props: any) {
  const { chinaData, language } = props;
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

  useEffect(() => {
    ScrollReveal().reveal(".ChinaMap", {
      duration: 2000,
      distance: '0px',
      reset: true,
      rotate: {
        x: 20,
        z: 20
      }
    })//入场动画
  }, [])

  return (
    <div className={classes.root + ' ChinaMap'} >
      <CreateChinaMap language={language} chinaData={chinaData} handleChange={() => setChecked(prev => !prev)} setCurrentChoose={setCurrentChoose} />

      <div className={classes.labels}>
        <strong>{language ? '累计确诊人数' : 'confirmed count'}</strong>
        {labels.map((el: any, index: number) => <Label key={index} color={el.color} value={el.value} />)}
      </div>

      <div id="detail" className={classes.detail}>
        <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
          <Paper elevation={10}>
            <DisplayDetail chinaData={chinaData} language={language} currentChoose={currentChoose} />
          </Paper>
        </Slide>
      </div>
    </div>
  )
}

export default China
