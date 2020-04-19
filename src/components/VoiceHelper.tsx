import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GetVoiceHelper from '../api/requestSpeechModel';
import Switch from '@material-ui/core/Switch';
const useStyle = makeStyles({
    root: {
        position: 'absolute',
        left: '10px',
        bottom: '10px',
        color: 'white',
        backgroundColor: 'pink'
    }
})
function VoiceHelper(props: any) {
    const classes = useStyle();
    const { language } = props
    const [on, setOn] = useState(false)
    const [finishLoad, setFinishLoad] = useState(false)
    const [transferRec, setTransferRec] = useState();//模型迁移器
    const handleChange = async () => {
        //因为setState是异步的,所以这里反着来
        if (!on) {
            await transferRec.listen((result: any) => {
                const { scores } = result;//结果分数
                const label = transferRec.wordLabels();//获得可识别列表
                const index = scores.indexOf(Math.max(...scores))//获得最大值索引
                const res = label[index] //这里存着结果,上翻页或者下翻页
                console.log(res)
                if (window.scrollY < window.innerHeight) {
                    if (res === "down") {
                        window.scrollTo({ top: window.innerHeight * 1, behavior: 'smooth' })
                    }
                    if (res === "up") {
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                }
                if (window.scrollY >= window.innerHeight && window.scrollY < window.innerHeight * 2) {
                    if (res === "down") {
                        window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' })
                    }
                    if (res === "up") {
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                }
                if (window.scrollY >= window.innerHeight * 2 && window.scrollY < window.innerHeight * 3) {
                    if (res === "down") {
                        window.scrollTo({ top: window.innerHeight * 3, behavior: 'smooth' })
                    }
                    if (res === "up") {
                        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
                    }
                }
                if (window.scrollY >= window.innerHeight * 3 && window.scrollY < window.innerHeight * 4) {
                    if (res === "down") {
                        window.scrollTo({ top: window.innerHeight * 4, behavior: 'smooth' })
                    }
                    if (res === "up") {
                        window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' })
                    }
                }
                if(window.scrollY >= window.innerHeight * 4 && window.scrollY < window.innerHeight * 5) {
                    if (res === "down") {
                        window.scrollTo({ top: window.innerHeight * 5, behavior: 'smooth' })
                    }
                    if (res === "up") {
                        window.scrollTo({ top: window.innerHeight * 3, behavior: 'smooth' })
                    }
                }
                if(window.scrollY === window.innerHeight * 5) {
                    if (res === "down") {
                        window.scrollTo({ top: window.innerHeight * 5, behavior: 'smooth' })
                    }
                    if (res === "up") {
                        window.scrollTo({ top: window.innerHeight * 4, behavior: 'smooth' })
                    }
                }

            }, {
                overlapFactor: 0.01,
                probabilityTHreshold: 0.80
            })
        }
        else {
            console.log(transferRec)
            if (transferRec)
                transferRec.stopListening();
        }
        setOn(!on);//异步更改开关状态
    }
    useEffect(() => {
        GetVoiceHelper(setTransferRec);
        setFinishLoad(true);
    }, [])
    useEffect(() => {
    }, [transferRec, finishLoad]);
    return (
        <FormControlLabel
            className={classes.root}
            disabled={!finishLoad}
            control={<Switch checked={on} onChange={handleChange} name="voiceHelper" />}
            label={language ? "语音翻页" : "Change page by voice"}
        />
    );
}

export default VoiceHelper;
