import baseURL from './baseURL'
//用于获取中国地图填充数据
const getData = async () => {
    let areaData = await fetch(baseURL + '/chinamapData').then(e => e.json())
    //console.log(areaData.result)
    return areaData;
}
export default getData