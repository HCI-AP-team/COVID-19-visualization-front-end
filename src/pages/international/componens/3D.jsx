import React from 'react'
import { useEffect } from 'react';
import red from '@material-ui/core/colors/red';
import { makeStyles } from '@material-ui/core/styles';
import * as d3 from "d3";
import * as topojson from 'topojson';
import worldData from '../../../assets/worldData.json'
import versor from 'versor';
// import areaData from '../../../assets/areaData'
import tsv2json from '../../../assets/tsv2json.json'
const useStyles = makeStyles(theme => ({
    globe: {
        cursor: 'move',
    }
    ,
    current: {
        position: 'absolute',
        color: 'white',
        fontFamily: 'sans - serif',
        marginLeft: '4 %',
        marginTop: '4 %'
    }
}))
function Earth(props) {
    const { areaData } = props;
    const classes = useStyles();
    const getColor = (value) => {
        if (value < 500) {
            return red[50]
        }
        else {
            if (value < 1000) {
                return red[100]
            }
            else {
                if (value < 5000) {
                    return red[200]
                }
                else {
                    if (value < 10000) {
                        return red[400]
                    }
                    else {
                        if (value < 20000) {
                            return red[600]
                        }
                        else {
                            return red[900]
                        }
                    }
                }
            }
        }
    }
    useEffect(() => {
        //
        // Configuration
        //

        // 地球拖动后再次自动旋转的延时
        let rotationDelay = 3000
        // scale of the globe (not the canvas element)
        let scaleFactor = 0.9
        // 每秒钟自动旋转的角度
        let degPerSec = 6
        // 开始的角度
        let angles = { x: -20, y: 40, z: 0 }
        // 颜色
        let colorWater = 'skyblue'
        let colorLand = '#111'
        let colorGraticule = 'skyblue'
        let colorCountry = '#a00'


        //
        // Handler
        //

        //鼠标进入某个国家
        function enter(country) {
            country = countryList.find(function (c) {
                return c.id === country.id
            })
            console.log(country && country.name || '')
            let temp = areaData.results.filter((e) => e.countryEnglishName === (country && country.name || ''))
            console.log(temp)
        }

        //鼠标离开
        function leave(country) {
            current.text('')
        }

        //
        // Variables
        //

        // 设置当前选中国家的名称
        let current = d3.select('#current')
        // 地球3d模型
        let canvas = d3.select('#globe')
        let context = canvas.node().getContext('2d')

        let water = { type: 'Sphere' }

        // 设置投影精度
        let projection = d3.geoOrthographic().precision(0.1)

        // 生成10度划分度几何体
        let graticule = d3.geoGraticule10()

        // 使用默认设置创建新的地理路径生成器。设置当前投影。设置当前上下文。
        let path = d3.geoPath(projection).context(context)
        let v0 // 鼠标在拖动手势开始时的笛卡尔坐标位置。
        let r0 // 投影旋转作为欧拉角在开始。
        let q0 // 投影旋转作为versor的开始。

        //得到当前时间
        let lastTime = d3.now()

        // 每毫秒旋转角度
        let degPerMs = degPerSec / 1000

        // 画布的宽高
        let width, height

        // land 包含的是所有大陆的绘制路径,countries 包含的是所有国家的绘制路径
        let land, countries

        //国家列表
        let countryList

        let autorotate, now, diff, rotation

        //当前选中的国家
        let currentCountry

        //
        // Functions

        function setAngles() {
            // 设置旋转角度
            rotation = projection.rotate()
            rotation[0] = angles.y
            rotation[1] = angles.x
            rotation[2] = angles.z
            projection.rotate(rotation)
        }

        function scale() {
            // 设置画布大小为屏幕大小
            width = document.documentElement.clientWidth
            height = document.documentElement.clientHeight
            canvas.attr('width', width).attr('height', height)

            projection
                .scale((scaleFactor * Math.min(width, height)) / 2) //缩放为正方形
                .translate([width / 2, height / 2]) //移动投影中心
            render()
        }

        function startRotation(delay) {
            autorotate.restart(rotate, delay || 0)
        }

        function stopRotation() {
            autorotate.stop()
        }

        function dragstarted() {
            v0 = versor.cartesian(projection.invert(d3.mouse(this)))
            r0 = projection.rotate()
            q0 = versor(r0)
            stopRotation()
        }

        function dragged() {
            let v1 = versor.cartesian(projection.rotate(r0).invert(d3.mouse(this)))
            let q1 = versor.multiply(q0, versor.delta(v0, v1))
            let r1 = versor.rotation(q1)
            projection.rotate(r1)
            render()
        }

        function dragended() {
            startRotation(rotationDelay)
        }

        function render() {
            // 清除画布内容
            context.fillStyle = "#fff9c4";
            context.fillRect(0, 0, width, height)

            // 填充水
            fill(water, colorWater)
            stroke(graticule, colorGraticule)
            fill(land, "white")
            stroke(countries, "black")

            // 对每个国家通过获取名字,再获取感染人数,最后上色
            countries.features.forEach(el => {
                let color;
                let name;
                name = countryList.find((value) => parseInt(value.id) === parseInt(el.id))
                name = name ? name.name : '';
                if (!name)
                    return
                let confirm = areaData.results.find(f => f.provinceEnglishName === name)
                confirm = confirm ? confirm.confirmedCount : '';
                if (!confirm)
                    return
                color = getColor(confirm)
                fill(el, color)
            })

            // countries.features.find(f =>
            //     f.geometry.coordinates.find(c1 =>
            //         polygonContains(c1, pos)
            //         ||
            //         c1.find(c2 =>
            //             polygonContains(c2, pos)
            //         )
            //     )
            // )

            if (currentCountry) {
                fill(currentCountry, "#9ccc65")
            }
        }

        function fill(obj, color) {
            context.beginPath()
            path(obj)
            context.fillStyle = color
            context.fill()
        }

        function stroke(obj, color) {
            context.beginPath()
            path(obj)
            context.strokeStyle = color
            context.stroke()
        }

        function rotate(elapsed) {
            now = d3.now()
            diff = now - lastTime
            if (diff < elapsed) {
                rotation = projection.rotate()
                rotation[0] += diff * degPerMs
                projection.rotate(rotation)
                render()
            }
            lastTime = now
        }

        const loadData = async (cb) => {
            // let temp = []
            // await d3.tsv('https://gist.githubusercontent.com/mbostock/4090846/raw/07e73f3c2d21558489604a0bc434b3a5cf41a867/world-country-names.tsv', function (countries) {
            //     temp.push(countries)
            // })
            // console.log(temp)
            cb(worldData, tsv2json)
            
        }

        // https://github.com/d3/d3-polygon
        function polygonContains(polygon, point) {
            let n = polygon.length
            let p = polygon[n - 1]
            let x = point[0], y = point[1]
            let x0 = p[0], y0 = p[1]
            let x1, y1
            let inside = false
            for (let i = 0; i < n; ++i) {
                p = polygon[i];
                x1 = p[0];
                y1 = p[1];
                if (((y1 > y) !== (y0 > y)) && (x < (x0 - x1) * (y - y1) / (y0 - y1) + x1)) inside = !inside
                x0 = x1;
                y0 = y1
            }
            return inside
        }

        function mousemove() {
            let c = getCountry(this)

            // 如果没有选中
            if (!c) {
                if (currentCountry) {
                    leave(currentCountry)
                    currentCountry = undefined
                    render()
                }
                return
            }
            // 选中国家没有改变
            if (c === currentCountry) {
                return
            }
            currentCountry = c

            // console.log(countryList.find(el=>parseInt(el.id)===parseInt(c.id)).name)
            render()
            enter(c)
        }

        // 得到当前选中的国家
        function getCountry(event) {
            let pos = projection.invert(d3.mouse(event))
            return countries.features.find(f =>
                f.geometry.coordinates.find(c1 =>
                    polygonContains(c1, pos)
                    ||
                    c1.find(c2 =>
                        polygonContains(c2, pos)
                    )
                )
            )
        }


        //
        // Initialization
        //

        setAngles()

        if (areaData)
            loadData(function (world, cList) {
                land = topojson.feature(world, world.objects.land)
                countries = topojson.feature(world, world.objects.countries)
                countryList = cList
                // window.addEventListener('resize', scale)
                scale()
                autorotate = d3.timer(rotate)
            })

        canvas
            .call(d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended)
            )
            .on('mousemove', mousemove)
            .on('click',()=>{console.log(1)})

    }, [areaData])
    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <h2 id="current" className={classes.current}></h2>
            <canvas id="globe" className={classes.globe}></canvas>
        </div>
    )
}

export default Earth
