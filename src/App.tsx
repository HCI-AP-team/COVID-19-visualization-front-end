import React from 'react';
import { useState, useRef, Suspense } from 'react'
import { Button, Backdrop } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import GitHubButton from 'react-github-btn'
import Memberpage from './pages/Memberpage'
import Homepage from './pages/Homepage'
import DirectionButton from './components/DirectionButton'
import International from './pages/International'
import China from './pages/China/pages/China'
import Province from './pages/province/pages/Province'
// import City from './pages/city/pages/City'
import Loading from './components/Loading'
// //异步加载
// const International = React.lazy(() => import('./pages/International'));
// const China = React.lazy(() => import('./pages/China/pages/China'));
// const Province = React.lazy(() => import('./pages/Province'));
const City = React.lazy(() => import('./pages/city/pages/City'));

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 2,
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
  const wholePageRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState(false)//设定文字显示
  return (
    <div style={{ transition: 'all 1s linear' }} ref={wholePageRef}>
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
      <DirectionButton />
      <Homepage displayText={displayText}/>


      <International setDisplayText={setDisplayText}/>
      <China />
      <Province />
      <Suspense fallback={<Loading />}>
        <City />
      </Suspense>



      <Button variant="outlined" color="primary" onClick={handleToggle} className={classes.bdButton}>
        关于我们
      </Button>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <Memberpage />
      </Backdrop>
    </div>
  );
}

export default App;
