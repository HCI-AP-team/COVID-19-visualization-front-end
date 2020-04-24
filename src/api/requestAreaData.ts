import baseURL from './baseURL'
//用于获取疫情数据
const getData = async () => {
    let areaData = await fetch('https://lab.isaaclin.cn/nCoV/api/area').then(e => e.json())
    // let areaData = await fetch(baseURL).then(e => e.json())
    // console.log(areaData.results)
    return areaData;
}
export default getData