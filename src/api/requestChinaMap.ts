import baseURL from './baseURL'
//用于获取中国地图绘制路径数据
const getData = async () => {
    let areaData = await fetch(baseURL + '/ChinaMap').then(e => e.json())
    //console.log(areaData.result)
    return areaData;
}
export default getData