import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button/Button";
import { NavLink } from 'react-router-dom';
import ScrollReveal from "scrollreveal";
import LanguageChoose from "../../components/LanguageChoose";


const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    color: 'white',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#748ba4'   //#ffffff  #afb4db
  },

  h1: {
    width: '100vw',
    height: '10vh',
    color: '#1d2228',//字体颜色
    fontSize: '35px',
    textAlign: 'center',
    backgroundColor: '#748ba4'//#E8E8FF
  }
})

export default function Journalism(props: any) {
  const { language, newsData } = props;
  const classes = useStyles();
  console.log(language)
  const list: JSX.Element[] = newsData.map((item: any, index: any) => {
    return  !language && index < 5 ?
            <List component="nav" aria-label="main mailbox folders" key={index}>
              <ListItem>
                <Button href={`/Jumppage?id=${index}`}>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>

                  <ListItemText primary={item.title} secondary={item.infoSource} />
                </Button>
              </ListItem>
            </List>
            : language && index > 4 ?
            <List component="nav" aria-label="main mailbox folders" key={index}>
              <ListItem>
                <Button href={item.sourceUrl}>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>

                  <ListItemText primary={item.title} secondary={item.infoSource} />
                </Button>
              </ListItem>
            </List>
            : null
  })


  return (
    <div className={classes.root} >
      <h1 className={classes.h1}>{language ? '新闻概览' : 'News Overview'}</h1>
      <div>{list}</div>
    </div>
  )
}


