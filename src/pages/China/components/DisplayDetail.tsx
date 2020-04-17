import React from 'react'
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
// import areaData from '../../../assets/areaData';
const useStyle = makeStyles({
  root: {
    padding: '5px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    fontSize: '20px'
  },
  hint: {
    textAlign: 'center',
    fontSize: '30px'
  }
})
const DisplayDetail = (props: any) => {
  const { language, chinaData } = props;
  const classes = useStyle();
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
  const ChineseLabels = [
    '位置编号',
    '所属大洲名称',
    '所属大洲英文名',
    '国家名称',
    '国家英文名称',
    '省份名称',
    '省份简称',
    '省份英文名称',
    '今日确诊人数',
    '累计确诊人数',
    '疑似病例数',
    '治愈人数',
    '死亡人数',
    '所包含的城市',
    '评论',
    '更新时间'
  ]

  const EnglishLabels = [
    'Position number',
    'Name of continent',
    'English Name of continent',
    'Country name',
    'Country English name',
    'Province name',
    'Province short name',
    'Province English name',
    'Current confirmed count',
    'Confirmed count',
    'Suspected count',
    'Cured count',
    'Dead count',
    'Cities',
    'Comments',
    'Update time'
  ]

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
    //因为初次渲染没有chinaData没有定义
    if(chinaData)
      setTemp(chinaData.filter((value:any)=>value.provinceShortName === provinceName) as DataStructure[]);
  }, [provinceName,chinaData])
  useEffect(() => {
    console.log(temp)
  }, [temp])

  return (
    <div className={classes.root}>
      {temp ?
        temp[0] ? Object.keys(temp[0]).map((key: string, index: number) => {
          if (key !== 'cities' && key !== 'cityName' && key !== "locationId" && key !== 'comment' && key !== "updateTime") {
            return <span key={key}>
              <p>{(language?ChineseLabels[index]:EnglishLabels[index]) + ' : '}</p>
              <p>{temp ? (temp[0] as any)[key] : ''}</p>
            </span>
          }
          else {
            if (key === "updateTime")
              return <span key={key}>
                <p>{(language?ChineseLabels[index]:EnglishLabels[index]) + ' : '}</p>
                <p>{temp ? getTime((temp[0] as any)[key]) : ''}</p>
              </span>
                ;
            else
              return undefined
          }

        }
        )
          :
          // 选出来的如果是非法值
          <p className={classes.hint}>{language ? '点击各省可以查看该省的详细情况' : 'Click on the province to see the details of the province'}</p>
        :
        // 没有选
        <p>{language ? '点击各省可以查看该省的详细情况' : 'Click on the province to see the details of the province'}</p>
      }
    </div>
  )
}
export default DisplayDetail