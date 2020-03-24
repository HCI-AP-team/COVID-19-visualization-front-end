import React, { useEffect, useState, useRef } from 'react'
import { Button, TextField } from '@material-ui/core'
import CityCard from './CityCard'
function ChooseCity(props: any) {

    //TODO 将直辖市归位 市 ,同时处理没有情况的市,还有城市切换的动画


    const { cityData } = props
    const [allCityArray, setAllCityArray] = useState()//所有城市数据合并的数组
    const [oneCity, setOneCity] = useState()//某一个城市的数据
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {

        //将所有城市的数据放在一个一维数组中便于查找
        let allCityArr:any[] = []   //用于合并数据的临时变量
        cityData?cityData.forEach((e:any)=>{allCityArr.push(...e);}):console.log('empty cityData')
        allCityArr?setAllCityArray(allCityArr):console.log('empty city data array');
    }, [cityData])
    //查询展示某个城市的数据
    const searchCityData = ()=>{
        let chooseCityName = inputRef.current?.value;
        setOneCity(allCityArray.filter((value:any) => value.cityName===chooseCityName)[0])//获得当前选择的城市
        
    }
    //随机展示一个城市的数据
    const randomDisplay = ()=>{
        let randomCity = allCityArray[Math.floor(allCityArray.length*Math.random())]//随机抽取一个城市
        setOneCity(randomCity);
    }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'space-around', paddingTop: '20px' }}>
                <Button onClick={randomDisplay} color="primary" variant="contained" style={{ marginRight: '5vw' }}>随便看一看</Button>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'space-around' }}>
                    <TextField inputRef={inputRef} id="outlined-basic" label="City Name" variant="outlined" style={{ marginRight: '1vw' }} />
                    <Button color="secondary" variant="contained" onClick={searchCityData}>查找指定城市</Button>
                </div>
            </div>
    <div style={{marginTop:'20vh',marginLeft:'15vw'}}>{oneCity?<CityCard value={oneCity}/>:`你当前没有查看任何城市的详情`}</div>
        </div >
    )
}

export default ChooseCity
