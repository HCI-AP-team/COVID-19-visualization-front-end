import React from 'react'
import { useState,useEffect } from 'react'
import areaData from '../../../assets/areaData';
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
  export default DisplayDetail