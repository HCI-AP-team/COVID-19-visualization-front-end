English | [简体中文](./README.zh-CN.md)
# The visualization of the NCP 
It's the front-end of the coursework about the course advanced program

# Aim
- Visualize the NCP data
- Beautiful interface
- Support end-user interaction to query the data of different regions(provinces/cities)

# How to run the demo?
1. clone the repository
```git
git clone https://github.com/HCI-AP-team/AP-coursework-front-end.git
```
2. install [nodeJS](https://nodejs.org/en/)(with npm) and install yarn(recomand install yarn global)
```
npm i yarn -g
```
> :bangbang: Hint:
> If you are using npm in China, maybe you can consider about replacing the source of the npm([nrm](https://www.npmjs.com/package/nrm) is a good choice).
3. in the root directory of the project, run the two commands
```shell
yarn 
yarn start
```
4. the project will run in 3000 port, you can visit it in  __localhost:3000__
> :bangbang: if something is running in 3000 port, the project will choose another port to run.

# Features
- ⚛️ react
- :warning: typescript
- :eyes: jss
- :gem: material-ui
- :pencil2: raphael
- :ant: antv
- :scroll: raphael
- :computer: tensorflow-js (need https)

# Tasklist
- [x] Homepage display
- [x] International status
- [x] General situation of China
- [x] Provinces comparison
- [x] Cities detail
- [x] News