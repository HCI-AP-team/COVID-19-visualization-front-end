import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react'
import red from '@material-ui/core/colors/red';
import raphael from 'raphael';
import chinaMap from '../../tempData/chinamapData'

const useStyles = makeStyles({
})
function China() {
  useEffect(() => {
    //绘制中国地图
    //TODO 根据病情填充颜色
    const map = raphael("map",chinaMap.dimension.width,chinaMap.dimension.height);
    chinaMap.paths.forEach((value) => {

      //根据不同的路径分别画出一个个省份
      let tempPath = map.path(value.cmd.map((val)=>{
        return val.method+' '+val.param.join(',');
      }).join(' '))

      //得到当前绘制的省份的包围框
      let box = tempPath.getBBox();
      
      //写省份名称,有的有偏移,有的没有偏移
      map.text(
        (box.x + (box.width / 2) +  (value.offset?value.offset.x:0)),
        (box.y + (box.height / 2) + (value.offset?value.offset.y:0)),
        value.name
      );
      
    })
  }, )
  return (
    <div id="map" style={{ height: '100vh', width: '100vw',display:'flex',justifyContent:'center',alignItems:'center' }}>
    </div>
  )
}

export default China
