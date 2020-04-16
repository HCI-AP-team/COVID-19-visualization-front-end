import baseURL from './baseURL'
// 用于获取地球填充数据
const getData = async () => {
    let areaData = await fetch(baseURL + '/tsv2json').then(e => e.json())
    console.log(areaData.result)
    return areaData;
}
export default getData