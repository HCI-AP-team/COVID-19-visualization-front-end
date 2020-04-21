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
    const { displayText,language,setLanguage } = props//用于判断是否开始显示文字动画
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

    return (
        <div className={classes.root}>
            {
                displayText ?
                    <p>{str}</p> :
                    <CircularProgress size={90} thickness={6} />
            }
            {/* <ruby className={classes.hint} style={{ opacity: showHint ? 1 : 0 }}>下<rt>xia</rt>滑<rt>hua</rt>并<rt>bing</rt>了<rt>liao</rt>解<rt>jie</rt>更<rt>geng</rt>多<rt>duo</rt>⬇️</ruby> */}
            {/* <ruby className={classes.hint} style={{ opacity: showHint ? 1 : 0 }}>右<rt>you</rt>下<rt>xia</rt>角<rt>jiao</rt>按<rt>an</rt>钮<rt>niu</rt>可<rt>ke</rt>以<rt>yi</rt>快<rt>kuai</rt>速<rt>su</rt>换<rt>huan</rt>页<rt>ye</rt>➡️⬇️</ruby> */}
            <div className={classes.hint} style={{ opacity: showHint ? 1 : 0 }}>{language?'下滑了解更多':'Slide to learn more'}⬇️</div>
            <div className={classes.hint} style={{ opacity: showHint ? 1 : 0 }}>{language?'右侧按钮可以快速换页':'The bottom right button can quickly change the page'}➡️</div>
            <LanguageChoose setLanguage={setLanguage} language={language} showHint={showHint}/>
        </div>
    )
}

export default Homepage
