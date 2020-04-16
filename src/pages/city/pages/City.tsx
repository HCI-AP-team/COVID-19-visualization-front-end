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
        backgroundColor: '#fff9c4'
    },
    cityCards: {
        position: 'absolute',
        right: '15vw',
        top: '30vh'
    }
})
function City(props: any) {
    const { language, areaData } = props;
    const classes = useStyles();
    const [cityData, setCityData] = useState()
    //加载城市数据
    useEffect(() => {

        if (areaData) {
            //设置两个零时变量,用于将省份信息添加到每一个市中
            let tempChinaData = areaData.results
                .filter((value: any) => value.countryEnglishName === "China"&&value.provinceName!=="中国")
            let tempCityData = areaData.results
                .filter((value: any) => value.countryEnglishName === "China"&&value.provinceName!=="中国")
                .map((el: any) => el.cities?.length ? el.cities : [el])//长度为0就是特殊地区如香港

            //将添加省份信息后的城市数据放在状态中
            setCityData(tempCityData
                .map((value: any, index: number) => value
                    .map((val: any) => {
                        val.provinceName = tempChinaData[index].provinceName;
                        val.provinceEnglishName = tempChinaData[index].provinceEnglishName;
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

    }, [areaData])
    useEffect(() => {
        //重新渲染页面保证ChooseCity组件能够获得数据
        console.log(cityData)
    }, [cityData])
    return (
        <div className={classes.root}>

            <ChooseCity className="CityMap" language={language} cityData={cityData} />
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
