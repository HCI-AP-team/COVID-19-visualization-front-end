import baseURL from './baseURL'
const getAreaData = async (parameter: string) => {
    await fetch(baseURL + parameter, {
        mode: 'cors',
    }).then(e => console.log(e))
}
export default getAreaData