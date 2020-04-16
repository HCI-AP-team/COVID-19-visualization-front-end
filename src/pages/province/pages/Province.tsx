import React from 'react'
import { useState, useEffect } from 'react'
import ScrollReveal from 'scrollreveal'
import Histogram from '../components/Histogram';
// import areaData from '../../../assets/areaData'
import SelectBox from '../components/SelectBox'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff9c4'
    },
    chooseInput: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}));
function Province(props: any) {
    // 用于选择对比展示各省的哪一个属性
    const { language, areaData } = props;
    const [displayLabel, setDisplayLabel] = useState('confirmedCount');
    const classes = useStyles();
    useEffect(() => {

        ScrollReveal().reveal(".ProvinceMap", {
            duration: 2000,
            rotate: {
                x: -50,
                z: -20
            },
            reset: true
        })//入场动画
    }, [language, areaData, displayLabel])
    return (
        <div className={classes.root}>
            <div className={classes.chooseInput + ' ProvinceMap'}>
                <strong>{language ? '可以对比不同的值' : 'You can compare different values'}</strong>
                <SelectBox displayLabel={displayLabel} language={language} setDisplayLabel={setDisplayLabel} />
            </div>
            <div className={'ProvinceMap'}>
                <Histogram displayLabel={displayLabel} language={language} areaData={areaData} />
            </div>
        </div>
    )
}

export default Province
