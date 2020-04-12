import baseURL from './baseURL'
const getAreaData = async (parameter: string) => {
    let areaData = await fetch(baseURL + parameter,).then(e => e.json())
    console.log(areaData.result)
    return areaData;
}
export default getAreaData