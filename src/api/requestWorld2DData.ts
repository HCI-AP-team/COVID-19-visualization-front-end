// import baseURL from './baseURL'
// //用于获取绘制地球的路径数据
// const getData = async () => {
//     let areaData = await fetch(baseURL + '/2Dearth').then(e => e.json())
//     //console.log(areaData.result)
//     return areaData;
// }
// export default getData

const getData = async () => {
    let areaData = await fetch(
        'https://gw.alipayobjects.com/os/bmw-prod/e62a2f3b-ea99-4c98-9314-01d7c886263d.json',
    ).then((d) => d.json())
    return areaData;
}
export default getData;