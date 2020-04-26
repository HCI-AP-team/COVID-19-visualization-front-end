import React from 'react'
import { useState, useEffect } from 'react'
import TwoD from '../componens/2D'
import ThreeD from '../componens/3D'
import SwithV from '../componens/SwitchV'
import { makeStyles } from '@material-ui/core/styles'
import ScrollReveal from 'scrollreveal'

const useStyle = makeStyles({
    root: {
        height: '100vh',
        width: '100vw',
        position: 'relative',
        backgroundColor: '#748ba4'
    },
    switchV: {
        position: 'absolute',
        top: '2px',
        left: '10px',
        zIndex: 5,
        backgroundColor: '#748ba4'
    }
})
function International(props: any) {
    const { language, areaData, world2D } = props;
    const [display3D, setDisplay3D] = useState(false)
    const classes = useStyle();
    useEffect(() => {
        ScrollReveal().reveal(".international", {
            duration: 2000,
            distance: '0px',
            reset: true,
            rotate: {
                x: -100,
                z: -50
            }
        })
    }, [])
    return (
        <div className={classes.root + ' international'}>

            <div className={classes.switchV}>
                <SwithV display3D={display3D} setDisplay3D={setDisplay3D} />
            </div>
            <div style={{ display: display3D ? 'none' : 'block', height: '100vh', width: '100vw' }}>
                <TwoD world2D={world2D} areaData={areaData} language={language} />
            </div>
            <div style={{ display: display3D ? 'block' : 'none', height: '100vh', width: '100vw' }}>
                <ThreeD areaData={areaData} language={language} />
            </div>
        </div>
    )
}

export default International
