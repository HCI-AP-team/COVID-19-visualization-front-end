[English](./README.md) | 简体中文
# 新冠肺炎数据可视化
这是高级程序课程大作业的前端部分

# 目标
- 可视化数据
- 漂亮的界面
- 支持终端用户查询不同区域（省份/城市）的数据

# 怎么运行？
1. 克隆这个仓库
```git
git clone https://github.com/HCI-AP-team/AP-coursework-front-end.git
```
2. 安装[nodeJS](https://nodejs.org/en/)(自带npm)，并且安装yarn（推荐全局安装）
```
npm i yarn -g
```
> :bangbang: 提示:
> 如果你是在中国使用npm，可能需要替换npm源提升下载速度([nrm](https://www.npmjs.com/package/nrm) 是一个很好的选择)。
3. 在项目根目录运行下面这两个命令
```shell
yarn 
yarn start
```
4. 这个项目会在本地 __3000__ 端口运行, 你可以去 __localhost:3000__ 看到它
> :bangbang: 如果3000端口被占用，这个项目将会在别的端口运行。

# 技术栈
- ⚛️ react
- :warning: typescript
- :eyes: jss
- :gem: material-ui
- :pencil2: d3
- :ant: antv
- :scroll: raphael
- :computer: tensorflow-js


# 任务列表
- [x] 主页展示
- [x] 全球情况
- [x] 中国情况概览
- [x] 国内各省份对比
- [x] 城市详情
- [x] 新闻