import React from 'react'
import { useEffect } from 'react'
import red from '@material-ui/core/colors/red';
import raphael from 'raphael';
// import chinaMap from '../../../assets/chinamapData';
// import areaData from '../../../assets/areaData';
const getColor = (value: number): string => {
  if (value < 10) {
    return red[50]
  }
  else {
    if (value < 50) {
      return red[200]
    }
    else {
      if (value < 100) {
        return red[400]
      }
      else {
        if (value < 200) {
          return red[600]
        }
        else {
          return red[900]
        }
      }
    }

  }
}
const CreateChinaMap = (props: any) => {
  const { className, handleChange, setCurrentChoose, language, chinaData, chinaMapData } = props;
  // const { className, handleChange, setCurrentChoose, language } = props;
  let map: any;
  const createChinaMap = () => {
    //中国地图容器
    map = raphael("map", chinaMapData.dimension.width, chinaMapData.dimension.height);

    //数据清洗
    // let data: dataForm[] = areaData.results.map((el: any): {} | undefined => {
    //   if (el.countryName === '中国'&& el.provinceShortName !== "中国") {
    //     return { 省份: el.provinceShortName, province: el.provinceEnglishName, value: el.confirmedCount }
    //   }
    //   else
    //     return undefined;
    // }) as dataForm[];
    // data = data.filter((el: any) => el !== undefined)
    // data = data.sort((a: any, b: any) => - b.value + a.value)
    // //console.log(chinaData)
    let data = chinaData.map((el: any) => {
      return { 省份: el.provinceShortName, province: el.provinceEnglishName, value: el.currentConfirmedCount }
    })
    chinaMapData.paths.forEach((value: any) => {

      //获取当前绘制的省份数据
      let respondValue = data.filter((el: any) => el.省份 === value.name)
      // //console.log(respondValue)
      //调色
      let color: string = getColor(parseInt(respondValue[0].value));

      //绘制省份图形的路径参数
      let tempPathVal = value.cmd.map((val: any) => {
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
          tempPath.attr("fill", "#fdff92")
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
        language ? respondValue[0].省份 : respondValue[0].province
      ).attr("cursor", "pointer");

      //每个省份都添加事件来确认鼠标位置
      text.mouseover(
        () => {
          tempPath.attr("fill", "#fdff92")
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
    // //console.log(chinaData)
    if (chinaData && chinaMapData)
      createChinaMap();
    //清除地图,防止显示多个
    return () => {
      if (map)
        map.remove()
    }
  }, [language, chinaData, chinaMapData])
  return (
    <div id="map" className={className}>
    </div>
  )

}
export default CreateChinaMap