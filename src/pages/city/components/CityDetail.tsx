import React from 'react'
import { useState, useEffect } from 'react'
import areaData from '../../../assets/areaData'
function CityDetail() {
    const [cityData,setCityData] = useState();
    useEffect(() => {
        setCityData(areaData.results.filter((value) => value.countryEnglishName === "China").map(el=>el.cities))
        
        console.log(cityData)
    }, [])
    return (
        <div>

        </div>
    )
}

export default CityDetail
