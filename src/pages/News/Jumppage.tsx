import React from 'react'
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import newsData from '../../../src/assets/news'
//import ChooseCity from '../components/ChooseCity'
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Menu';
import requestNews from '../../api/requestNews'

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: '100vh',
      backgroundColor: '#748ba4'//#748ba4'
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
  const classes = useStyles();
  const [cityData, setCityData] = useState()
  const [id] = useState(props.location.search.split('?id=')[1])
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    props.history.goBack()
  };
  useEffect(() => {
    const fetchData = async () => {
      let news = await requestNews()//news信息
      setCityData([news.results[id]])
    }
    fetchData();
  }, [])

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="ArrowBack" onClick={() => handleExpandClick()}>
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
    </Typography>
        </Toolbar>
      </AppBar>
      {
        cityData && cityData.map((item: any, index: any) => {
          return <Card className={classes.root} key={index}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  N
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={item.title}
              subheader={item.infoSource}
            />
            <CardMedia
              className={classes.media}
              image={item.sourceUrl}
              title="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {item.summary}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>

        })
      }
    </div>
  )
}

export default Journalism
