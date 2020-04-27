import React from 'react'
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Cancel from '@material-ui/icons/Cancel';
import requestNews from '../../api/requestNews'
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: '100vh',
  },
  media: {
    height: 0,
    paddingTop: '40.25%', // 56.25%=16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Journalism(props: any) {
  const { id, setOpen } = props;
  const classes = useStyles();
  const [cityData, setCityData] = useState()
  const [load, SetLoad] = useState(true)
  const handleExpandClick = () => {
    setOpen(false)
  };
  useEffect(() => {
    const fetchData = async () => {
      let news = await requestNews()//news信息
      setCityData([news.results[id]])
      setTimeout(() => SetLoad(!load), 0);
    }
    fetchData();
  }, [])

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="ArrowBack" onClick={() => handleExpandClick()}>
            <Cancel />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
        </Toolbar>
      </AppBar>
      {
        load ?
          <div style={{ display: load ? 'flex' : 'none', justifyContent: 'center' }}>
            <CircularProgress size={40} thickness={6} color="secondary" />
          </div>
          :
          cityData && cityData.map((item: any, index: any) => {
            return <Card className={classes.root} key={index}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    N
                </Avatar>
                }
                title={item.title}
                subheader={item.infoSource}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.summary}
                </Typography>
              </CardContent>
            </Card>

          })
      }
    </div>
  )
}

export default Journalism
