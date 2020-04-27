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
import requestAreaData from './api/requestAreaData'
import requestWorld2DData from './api/requestWorld2DData'
import requestNews from './api/requestNews'
import requestWorld3DData from './api/requestWorld3DData'
import requestWorld3DMapData from './api/requestWorld3DMapData'
import requestChinaMapData from './api/requestChinaMapData'
// import VoiceHelper from './components/VoiceHelper'
// //异步加载
const City = React.lazy(() => import('./pages/city/pages/City'));

const useStyles = makeStyles(theme => ({
  root: {
    transition: 'all 1s linear',
  },
  gitBut: {
    position: 'absolute',
    top: '10px',
    left: '10px'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 2,
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
  const [displayText, setDisplayText] = useState(false)//设定首页的逐个文字显示
  const [areaData, setAreaData] = useState()//世界疫情数据
  const [chinaData, setChinaData] = useState()//疫情数据
  const [world2D, setWorld2D] = useState()//2D世界地图数据
  const [newsData, setNewsData] = useState([])//新闻数据
  const [worldData, setWorldData] = useState()//3D世界地图
  const [tsv2json, setTsv2json] = useState()//3D世界国家数据
  const [chinaMapData, setChinaMapData] = useState()
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
      data = data.results.filter((el: any): {} | undefined =>
        el.countryName === '中国' && el.provinceShortName !== "中国"
      );
      data = data.filter((el: any) => el !== undefined)
      setChinaData(data);

      data = await requestWorld2DData();//2D世界数据
      setWorld2D(data);

      data = await requestWorld3DData();
      setWorldData(data);

      data = await requestWorld3DMapData();
      setTsv2json(data.results);

      data = await requestChinaMapData();
      setChinaMapData(data)

      data = await requestNews()//news信息
      setNewsData(data.results)

      setTimeout(() => setDisplayText(true), 0)//将文字是否显示放在宏任务队列末尾
    }
    fetchData();
  }, [])
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
      {/* <VoiceHelper language={language} /> */}
      <ErrorBound>
        <Homepage setLanguage={setLanguage} language={language} displayText={displayText} />
      </ErrorBound>
      <ErrorBound>
        <International language={language} tsv2json={tsv2json} worldData={worldData} world2D={world2D} areaData={areaData} />
      </ErrorBound>
      <ErrorBound>
        <China chinaMapData={chinaMapData} language={language} chinaData={chinaData} />
      </ErrorBound>
      <ErrorBound>
        <Province language={language} chinaData={chinaData} />
      </ErrorBound>
      <ErrorBound>
        <Suspense fallback={<Loading />}>
          <City language={language} chinaData={chinaData} />
        </Suspense>
      </ErrorBound>
      <ErrorBound>
          <JourNalism newsData={newsData} language={language} />
      </ErrorBound>
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
