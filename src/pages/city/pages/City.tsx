import React from 'react'
import { useState, useEffect } from 'react'
import ScrollReveal from 'scrollreveal'
import areaData from '../../../assets/areaData'
import ChooseCity from '../components/ChooseCity'
import CityCard from '../components/CityCard'
function City() {
    const [cityData, setCityData] = useState();
    const [chooseCity, setChooseCity] = useState('')
    //加载城市数据
    useEffect(() => {
        setCityData(areaData.results.filter((value) => value.countryEnglishName === "China").map(el => el.cities))
        ScrollReveal().reveal("#CityMap",{ duration: 500,distance: '0px',opacity:0 ,reset: true})//入场动画
    }, [])
    useEffect(() => {
        //重新渲染页面保证ChooseCity组件能够获得数据
    }, [cityData])
    return (
        <div id="CityMap" style={{ width: '100vw', height: '100vh', position: 'relative', backgroundColor: '#fff9c4' }}>

            <ChooseCity cityData={cityData}/>
            {
                cityData?.map((value: any, id: number) =>
                    // 避免渲染过多导致页面卡顿
                    id < 1 ?
                        value?.map((value: any, id: number) =>
                            <div style={{ position: 'absolute', right: '10vw', top: '30vh', transform: 'rotate(' + Math.random() * 360 + 'deg)' }} key={id}>
                                <CityCard value={value} />
                            </div>)
                        :
                        ''
                )
            }


        </div>
    )
}

export default City
