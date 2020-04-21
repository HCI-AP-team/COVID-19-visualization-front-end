import React from 'react'
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
// import areaData from '../../../assets/areaData';
const useStyle = makeStyles({
    root: {
        padding: '5px',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'space-around',
        justifyContent: 'space-around',
        fontSize: '16px',
        overflow: 'scroll',
        backgroundColor: 'white',
        '& p':{
            margin:0
        }
    }
})
const DetailCard = (props: any) => {
    const { language, countryData } = props;
    const classes = useStyle();

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


    useEffect(() => {
        //console.log(countryData)
    }, [countryData])

    return (
        <div className={classes.root}>
            {countryData ? Object.keys(countryData).map((el: any) => {
                switch (el) {
                    case "countryName":
                        return language ? <p key={el}>{`国家名称: ${countryData[el]}`}</p> : ''
                    case "countryEnglishName":
                        return language ? '' : <p key={el}>{`country name: ${countryData[el]}`}</p>
                    case "currentConfirmedCount":
                        return <p key={el}>{`${language ? '当前确诊数: ' : 'current confirmed count: '}${countryData[el]}`}</p>
                    case "confirmedCount":
                        return <p key={el}>{`${language ? '累计确诊数: ' : 'confirmed count: '}${countryData[el]}`}</p>
                    case "suspectedCount":
                        return <p key={el}>{`${language ? '疑似数: ' : 'suspected count: '}${countryData[el]}`}</p>
                    case "curedCount":
                        return <p key={el}>{`${language ? '治愈数: ' : 'cured count: '}${countryData[el]}`}</p>
                    case "deadCount":
                        return <p key={el}>{`${language ? '死亡数: ' : 'dead count: '}${countryData[el]}`}</p>
                    case "updateTime":
                        return <p key={el}>{`${language ? '更新时间: ' : 'update time: '}${getTime(countryData[el])}`}</p>
                    default:
                        return ''
                }
            }) : <p style={{textAlign:'center'}}>{language?'数据缺失':'data loss'}</p>}
        </div>
    )
}
export default DetailCard