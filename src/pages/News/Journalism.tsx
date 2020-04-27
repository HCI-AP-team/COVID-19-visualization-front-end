import React from 'react'
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button/Button";
import { Dialog } from '@material-ui/core';
import Jumppage from './Jumppage'



const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    color: 'white',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  h1: {
    width: '100vw',
    height: '10vh',
    color: '#1d2228',//字体颜色
    fontSize: '35px',
    textAlign: 'center',
  },
  des:{
    textAlign:'left'
  }
})

export default function Journalism(props: any) {
  const { language, newsData } = props;
  const classes = useStyles();
  const [list, setList] = useState();
  const [id, setId] = useState();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (index: any) => () => {
    setId(index)
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (newsData)
      setList(newsData.map((item: any, index: any) => {
        return !language && index < 5 ?
          <List component="nav" aria-label="main mailbox folders" key={index}>
            <ListItem>
              <Button onClick={handleClickOpen(index)}>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText classes={{secondary:classes.des}}primary={item.title} secondary={item.infoSource} />
              </Button>
            </ListItem>
          </List>
          : language && index > 4 ?
            <List component="nav" aria-label="main mailbox folders" key={index}>
              <ListItem>
                <Button onClick={handleClickOpen(index)}>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText classes={{secondary:classes.des}}primary={item.title} secondary={item.infoSource} />
                </Button>
              </ListItem>
            </List>
            : null
      })
      )
  }, [newsData, language])




  return (
    <div className={classes.root} >
      <h1 className={classes.h1}>{language ? '新闻概览' : 'News Overview'}</h1>
      <div>{list}</div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <Jumppage id={id} setOpen={setOpen}/>
      </Dialog>
    </div>
  )
}


