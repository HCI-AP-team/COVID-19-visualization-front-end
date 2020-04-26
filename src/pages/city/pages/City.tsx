import React from 'react'
import { useState, useEffect } from 'react'
import ScrollReveal from 'scrollreveal'
import { makeStyles } from '@material-ui/core/styles';
// import areaData from '../../../assets/areaData'
import ChooseCity from '../components/ChooseCity'
import CityCard from '../components/CityCard'
const useStyles = makeStyles({
    root: {
        width: '100vw',
        height: '100vh',
        position: 'relative',
        backgroundColor: '#748ba4'//#fff9c4
    },
    cityCards: {
        position: 'absolute',
        right: '15vw',
        top: '30vh',
        backgroundColor: '#748ba4'
    },

    h1: {
        width: '100vw',
        height: '8vh',
        color: '#1d2228',//字体颜色
        fontSize: '35px',
        textAlign: 'center',
        backgroundColor: '#748ba4'//#E8E8FF
    }
})
function City(props: any) {
    const { language, chinaData } = props;
    const classes = useStyles();
    const [cityData, setCityData] = useState()
    //加载城市数据
    useEffect(() => {
        if (chinaData) {
            //将省份信息添加到每一个市中
            let tempCityData = chinaData
                .map((el: any) => el.cities?.length ? el.cities : [el])//长度为0就是特殊地区如香港

            //将添加省份信息后的城市数据放在状态中
            setCityData(tempCityData
                .map((value: any, index: number) => value
                    .map((val: any) => {
                        val.provinceName = chinaData[index].provinceName;
                        val.provinceEnglishName = chinaData[index].provinceEnglishName;
                        //给港澳台等地区设定一个城市名称
                        if (!val.cityName) {
                            val.cityName = val.provinceName
                        }
                        return val
                    }))

            )
        }
        ScrollReveal().reveal(".CityMap",
            {
                duration: 2000,
                distance: '0px',
                opacity: 0,
                reset: true
            })//入场动画

    }, [chinaData])
    useEffect(() => {
        //重新渲染页面保证ChooseCity组件能够获得数据
        // //console.log(cityData)
    }, [cityData])
    return (
        <div className={classes.root + " CityMap"}>
            <h1 className={classes.h1}>{language ? '城市概览' : 'Cities Overview'}</h1>
            <ChooseCity language={language} cityData={cityData} />
            {
                cityData?.map((value: any, i: any) =>
                    // 避免渲染过多导致页面卡顿
                    i === 4 ?
                        value?.map((value: any, id: any) =>
                            id < 10 ?
                                <div
                                    className={classes.cityCards}
                                    style={{
                                        transform: `translate(-${2 * id}px,-${2 * id}px)`
                                    }}
                                    key={id}>
                                    <CityCard language={language} value={value} />
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
