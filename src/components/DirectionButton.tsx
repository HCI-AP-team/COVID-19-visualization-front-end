import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import LocationCity from '@material-ui/icons/LocationCity';
import VpnLock from '@material-ui/icons/VpnLock';
import People from '@material-ui/icons/People';
import Public from '@material-ui/icons/Public';
import Home from '@material-ui/icons/Home';
import FiberNew from '@material-ui/icons/FiberNew'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';


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

  //下面几个状态保存的是是否浏览过该页面
  const [worldF, setWorldF] = useState(false);
  const [chinaF, setChinaF] = useState(false)
  const [provinceF, setProvinceF] = useState(false);
  const [cityF, setCityF] = useState(false);
  const [newsF, setNewsF] = useState(false);
  const [position, setPosition] = useState<string | null>('home');
  const handleClick = (event: React.MouseEvent<HTMLElement>, position: string | null) => {
    setPosition(position);
  };
  const [scrollPosition, setScrollPosition] = useState(0)
  useEffect(() => {
    //帮助用户确定滑到哪里了
    window.addEventListener('scroll', () => {
      setScrollPosition(window.scrollY);
      if (window.scrollY > window.innerHeight * 0.5 && window.scrollY < window.innerHeight * 1.5)
        setWorldF(true)
      if (window.scrollY > window.innerHeight * 1.5 && window.scrollY < window.innerHeight * 2.5)
        setChinaF(true)
      if (window.scrollY > window.innerHeight * 2.5 && window.scrollY < window.innerHeight * 3.5)
        setProvinceF(true)
      if (window.scrollY > window.innerHeight * 3.5 && window.scrollY < window.innerHeight * 4.5)
        setCityF(true)
      if (window.scrollY > window.innerHeight * 4.5 && window.scrollY < window.innerHeight * 5.5)
        setNewsF(true)
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
        <Tooltip enterDelay={1} title={language ? "主页" : 'Homepage'} placement="left">
          <ToggleButton value="home" style={{ color: scrollPosition < window.innerHeight * 0.5 ? 'black' : 'rgba(0, 0, 0, 0.38' }} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }} >
            <Home />
          </ToggleButton>
        </Tooltip>
        <Tooltip enterDelay={1} title={language ? "世界概况" : "World"} placement="left">
          <ToggleButton value="earth" style={{ color: scrollPosition > window.innerHeight * 0.5 && scrollPosition < window.innerHeight * 1.5 ? 'black' : 'rgba(0, 0, 0, 0.38' }} onClick={() => { window.scrollTo({ top: window.innerHeight, behavior: 'smooth' }) }} >
            <Badge color="secondary" invisible={worldF} badgeContent=" " variant="dot">
              <Public />
            </Badge>
          </ToggleButton>
        </Tooltip>
        <Tooltip enterDelay={1} title={language ? "中国概况" : "China"} placement="left">
          <ToggleButton value="China" style={{ color: scrollPosition > window.innerHeight * 1.5 && scrollPosition < window.innerHeight * 2.5 ? 'black' : 'rgba(0, 0, 0, 0.38' }} onClick={() => { window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' }) }}>
            <Badge color="secondary" invisible={chinaF} badgeContent=" " variant="dot">
              <VpnLock />
            </Badge>
          </ToggleButton>
        </Tooltip>
        <Tooltip enterDelay={1} title={language ? "中国各省" : "Province"} placement="left">
          <ToggleButton value="province" style={{ color: scrollPosition > window.innerHeight * 2.5 && scrollPosition < window.innerHeight * 3.5 ? 'black' : 'rgba(0, 0, 0, 0.38' }} onClick={() => { window.scrollTo({ top: window.innerHeight * 3, behavior: 'smooth' }) }}>
            <Badge color="secondary" invisible={provinceF} badgeContent=" " variant="dot">
              <People />
            </Badge>
          </ToggleButton>
        </Tooltip>
        <Tooltip enterDelay={1} title={language ? "中国城市/区" : "City"} placement="left">
          <ToggleButton value="city" style={{ color: scrollPosition > window.innerHeight * 3.5 && scrollPosition < window.innerHeight * 4.5 ? 'black' : 'rgba(0, 0, 0, 0.38' }} onClick={() => { window.scrollTo({ top: window.innerHeight * 4, behavior: 'smooth' }) }}>
            <Badge color="secondary" invisible={cityF} badgeContent=" " variant="dot">
              <LocationCity />
            </Badge>
          </ToggleButton>
        </Tooltip>
        <Tooltip enterDelay={1} title={language ? "新闻" : "News"} placement="left">
          <ToggleButton value="News" style={{ color: scrollPosition > window.innerHeight * 4.5 && scrollPosition < window.innerHeight * 5.5 ? 'black' : 'rgba(0, 0, 0, 0.38' }} onClick={() => { window.scrollTo({ top: window.innerHeight * 5, behavior: 'smooth' }) }}>
            <Badge color="secondary" invisible={newsF} badgeContent=" " variant="dot">
              <FiberNew />
            </Badge>
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
    </div>
  );
}
