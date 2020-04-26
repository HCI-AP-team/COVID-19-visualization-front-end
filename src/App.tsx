import React from 'react';
import { useState, useRef, useEffect, Suspense } from 'react'
import { Button, Backdrop } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import GitHubButton from 'react-github-btn'

import Memberpage from './pages/Memberpage'
import Homepage from './pages/Homepage'
import International from './pages/international/pages/International'
import China from './pages/China/pages/China'
import Province from './pages/province/pages/Province'
import JourNalism from './pages/News/Journalism'

import DirectionButton from './components/DirectionButton'
import ErrorBound from './components/ErrorBound'
import Loading from './components/Loading'
import VoiceHelper from './components/VoiceHelper'

import requestAreaData from './api/requestAreaData'
import requestWorld2DData from './api/requestWorld2DData'
import requestNews from './api/requestNews'



// //异步加载
const City = React.lazy(() => import('./pages/city/pages/City'));
//const Journalism = React.lazy(() => import('./pages/News/Journalism'));

const useStyles = makeStyles(theme => ({
      root: {
        transition: 'all 1s linear'
      },
      gitBut: {
        position: 'absolute',
        top: '10px',
        left: '10px'
      },
      backdrop: {
        zIndex: theme.zIndex.drawer + 2,
        color: '#748ba4',
      },
      bdButton: {
        position: 'fixed',
        right: '10px',
        top: '10px'
      }
}));

var pls = localStorage.getItem('language') == "2" ? false : true
function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);//关于我们  这一部分的开关状态
  const [language, setLanguage] = useState(Boolean(pls));//设定显示的语言,true为中文,false 为英语
  console.log(language)
  const [displayText, setDisplayText] = useState(false)//设定首页的逐个文字显示
  const [areaData, setAreaData] = useState()//世界疫情数据
  const [chinaData, setChinaData] = useState()//疫情数据
  const [world2D, setWorld2D] = useState()//2D世界地图数据
  const [newsData, setNewsData] = useState([])//新闻数据
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const fetchData = async () => {
      let data = await requestAreaData()//请求疫情数据
      setAreaData(data)

      let tempChinaData = data.results.filter((el: any): {} | undefined => el.countryName === '中国' && el.provinceShortName !== "中国");
      tempChinaData = tempChinaData.filter((el: any) => el !== undefined)
      setChinaData(tempChinaData);

      let dataWorld2D = await requestWorld2DData();//2D世界数据
      setWorld2D(dataWorld2D)

      setTimeout(() => setDisplayText(true), 0)//将文字是否显示放在宏任务队列末尾

      let news = await requestNews()//news信息
      setNewsData(news.results)
    }
    fetchData();
  }, [])
  console.log(language)
  return (
    <div className={classes.root}>
      <div className={classes.gitBut}>
        <GitHubButton
          href="https://github.com/HCI-AP-team/AP-coursework-front-end"
          data-color-scheme="no-preference: light; light: light; dark: dark;"
          data-size="large"
          data-show-count={true}
          aria-label="Star HCI-AP-team/AP-coursework-front-end on GitHub">
          Star
        </GitHubButton>
      </div>
      <DirectionButton language={language} />
      <VoiceHelper language={language} />
      <ErrorBound>
        <Homepage setLanguage={setLanguage} language={language} displayText={displayText} />
      </ErrorBound>

      <International language={language} world2D={world2D} areaData={areaData} />
      <China language={language} chinaData={chinaData} />
      <Province language={language} chinaData={chinaData} />
      <Suspense fallback={<Loading />}>
        <City language={language} chinaData={chinaData} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <JourNalism language={language} newsData={newsData} />
      </Suspense>





      <Button variant="outlined" color="primary" onClick={handleToggle} className={classes.bdButton}>
        {language ? '关于我们' : 'about us'}
      </Button>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <Memberpage language={language} />
      </Backdrop>
    </div>

  );
}

export default App;
