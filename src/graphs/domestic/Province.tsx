import React from 'react'
import { useEffect } from 'react'
import { Chart } from '@antv/g2'
import areaData from '../../tempData/areaData'
function Province() {
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
        interface dataForm{
            省份: any;
            value: any;
        }
        let data:dataForm[] = areaData.results.map((el: any):{}|undefined => {
            if (el.countryName === '中国') {
                return { 省份: el.provinceShortName, value: el.curedCount }
            }
            else
                return undefined;
        }) as dataForm[];
        data = data.filter((el: any) => el !== undefined)
        data = data.sort((a: any, b: any) => - b.value + a.value)
        console.log(data)
        const chart = new Chart({
            container: 'province',//容器姓名
            autoFit: true,//自动适配容器宽高
        });
        chart.data(data);
        chart.scale({
            value: {
                max: 60000,
                min: 0,
                alias: '确诊人数',
            },
        });
        chart.axis('省份', {
            title: {
                offset: 10,
                style: {
                    fontSize: 12,
                    fontWeight: 600,
                },
            },
            tickLine: null,
        });

        chart.axis('value', {
            label: null,
            title: {
                offset: 5,
                style: {
                    fontSize: 12,
                    fontWeight: 600,
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
                },
                offset: 10,
            });
        chart.interaction('element-active');
        chart.render();
    })
    return (
        <div id='province' style={{ height: '100vh', width: '100vw' }}>

        </div>
    )
}

export default Province
