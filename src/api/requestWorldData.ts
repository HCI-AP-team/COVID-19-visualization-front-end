import baseURL from './baseURL'
//用于获取绘制地球的路径数据
const getData = async () => {
    let areaData = await fetch(baseURL + '/worldData').then(e => e.json())
    console.log(areaData.result)
    return areaData;
}
export default getData