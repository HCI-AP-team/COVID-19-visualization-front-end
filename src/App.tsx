import React from 'react';
import { useState } from 'react'
import { Button, Backdrop } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import GitHubButton from 'react-github-btn'
import L7 from './graphs/international/L7'
import Memberpage from './homepage/Memberpage'
import Homepage from './homepage/Homepage'
import China from './graphs/domestic/China'
import Province from './graphs/domestic/Province'
import City from './graphs/domestic/City'
import DirectionButton from './directionButton/DirectionButton'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  bdButton: {
    position: 'fixed',
    right: '10px',
    top: '10px'
  }
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <>


      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <GitHubButton
          href="https://github.com/HCI-AP-team/AP-coursework-front-end"
          data-color-scheme="no-preference: light; light: light; dark: dark;"
          data-size="large"
          data-show-count={true}
          aria-label="Star HCI-AP-team/AP-coursework-front-end on GitHub">
          Star
        </GitHubButton>
      </div>

      <DirectionButton/>

      <Homepage />
      <L7 />
      <China />
      <Province />
      <City />
      <Button variant="outlined" color="primary" onClick={handleToggle} className={classes.bdButton}>
        learn more
      </Button>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <Memberpage />
      </Backdrop>
    </>
  );
}

export default App;
