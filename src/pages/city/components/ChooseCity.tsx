import React, { useEffect, useState, useRef } from 'react'
import { Button, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CityCard from './CityCard'
const useStyle = makeStyles(theme => ({
    specailCard: {
        position: 'absolute',
        transition: '1s all linear',
        right: '65vw',
        top: '30vh',
    },
    searchComponents: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'space-around',
        paddingTop: '20px'
    },
    autocomputeInputAndButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'space-around'
    }
})
)
function ChooseCity(props: any) {

    //TODO 将直辖市归位 市 ,同时处理没有情况的市
    const classes = useStyle();
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const { className, cityData, language } = props //父组件传过来的城市数据,需要进一步处理放入下面一行的状态中
    const [allCityArray, setAllCityArray] = useState()//所有城市数据合并的数组
    const [oneCity, setOneCity] = useState()//某一个城市的数据
    const inputRef = useRef<HTMLInputElement>(null)//输入框
    const cardRef = useRef<HTMLDivElement>(null)//那张需要特殊显示的卡
    useEffect(() => {

        //将所有城市的数据放在一个一维数组中便于查找
        let allCityArr: any[] = []   //用于合并数据的临时变量

        //将所有城市放在一个数组中
        cityData ?
            cityData.forEach((e: any) => { allCityArr.push(...e); })
            :
            console.log('empty cityData')

        //将所有城市数据储存在状态中
        allCityArr ?
            setAllCityArray(allCityArr)
            :
            console.log('empty city data array');

        // console.log(allCityArr)
    }, [cityData, language])
    //查询展示某个城市的数据
    const searchCityData = () => {
        let chooseCityName = inputRef.current?.value;
        const theCity = allCityArray
            .filter((value: any) => {
                //如果是中文
                if (language)
                    return (
                        value.cityName ?
                            value.cityName
                            :
                            value.provinceShortName
                    )
                        === chooseCityName
                else//如果是英文
                    return (
                        value.cityEnglishName ?
                            value.cityEnglishName
                            :
                            value.provinceEnglishName
                    )
                        === chooseCityName
            })[0];
        //卡片动画, 如果选中了城市并且是第一次
        if (theCity) {
            cardRef?.current?.setAttribute('style',
                `
                right:15vw;
                `)

            setTimeout(() => {
                //设置城市
                setOneCity(
                    theCity
                )//获得当前选择的城市,没有城市姓名属性就是香港等特殊地区
                cardRef?.current?.setAttribute('style',
                    `
                    right:65vw;
                    `)
            }, 1500)

        }
        else {
            //打开提示框,告知用户输入有问题
            setOpenSnackBar(true)
        }
    }
    //随机展示一个城市的数据
    const randomDisplay = () => {
        //卡片动画
        cardRef?.current?.setAttribute('style',
            `
                right:15vw;
        `)
        let randomCity = allCityArray[Math.floor(allCityArray.length * Math.random())]//随机抽取一个城市

        setTimeout(() => {
            //设置城市
            setOneCity(randomCity);
            cardRef?.current?.setAttribute('style',
                `
                    right:65vw
                    `)
        }, 1500)
    }
    return (
        <div className={className}>
            <div className={classes.searchComponents}>
                <Button onClick={randomDisplay} color="primary" variant="contained" style={{ marginRight: '5vw' }}>{language ? '随便看一看' : 'random look'}</Button>
                <div className={classes.autocomputeInputAndButton}>
                    {
                        allCityArray ?
                            <Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                //TODO 选项
                                style={{ width: 300, marginRight: '10px' }}
                                size='medium'
                                options={allCityArray}
                                groupBy={(option: any) => language ? option.provinceName : option.provinceEnglishName}
                                getOptionLabel={
                                    (option: any) =>
                                        language ?
                                            option.cityName
                                            :
                                            (option.cityEnglishName ? option.cityEnglishName : option.provinceEnglishName)
                                }
                                renderInput={params => (
                                    <TextField {...params} inputRef={inputRef} label={language ? "城市名称" : 'city name'} margin="normal" variant="outlined" />
                                )}
                            />
                            :
                            ''}
                    <Button color="secondary" variant="contained" onClick={searchCityData}>{language ? '查找指定城市' : 'Find a specified city'}</Button>
                </div>
            </div>
            <div ref={cardRef} className={classes.specailCard}>
                {
                    oneCity ?
                        <CityCard language={language} value={oneCity} />
                        :
                        <strong>
                            {language ? '你当前没有查看任何城市的详情' : 'You are not currently checking any city details'}
                            <br />
                            {language ? '注意:直辖市需要按区搜索' : 'Note: municipalities need to be searched by district'}
                        </strong>
                }
            </div>
            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={() => setOpenSnackBar(false)}>
                <MuiAlert elevation={6} onClose={() => setOpenSnackBar(false)} severity="error" variant="filled">
                    {language ? "请输入正确的城市名称" : "Please input correct name of city"}
                </MuiAlert>
            </Snackbar>
        </div >
    )
}

export default ChooseCity
