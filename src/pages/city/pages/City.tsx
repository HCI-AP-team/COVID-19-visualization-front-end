import React from 'react'
import { useState, useEffect } from 'react'
import ScrollReveal from 'scrollreveal'
import { makeStyles } from '@material-ui/core/styles';
import areaData from '../../../assets/areaData'
import ChooseCity from '../components/ChooseCity'
import CityCard from '../components/CityCard'
import classes from '*.module.css';
const useStyles = makeStyles({
    root: {
        width: '100vw',
        height: '100vh',
        position: 'relative',
        backgroundColor: '#fff9c4'
    },
    cityCards: {
        position: 'absolute',
        right: '10vw',
        top: '30vh'
    }
})
function City() {
    const classes = useStyles();
    const [cityData, setCityData] = useState()
    //加载城市数据
    useEffect(() => {


        //设置两个零时变量,用于将省份信息添加到每一个市中
        let tempChinaData = areaData.results
            .filter((value) => value.countryEnglishName === "China")
        let tempCityData = areaData.results
            .filter((value) => value.countryEnglishName === "China")
            .map(el => el.cities?.length ? el.cities : [el])//长度为0就是特殊地区如香港

        //将添加省份信息后的城市数据放在状态中
        setCityData(tempCityData
            .map((value: any, index: number) => value
                .map((val: any) => {
                    val.provinceName = tempChinaData[index].provinceName;
                    //给港澳台等地区设定一个城市名称
                    if (!val.cityName) {
                        val.cityName = val.provinceName
                    }
                    return val
                }))

        )

        ScrollReveal().reveal(".CityMap",
            {
                duration: 2000,
                distance: '0px',
                opacity: 0,
                reset: true
            })//入场动画

    }, [])
    useEffect(() => {
        //重新渲染页面保证ChooseCity组件能够获得数据
        // console.log(cityData)
    }, [cityData])
    return (
        <div className={classes.root}>

            <ChooseCity className="CityMap" cityData={cityData} />
            {
                cityData?.map((value: any, id: any) =>
                    // 避免渲染过多导致页面卡顿
                    id < 1 ?
                        value?.map((value: any, id: any) =>
                            id < 10 ?
                                <div
                                    className={classes.cityCards}
                                    style={{
                                        transform: 'rotate(' + Math.random() * 360 + 'deg)'
                                    }}
                                    key={id}>
                                    <CityCard value={value} />
                                </div>
                                :
                                ''
                        )
                        :
                        ''
                )
            }


        </div>
    )
}

export default City
