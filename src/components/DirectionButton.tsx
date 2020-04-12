import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import LocationCity from '@material-ui/icons/LocationCity';
import VpnLock from '@material-ui/icons/VpnLock';
import People from '@material-ui/icons/People';
import Public from '@material-ui/icons/Public';
import SwapCalls from '@material-ui/icons/SwapCalls'
import Home from '@material-ui/icons/Home';
import SwapVert from '@material-ui/icons/SwapVert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      height: 380,
      transform: 'translateZ(0px)',
      flexGrow: 1,
      zIndex: 999
    }
  }),
);

const actions = [
  { icon: <LocationCity onClick={() => { window.scrollTo({ top: window.innerHeight * 4, behavior: 'smooth' }) }} />, name: 'City' },
  { icon: <People onClick={() => { window.scrollTo({ top: window.innerHeight * 3, behavior: 'smooth' }) }} />, name: 'Province' },
  { icon: <VpnLock onClick={() => { window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' }) }} />, name: 'China' },
  { icon: <Public onClick={() => { window.scrollTo({ top: window.innerHeight, behavior: 'smooth' }) }} />, name: 'International' },
  { icon: <Home onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }} />, name: 'Homepage' },
];

export default function DirectionButton(props:any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        icon={<SpeedDialIcon icon={<SwapVert/>} openIcon={<SwapCalls />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
