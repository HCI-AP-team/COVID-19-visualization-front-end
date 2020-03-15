import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles({
  title:{
    fontSize:'35px',
    fontWeight:'bold',
    textAlign:'center',
  },
  root1: {
    minWidth: 200,
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  cards: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    margin:'20vh auto'
  }
});

const Homepage = () => {
  const classes = useStyles();
  const peopleData: object[] = [
    {
      name: 'lkc',
      des: 'richest'
    },
    {
      name: 'gs',
      des: 'the king of diao'
    },
    {
      name: 'gsw',
      des: 'big tiger'
    },
    {
      name: 'xww',
      des: 'girl'
    },
    {
      name: 'pzz',
      des: 'liver emperor'
    }
  ]
  const card: JSX.Element[] = peopleData.map((item: any) =>
    <Card className={classes.root1} key={item.name}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={process.env.PUBLIC_URL+"/gs.jpg"}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {item.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.des}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="large" variant="contained" color="primary">
          Learn More
      </Button>
      </CardActions>
    </Card>)
  return (
    <div style={{width:'100vw',height:'100vh'}}>
      <p className={classes.title}>Welcome to Our Coursework</p>
      <div className={classes.cards}>{card}</div>

    </div>
  )
}

export default Homepage
