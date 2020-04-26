import baseURL from './baseURL'
//用于获取疫情数据
const getData = async () => {
    let areaData = await fetch(baseURL+'/Hel').then(e => e.json())
<<<<<<< HEAD
=======
    // let areaData = await fetch(baseURL).then(e => e.json())
    // console.log(areaData.results)
>>>>>>> 3423589c694f41c53a90e969028da3328ac466a1
    return areaData;
}
export default getData