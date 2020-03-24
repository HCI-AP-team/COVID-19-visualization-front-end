import React from 'react'
import { Button, TextField } from '@material-ui/core'
function CityDetail() {
    // const [cityData,setCityData] = useState();
    // useEffect(() => {
    //     setCityData(areaData.results.filter((value) => value.countryEnglishName === "China").map(el=>el.cities))
    // }, [])
    // useEffect(() => {
    //     console.log(cityData)
    // }, [cityData])
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'space-around',paddingTop:'20px' }}>
                <Button color="primary" variant="contained" style={{marginRight:'5vw'}}>随便看一看</Button>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'space-around' }}>
                    <TextField id="outlined-basic" label="City Name" variant="outlined" style={{marginRight:'1vw'}} />
                    <Button color="secondary" variant="contained" >查找指定城市</Button>
                </div>
            </div>
        </div >
    )
}

export default CityDetail
