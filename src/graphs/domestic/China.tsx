import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react'
import red from '@material-ui/core/colors/red';
import Slide from '@material-ui/core/Slide';
import raphael from 'raphael';
import chinaMap from '../../tempData/chinamapData'
import areaData from '../../tempData/areaData'
import { Paper } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#b3e5fc'
  },
  labels: {
    marginTop: '20vh',
    marginRight: '5vw',
    border: 'solid 2px black',
    borderRadius: '5px',
    padding: '2px',
    backgroundColor:'#e1f5fe'
  },
  detail: {
    width: "30vw",
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '4px',
    transition: 'all 1s linear',
    '& span': {
      display: 'flex',
      padding: '2px',
      justifyContent: 'space-between',
      height: '5vh',
      alignItems: 'center'
    }
  }
})

const useLabelStyle = makeStyles({
  root: {
    display: "flex",
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  label: {
    height: '15px',
    width: '30px',
    marginRight: '5px',
    fontSize: '5px'
  }
})

const getColor = (value: number): string => {
  if (value < 50) {
    return red[50]
  }
  else {
    if (value < 100) {
      return red[100]
    }
    else {
      if (value < 500) {
        return red[200]
      }
      else {
        if (value < 1000) {
          return red[400]
        }
        else {
          if (value < 2000) {
            return red[600]
          }
          else {
            return red[900]
          }
        }
      }
    }
  }
}



function Label(props: any) {
  const classes = useLabelStyle();
  const { color, value } = props;
  return (
    <div className={classes.root}>
      <div className={classes.label} style={{ backgroundColor: color }}></div>
      <span>{value}</span>
    </div>
  )
}

const DisplayDetail = (props: any) => {
  interface DataStructure {
    'locationId': number
    'continentName': string
    'continentEnglishName': string
    'countryName': string
    'countryEnglishName': string
    'provinceName': string
    'provinceShortName': string
    'provinceEnglishName': string
    'currentConfirmedCount': number
    'confirmedCount': number
    'suspectedCount': number
    'curedCount': number
    'deadCount': number
    'cities': object[]
    'comment': string
    'updateTime': number
  }
  const provinceName = props.currentChoose;

  //将时间戳转化成当前时间
  function getTime(time: any) {
    let date = new Date(time);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
  }

  //过滤出来某个省的数据
  const [temp, setTemp]: [DataStructure[] | undefined, Function] = useState();
  useEffect(() => {
    setTemp(areaData.results.filter((value) => value.countryEnglishName === "China" && value.provinceShortName === provinceName) as DataStructure[]);
  }, [provinceName])
  useEffect(() => {
  }, [temp])

  return (
    <div style={{ padding: '5px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', fontSize: '20px' }}>
      {temp ?
        temp[0] ? Object.keys(temp[0]).map((key) => {
          if (key !== 'cities' && key !== "locationId" && key !== 'comment' && key !== "updateTime") {
            return <span key={key}>
              <p>{key + ' : '}</p>
              <p>{temp ? (temp[0] as any)[key] : ''}</p>
            </span>
          }
          else {
            if (key === "updateTime")
              return <span key={key}>
                <p>{key + ' : '}</p>
                <p>{temp ? getTime((temp[0] as any)[key]) : ''}</p>
              </span>
                ;
            else
              return undefined
          }

        }
        )
          :
          <p style={{ textAlign: 'center', fontSize: '30px' }}>点击各省可以查看该省的详细情况</p>
        :
        <p>点击各省可以查看该省的详细情况</p>
      }
    </div>
  )
}
const CreateChinaMap = (props: any) => {
  const { handleChange, setCurrentChoose } = props;
  interface dataForm {
    省份: string;
    value: string;
  }
  const createChinaMap = () => {

    //中国地图容器
    const map = raphael("map", chinaMap.dimension.width, chinaMap.dimension.height);

    //数据清洗
    let data: dataForm[] = areaData.results.map((el: any): {} | undefined => {
      if (el.countryName === '中国') {
        return { 省份: el.provinceShortName, value: el.curedCount }
      }
      else
        return undefined;
    }) as dataForm[];
    data = data.filter((el: any) => el !== undefined)
    data = data.sort((a: any, b: any) => - b.value + a.value)
    console.log(data)

    chinaMap.paths.forEach((value) => {

      //获取当前绘制的省份数据
      let respondValue: dataForm[] = data.filter(el => el.省份 === value.name)

      //调色
      let color: string = getColor(parseInt(respondValue[0].value));

      //绘制省份图形的路径参数
      let tempPathVal = value.cmd.map((val) => {
        return val.method + ' ' + val.param.join(',');
      }).join(' ')

      //根据不同的路径分别画出一个个省份
      let tempPath = map.path(tempPathVal).attr({
        "fill": color,
        "cursor": "pointer"
      });

      //每个省份图形的点击事件
      tempPath.click(
        () => {
          handleChange();
          setTimeout(() => {
            setCurrentChoose(value.name);
            handleChange();
          }, 200)
        }
      )

      //每个省份都添加事件来确认鼠标位置
      tempPath.mouseover(
        () => {
          tempPath.attr("fill", "#ffff00")
        }
      )

      //每个省份都添加事件来确认鼠标位置
      tempPath.mouseout(
        () => {
          tempPath.attr("fill", color)
        }
      )


      //得到当前绘制的省份的包围框
      let box = tempPath.getBBox();

      //写省份名称,有的有偏移,有的没有偏移
      let text = map.text(
        (box.x + (box.width / 2) + (value.offset ? value.offset.x : 0)),
        (box.y + (box.height / 2) + (value.offset ? value.offset.y : 0)),
        value.name
      ).attr("cursor", "pointer");

      //每个省份都添加事件来确认鼠标位置
      text.mouseover(
        () => {
          tempPath.attr("fill", "#ffff00")
        }
      )

      //每个省份都添加事件来确认鼠标位置
      text.mouseout(
        () => {
          tempPath.attr("fill", color)
        }
      )

      //每个省份图形的点击事件
      text.click(
        () => {
          handleChange();
          setTimeout(() => {
            setCurrentChoose(value.name);
            handleChange();
          }, 200)
        }
      )
    })
  }
  useEffect(() => {
    createChinaMap();
  }, [])
  return (
    <div id="map">
    </div>
  )

}
function China() {
  const [currentChoose, setCurrentChoose] = useState('');
  const labels: object[] = [
    {
      color: red[50],
      value: '0-49'
    },
    {
      color: red[100],
      value: '50-99'
    },
    {
      color: red[200],
      value: '100-499'
    },
    {
      color: red[400],
      value: '500-999'
    },
    {
      color: red[600],
      value: '1000-2000'
    },
    {
      color: red[900],
      value: '2000+'
    }
  ]
  const classes = useStyles()
  const [checked, setChecked] = useState(true);

  return (
    <div className={classes.root}>
      <CreateChinaMap handleChange={() => setChecked(prev => !prev)} setCurrentChoose={setCurrentChoose} />
      <div className={classes.labels}>
        <strong>确诊人数</strong>
        {labels.map((el: any, index: number) => <Label key={index} color={el.color} value={el.value} />)}
      </div>
      <div id="detail" className={classes.detail}>
        <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
          <Paper elevation={5}>
            <DisplayDetail currentChoose={currentChoose} />
          </Paper>
        </Slide>
      </div>
    </div>
  )
}

export default China
