import React from 'react'
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LanguageChoose from '../components/LanguageChoose'
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
            fontSize: '45px',
            color: 'white',
            textAlign: 'center',
            width: '70vw'
        }
    },
    hint: {
        textAlign: 'center',
        color: 'white',
        transition: '1s linear all',
        marginBottom: '3vh'
    }
})
function Homepage(props: any) {
    const { displayText, language, setLanguage } = props//用于判断是否开始显示文字动画
    const displayString = "这是一场前所未有的’战疫‘,也是一场全人类的挑战,没有任何人可以置身事外."
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
    useEffect(() => { }, [language])
    return (
        <div className={classes.root}>
            {
                displayText ?
                    <p>{language ? str : 'This is a unprecedented epidemic, a challenge for all mankind, nobody can escape.'}</p> :
                    <CircularProgress size={90} thickness={6} />
            }
            <div className={classes.hint} style={{ opacity: showHint ? 1 : 0 }}>{language ? '下滑了解更多' : 'Slide to learn more'}⬇️</div>
            <div className={classes.hint} style={{ opacity: showHint ? 1 : 0 }}>{language ? '右侧按钮可以快速换页' : 'The bottom right button can quickly change the page'}➡️</div>
            <LanguageChoose setLanguage={setLanguage} language={language} showHint={showHint} />
        </div>
    )
}

export default Homepage
