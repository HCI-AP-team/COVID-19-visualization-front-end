import baseURL from './baseURL'
//用于获取疫情数据
const getData = async () => {
    let areaData = await fetch(baseURL+'/Hel').then(e => e.json())
    return areaData;
}
export default getData