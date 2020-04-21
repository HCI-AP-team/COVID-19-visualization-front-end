import React from 'react'
import { useEffect } from 'react'
import { Chart } from '@antv/g2'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    chart: {
        height: '80vh',
        width: '80vw'
    },
}));
function Histogram(props: any) {
    // 用于选择对比展示各省的哪一个属性
    const { language, chinaData, displayLabel } = props;
    const classes = useStyles();

    useEffect(() => {


        // currentConfirmedCount 今日确诊数
        // confirmedCount 累计确诊数
        // suspectedCount 疑似数量
        // curedCount 治愈数
        // deadCount 死亡数
        if (chinaData) {
            // let data: dataForm[] = areaData.results.map((el: any): {} | undefined => {
            //     if (el.countryName === '中国' && el.provinceShortName !== "中国") {
            //         return { 省份: el.provinceShortName, province: el.provinceEnglishName, value: el[displayLabel] > 0 ? el[displayLabel] : 0 }
            //     }
            //     else
            //         return undefined;
            // }) as dataForm[];
            // data = data.filter((el: any) => el !== undefined)
            // //console.log(data)
            let data = chinaData.map((el: any) => {
                return {
                    省份: el.provinceShortName,
                    province: el.provinceEnglishName,
                    value: el[displayLabel] > 0 ? el[displayLabel] : 0
                }
            })
            data = data.sort((a: any, b: any) => - b.value + a.value)
            const chart = new Chart({
                container: 'province',//容器姓名
                autoFit: true,//自动适配容器宽高
            });
            chart.data(data);
            chart.scale({
                value: {
                    max: data[data.length - 1].value * 1.2,// 设定横坐标最大值,因为已经排序了,所以选取最后一个
                    min: 0,
                    alias: language ? '单位/人' : 'people',//横坐标显示
                },
            });
            chart.axis(language ? '省份' : 'province', {
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
                .position((language ? '省份' : 'province') + '*value')
                .size(18)
                .label('value', {
                    style: {
                        fill: '#8d8d8d',
                        fontWeight: 800
                    },
                    offset: 10,
                });
            chart.interaction('element-active');
            setTimeout(() => chart.render(), 0)
            return () => {
                chart.destroy();//摧毁图表,防止多次渲染
            }
        }
    }, [displayLabel, language, chinaData])
    return (
        <div id='province' className={classes.chart} />
    )
}

export default Histogram
