import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import LocationCity from '@material-ui/icons/LocationCity';
import VpnLock from '@material-ui/icons/VpnLock';
import People from '@material-ui/icons/People';
import Public from '@material-ui/icons/Public';
import Home from '@material-ui/icons/Home';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: '40%',
      right: theme.spacing(2),
      zIndex: 999
    },
    grouped: {
      border: 'none',
      margin: 0,
    }
  }),
);


export default function DirectionButton(props: any) {
  const { language } = props;
  const classes = useStyles();
  const [position, setPosition] = useState<string | null>('home');
  const handleClick = (event: React.MouseEvent<HTMLElement>, position: string | null) => {
    setPosition(position);
  };
  const [scrollPosition, setScrollPosition] = useState(0)
  useEffect(() => {
    //帮助用户确定滑到哪里了
    window.addEventListener('scroll', () => {
      setScrollPosition(window.scrollY);
    })
  }, [])

  return (
    <div className={classes.root}>
      <ToggleButtonGroup
        classes={{ grouped: classes.grouped }}
        value={position}
        exclusive
        onChange={handleClick}
        style={{ backgroundColor: scrollPosition < window.innerHeight * 0.5 ? 'white' : 'transparent', display: 'flex', flexDirection: 'column' }}
      >
        <Tooltip title={language ? "主页" : 'Homepage'} placement="left">
          <ToggleButton value="home" style={{ color: scrollPosition < window.innerHeight * 0.5 ? 'black' : 'rgba(0, 0, 0, 0.38' }} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }} >
            <Home />
          </ToggleButton>
        </Tooltip>
        <Tooltip title={language ? "世界概况" : "World"} placement="left">
          <ToggleButton value="earth" style={{ color: scrollPosition > window.innerHeight * 0.5 && scrollPosition < window.innerHeight * 1.5 ? 'black' : 'rgba(0, 0, 0, 0.38' }} onClick={() => { window.scrollTo({ top: window.innerHeight, behavior: 'smooth' }) }} >
            <Public />
          </ToggleButton>
        </Tooltip>
        <Tooltip title={language ? "中国概况" : "China"} placement="left">
          <ToggleButton value="China" style={{ color: scrollPosition > window.innerHeight * 1.5 && scrollPosition < window.innerHeight * 2.5 ? 'black' : 'rgba(0, 0, 0, 0.38' }} onClick={() => { window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' }) }}>
            <VpnLock />
          </ToggleButton>
        </Tooltip>
        <Tooltip title={language ? "中国各省" : "Province"} placement="left">
          <ToggleButton value="province" style={{ color: scrollPosition > window.innerHeight * 2.5 && scrollPosition < window.innerHeight * 3.5 ? 'black' : 'rgba(0, 0, 0, 0.38' }} onClick={() => { window.scrollTo({ top: window.innerHeight * 3, behavior: 'smooth' }) }}>
            <People />
          </ToggleButton>
        </Tooltip>
        <Tooltip title={language ? "中国城市/区" : "City"} placement="left">
          <ToggleButton value="city" style={{ color: scrollPosition > window.innerHeight * 3.5 && scrollPosition < window.innerHeight * 4.5 ? 'black' : 'rgba(0, 0, 0, 0.38' }} onClick={() => { window.scrollTo({ top: window.innerHeight * 4, behavior: 'smooth' }) }}>
            <LocationCity />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
    </div>
  );
}
