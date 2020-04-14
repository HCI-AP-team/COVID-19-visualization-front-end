import React from 'react';
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
      bottom: '2px',
      right: theme.spacing(2),
      flexGrow: 1,
      zIndex: 999
    }
  }),
);


export default function DirectionButton(props: any) {
  const { language } = props;
  const classes = useStyles();
  const [position, setPosition] = React.useState<string | null>('home');
  const handleClick = (event: React.MouseEvent<HTMLElement>, position: string | null) => {
    setPosition(position);
  };
  return (
    <div className={classes.root}>
      <ToggleButtonGroup
        value={position}
        exclusive
        onChange={handleClick}
        style={{backgroundColor:position==='home'?'white':'transparent'}}
      >
        <Tooltip title={language?"主页":'Homepage'} placement="top">
          <ToggleButton value="home" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }} >
            <Home />
          </ToggleButton>
        </Tooltip>
        <Tooltip title={language?"世界概况":"World"} placement="top">
          <ToggleButton value="earth" onClick={() => { window.scrollTo({ top: window.innerHeight, behavior: 'smooth' }) }} >
            <Public />
          </ToggleButton>
        </Tooltip>
        <Tooltip title={language?"中国概况":"China"} placement="top">
          <ToggleButton value="China" onClick={() => { window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' }) }}>
            <VpnLock />
          </ToggleButton>
        </Tooltip>
        <Tooltip title={language?"中国各省":"Province"} placement="top">
          <ToggleButton value="province" onClick={() => { window.scrollTo({ top: window.innerHeight * 3, behavior: 'smooth' }) }}>
            <People />
          </ToggleButton>
        </Tooltip>
        <Tooltip title={language?"中国城市/区":"City"} placement="top">
          <ToggleButton value="city" onClick={() => { window.scrollTo({ top: window.innerHeight * 4, behavior: 'smooth' }) }}>
            <LocationCity />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
    </div>
  );
}
