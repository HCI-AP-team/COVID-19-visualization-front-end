import React from 'react';
import { useState, useRef, useEffect, Suspense } from 'react'
import { Button, Backdrop } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import GitHubButton from 'react-github-btn'
import Memberpage from './pages/Memberpage'
import Homepage from './pages/Homepage'
import DirectionButton from './components/DirectionButton'
import International from './pages/international/pages/International'
import China from './pages/China/pages/China'
import Province from './pages/province/pages/Province'
// import City from './pages/city/pages/City'
import Loading from './components/Loading'
import requestAreaData from './api/requestAreaData'
import * as speechcommand from '@tensorflow-models/speech-commands'
// //异步加载
// const International = React.lazy(() => import('./pages/International'));
// const China = React.lazy(() => import('./pages/China/pages/China'));
// const Province = React.lazy(() => import('./pages/Province'));
const City = React.lazy(() => import('./pages/city/pages/City'));

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
    color: '#fff',
  },
  bdButton: {
    position: 'fixed',
    right: '10px',
    top: '10px'
  }
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);//关于我们  这一部分的开关状态
  const [language, setLanguage] = useState(true);//设定显示的语言,true为中文,false 为英语
  const [displayText, setDisplayText] = useState(false)//设定首页的逐个文字显示
  const [areaData, setAreaData] = useState()//疫情数据
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  useEffect(() => {
    let b = async () => {
      let data = await requestAreaData()
      setAreaData(data)
    }
    let MODEL_PATH = 'http://127.0.0.1:9999/speech'
    let c = async () => {
      const rec = speechcommand.create(
        'BROWSER_FFT',//浏览器自带的傅立叶变换
        undefined,
        MODEL_PATH + '/model.json',
        MODEL_PATH + '/metadata.json'
      )//创建识别器

      await rec.ensureModelLoaded();//确保模型加载完成

      let labels = rec.wordLabels()//获得可识别的字符
      labels = labels.slice(2)



      rec.listen(result => {
        const scores  = result.scores as unknown as number[];
        
        let index = scores.indexOf(Math.max(...scores))
        console.log(labels[index])
        return new Promise(()=>{});
      },
        {
          overlapFactor: 0.2,//覆盖率
          probabilityThreshold: 0.75//相似度
        })
    }
    c();
    b();
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
      <Homepage setLanguage={setLanguage} language={language} displayText={displayText} />


      <International language={language} areaData={areaData} setDisplayText={setDisplayText} />
      <China language={language} areaData={areaData} />
      <Province language={language} areaData={areaData}/>
      <Suspense fallback={<Loading />}>
        <City language={language} areaData={areaData} />
      </Suspense>


      <Button variant="outlined" color="primary" onClick={handleToggle} className={classes.bdButton}>
        {language ? '关于我们' : 'about us'}
      </Button>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <Memberpage />
      </Backdrop>
    </div>

  );
}

export default App;
