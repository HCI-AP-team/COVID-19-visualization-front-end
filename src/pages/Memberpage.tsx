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
  root: {
    width: '100vw',
    height: '100vh'
  },
  title: {
    fontSize: '35px',
    fontWeight: 'bold',
    textAlign: 'center',
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
    margin: '20vh auto'
  }
});

const Memberpage = (props: any) => {
  const { language } = props;
  const classes = useStyles();
  const peopleData: object[] = [
    {
      name: '李康诚',
      enName: 'Kangcheng Li',
      des: '数据库管理员',
      enDes: 'database manager',
      link: 'https://github.com/lkczn'
    },
    {
      name: '郭帅',
      enName: 'Shuai Guo',
      des: '打包工程师',
      enDes: 'packege engineer',
      link: 'https://github.com/loveisever'
    },
    {
      name: '高士玮',
      enName: 'Shiwei Gao',
      des: '前端工程师',
      enDes: 'back-end engineer',
      link: 'https://github.com/shituweian'
    },
    {
      name: '肖文伟',
      enName: 'Wenwei Xiao',
      des: '前端工程师',
      enDes: 'front-end engineer',
      link: 'https://github.com/xiao-wenwei'
    },
    {
      name: '彭奏章',
      enName: 'Zouzhang Peng',
      des: '前端工程师',
      enDes: 'front-end engineer',
      link: 'https://github.com/GiorgioPeng'
    }
  ]
  const card: JSX.Element[] = peopleData.map((item: any) =>
    <Card className={classes.root1} key={item.name}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={process.env.PUBLIC_URL + "/gs.jpg"}
          title="Contemplative Reptile"
        />
        <CardContent>
          {language ?
            <>
              <Typography gutterBottom variant="h5" component="h2">
                {item.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {item.des}
              </Typography>
            </>
            :
            <>
              <Typography gutterBottom variant="h5" component="h2">
                {item.enName}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {item.enDes}
              </Typography>
            </>
          }

        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="large" variant="contained" color="primary">
          <a href={item.link}>{language ? '我的github' : 'My github'}</a>
        </Button>
      </CardActions>
    </Card>)
  return (
    <div className={classes.root}>
      <p className={classes.title}>{language ? '欢迎来到我们的新冠肺炎可视化系统' : "Welcome to our covid-19 visualization system"}</p>
      <div className={classes.cards}>{card}</div>
    </div>
  )
}

export default Memberpage
