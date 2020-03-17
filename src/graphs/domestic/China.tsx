import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect, useRef } from 'react'
import red from '@material-ui/core/colors/red';
import raphael from 'raphael';
import chinaMap from '../../tempData/chinamapData'
import areaData from '../../tempData/areaData'

const useStyles = makeStyles({
  root: { height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  labels: { width: '10vw', marginTop: '20vh', marginRight: '5vw' , border:'solid 2px black', borderRadius:'5px', padding:'2px'},
  detail: { width: "30vw", height: '80vh', backgroundColor: 'white', border:"ridge 2px red", borderRadius:'5px', textAlign:'center', transition:'all 1s linear' },
})

interface dataForm {
  省份: string;
  value: string;
}
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
  const { color, value } = props;
  return (
    <div style={{ display: "flex", justifyContent: 'flex-start', alignItems: 'center' }}>
      <div style={{ backgroundColor: color, height: '15px', width: '30px', marginRight: '5px', fontSize: '5px' }}></div>
      <span>{value}</span>
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
  const createChinaMap = () => {

    //中国地图容器
    const map = raphael("map", chinaMap.dimension.width, chinaMap.dimension.height);

    //数据清洗
    let data: dataForm[] = areaData.results.map((el: any) => {
      if (el.countryName == '中国') {
        return { 省份: el.provinceShortName, value: el.curedCount }
      }
      else
        return;
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
        function (this: typeof tempPath) {
          setCurrentChoose(value.name+'的详情信息');
        }
      )

      //每个省份都添加事件来确认鼠标位置
      tempPath.mouseover(
        ()=>{
          tempPath.attr("fill","#00e5ff")
        }
      )

      //每个省份都添加事件来确认鼠标位置
      tempPath.mouseout(
        ()=>{
          tempPath.attr("fill",color)
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
        ()=>{
          tempPath.attr("fill","#00e5ff")
        }
      )

      //每个省份都添加事件来确认鼠标位置
      text.mouseout(
        ()=>{
          tempPath.attr("fill",color)
        }
      )
    })
  }

  const classes = useStyles()
  useEffect(() => {
    createChinaMap();
  },[])
  return (
    <div className={classes.root}>
      <div id="map" ></div>
      <div className={classes.labels}>
        <strong>确诊人数</strong>
        {labels.map((el: any, index: number) => <Label key={index} color={el.color} value={el.value} />)}
      </div>
      <div id="detail"  className={classes.detail}>{currentChoose?currentChoose:'点击各省可以查看该省的详细情况'}</div>
    </div>
  )
}

export default China
