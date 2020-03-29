import React from 'react'
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles({
    root: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        '& p': {
            fontSize: '50px',
            color: 'white',
            textAlign: 'center',
            width: '70vw'
        }
    },
    hint: {
        border: '2px solid #304ffe',
        borderRadius: '5px',
        padding: '15px',
        textAlign: 'center',
        color: 'white',
        transition: '1s linear all',
        fontWeight: 'bold'
    }
})
function Homepage(props: any) {
    const { displayText } = props//用于判断是否开始显示文字动画
    const displayString = "Novel coronavirus pneumonia is a novel coronavirus pneumonia visualization project. No one can avoid this epidemic. The epidemic in China has been gradually improved, and the epidemic is spreading abroad. We hope that this project will help people understand the epidemic situation more profoundly."
    const [str, setStr] = useState('')
    const [showHint, setShowHint] = useState(false)
    const classes = useStyles();
    useEffect(() => {
        let i = 1;
        let disStr = () => {
            setStr(displayString.substr(0, i++))//逐步显示文字
            if (i !== displayString.length + 1) {
                requestAnimationFrame(disStr);
            }
            else {
                setShowHint(true);//显示提示框
            }
        };
        if (displayText)//如果全部加载完成,开始显示文字
            disStr();
    }, [displayText])
    return (
        <div className={classes.root}>
            {
                displayText ?
                    <p>{str}</p> :
                    <CircularProgress size={90} thickness={6}/>
            }
            <div className={classes.hint} style={{ opacity: showHint ? 1 : 0 }}>Glide and learn more</div>
        </div>
    )
}

export default Homepage
