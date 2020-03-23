import React from 'react'
import { useState, useEffect } from 'react'
import areaData from '../../../assets/areaData'
function CityDetail() {
    const [cityData,setCityData] = useState();
    useEffect(() => {
        setCityData(areaData.results.filter((value) => value.countryEnglishName === "China").map(el=>el.cities))
    }, [])
    useEffect(() => {
        console.log(cityData)
    }, [cityData])
    return (
        <div>
            {/* {cityData?.map((el:any)=>{console.log(el);return '1'})} */}
        </div>
    )
}

export default CityDetail
