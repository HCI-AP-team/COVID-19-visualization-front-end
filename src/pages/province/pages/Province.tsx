import React from 'react'
import { useState, useEffect } from 'react'
import { Chart } from '@antv/g2'
import areaData from '../../../assets/areaData'
import SelectBox from '../components/SelectBox'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fce4ec'
    },
    chart: {
        height: '80vh',
        width: '80vw'
    }
}));
function Province() {
    // 用于选择对比展示各省的哪一个属性
    const [displayLabel, setDisplayLabel] = useState('confirmedCount');
    interface dataForm {
        省份: any;
        value: any;
    }
    const classes = useStyles();

    useEffect(() => {
        // let url = 'https://lab.isaaclin.cn/nCoV/api/area';
        // fetch(url, {
        //     method: 'GET',
        //     mode: 'cors',
        // })
        //     .then(re => re.json())
        //     .then(re => {
        //         // console.log(re)
        //         let data = re.results.map((el: any) => {
        //             if (el.countryName == '中国') {
        //                 return { 省份: el.provinceShortName, value: el.curedCount }
        //             }
        //             else
        //                 return;
        //         })
        //         data = data.filter((el: any) => el !== undefined)
        //         data = data.sort((a: any, b: any) => - b.value + a.value)
        //         // console.log(data)
        //         const chart = new Chart({
        //             container: 'province',//容器姓名
        //             autoFit: true,//自动适配容器宽高
        //         });
        //         chart.data(data);
        //         chart.scale({
        //             value: {
        //                 max: 60000,
        //                 min: 0,
        //                 alias: '确诊人数',
        //             },
        //         });
        //         chart.axis('省份', {
        //             title: {
        //                 offset: 10,
        //                 style: {
        //                     fontSize: 12,
        //                     fontWeight: 600,
        //                 },
        //             },
        //             tickLine: null,
        //         });

        //         chart.axis('value', {
        //             label: null,
        //             title: {
        //                 offset: 5,
        //                 style: {
        //                     fontSize: 12,
        //                     fontWeight: 600,
        //                 },
        //             },
        //         });
        //         chart.coordinate().transpose();//创建坐标系,并进行转置变换
        //         chart
        //             .interval()
        //             .position('省份*value')
        //             .size(18)
        //             .label('value', {
        //                 style: {
        //                     fill: '#8d8d8d',
        //                 },
        //                 offset: 10,
        //             });
        //         chart.interaction('element-active');
        //         chart.render();
        //     })
        //     .catch((er) => window.location.reload());


        // currentConfirmedCount 今日确诊数
        // confirmedCount 累计确诊数
        // suspectedCount 疑似数量
        // curedCount 治愈数
        // deadCount 死亡数
        let data: dataForm[] = areaData.results.map((el: any): {} | undefined => {
            if (el.countryName === '中国') {
                return { 省份: el.provinceShortName, value: el[displayLabel] }
            }
            else
                return undefined;
        }) as dataForm[];
        data = data.filter((el: any) => el !== undefined)
        data = data.sort((a: any, b: any) => - b.value + a.value)
        const chart = new Chart({
            container: 'province',//容器姓名
            autoFit: true,//自动适配容器宽高
        });
        chart.data(data);
        chart.scale({
            value: {
                max: data[data.length - 1].value * 1.2,// 设定横坐标最大值,因为已经排序了
                min: 0,
                alias: displayLabel,//横坐标显示
            },
        });
        chart.axis('省份', {
            title: {
                offset: 10,
                style: {
                    fontSize: 18,
                    fontWeight: 800,
                },
            },
            tickLine: null,
        });

        chart.axis('value', {
            label: null,
            title: {
                offset: 5,
                style: {
                    fontSize: 18,
                    fontWeight: 800,
                },
            },
        });
        chart.coordinate().transpose();//创建坐标系,并进行转置变换
        chart
            .interval()
            .position('省份*value')
            .size(18)
            .label('value', {
                style: {
                    fill: '#8d8d8d',
                    fontWeight: 800
                },
                offset: 10,
            });
        chart.interaction('element-active');
        chart.render();
        return () => {
            chart.destroy();//摧毁图表
        }
    }, [displayLabel])
    return (
        <div className={classes.root}>
            <SelectBox displayLabel={displayLabel} setDisplayLabel={setDisplayLabel} />
            <div id='province' className={classes.chart}>
            </div>
        </div>
    )
}

export default Province
