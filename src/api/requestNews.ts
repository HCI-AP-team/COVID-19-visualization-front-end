import baseURL from './baseURL'
//用于获取疫情数据
const getData = async () => {
    let newsData = await fetch(baseURL+'/News').then(e => e.json())
    return newsData;
}
export default getData