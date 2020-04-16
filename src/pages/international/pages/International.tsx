import React from 'react'
import { useState } from 'react'
import TwoD from '../componens/2D'
import ThreeD from '../componens/3D'
import SwithV from '../componens/SwitchV'
import { makeStyles } from '@material-ui/core/styles'
const useStyle = makeStyles({
    root: {
        height: '100vh',
        width: '100vw',
        position: 'relative'
    },
    switchV: {
        position: 'absolute',
        top: '2px',
        left: '10px'
    }
})
function International(props: any) {
    const { language, areaData } = props;
    const [display3D, setDisplay3D] = useState(false)
    const classes = useStyle();
    const { setDisplayText } = props
    return (
        <div className={classes.root}>
            <div className={classes.switchV}>
                <SwithV display3D={display3D} setDisplay3D={setDisplay3D} />
            </div>
            <div style={{display:display3D?'none':'block',height:'100vh',width:'100vw'}}>
                <TwoD areaData={areaData} language={language} setDisplayText={setDisplayText} />
            </div>
            <div style={{display:display3D?'block':'none',height:'100vh',width:'100vw'}}>
                <ThreeD areaData={areaData} language={language} setDisplayText={setDisplayText} />
            </div>
        </div>
    )
}

export default International
