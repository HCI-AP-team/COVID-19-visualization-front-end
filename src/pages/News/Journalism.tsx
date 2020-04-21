import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button/Button";
<<<<<<< HEAD
import ScrollReveal from "scrollreveal";
import LanguageChoose from "../../components/LanguageChoose";

=======
>>>>>>> a07b059e4a81a63b3c3891d78864bc09d252f39f
const useStyles = makeStyles({
    root: {
        width: '100vw',
        height: '100vh',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff9c4'   //#ffffff
    },
    root1: {
        width: '100vw',
        height: '10vh',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff9c4'   //#ffffff
    },
    h1:{
        width: '100vw',
        height: '10vh',
        textAlign: 'center',
        backgroundColor: '#fff9c4'
    }
})



function Journalism(props: any) {
    const { language} = props;
    const classes = useStyles();
    //const [cityData, setCityData] = useState()
    const newsData: object[] = [
        {
            id: 1,
            "title": "塞尔维亚足协主席确诊感染",
            "titleE": "The head of Serbia's football federation confirmed the infection",
            "summary": "塞尔维亚足协官方网站宣布，塞尔维亚足协主席斯拉维萨·科茨（Slavisa Kokez）被确诊新冠病毒阳性。目前他状况良好，正在隔离。塞尔维亚足协表示，足协将继续正常运转。塞尔维亚足协同时呼吁相关的俱乐部和机构能够采取负责任的措施，以最大程度地减少疫情带来的影响。",
            "infoSource": "人民日报",
            "infoSourceE": "The People's Daily",
            "sourceUrl": "http://m.weibo.cn/2803301701/4482685466110217",
        },
        {
            id: 2,
            "title": "25省区市新增确诊病例为0",
            "titleE": "The number of newly confirmed cases in 25 provinces and municipalities was 0",
            "summary": "3月14日0时至24时，天津、河北、山西、辽宁、吉林、黑龙江、江苏、安徽、福建、江西、山东、河南、湖南、广西、海南、重庆、四川、贵州、云南、西藏、青海、宁夏、新疆（含兵团）无新增确诊病例；3月14日8时至15日8时，陕西无新增新冠肺炎确诊病例；3月14日7时至15日7时，内蒙古自治区报告无新增新冠肺炎确诊病例。\n",
            "infoSource": "人民日报",
            "infoSourceE": "The People's Daily",
            "sourceUrl": "http://m.weibo.cn/2803301701/4482680399655238",
        },
        {
            id: 3,
            "title": "西班牙正式在全国限制人员流动",
            "titleE": "Spain has formally restricted the movement of people across the country",
            "summary": "当地时间14日，西班牙首相桑切斯宣布，为对抗新冠疫情，全西班牙即日起限制人员流动，全国人民的出行将受到最大程度限制，除购买食品、就医和工作等活动外，必须待在家中。非必要公共场所全部对公众关闭。截至14日晚间，西班牙确诊病例升至6393例，死亡195例。",
            "infoSource": "人民日报海外版",
            "infoSourceE": "People's Daily overseas edition",
            "sourceUrl": "http://m.weibo.cn/3057540037/4482679771188172",
        },
        {
            id: 4,
            "title": "韩国累计确诊8162例新冠肺炎",
            "titleE": "A total of 8162 cases of COVID - 19 were confirmed in Korea",
            "summary": "据韩国卫生部门消息，截至当地时间15日0时，过去24小时韩国共报告确诊新增新型冠状病毒感染者76例。韩国目前累计确诊8162例，死亡75例，治愈并解除隔离834例。这是新冠疫情在韩国快速发展3周多以来，首次日新增确诊人数降至两位数。",
            "infoSource": "央视新闻",
            "infoSourceE": "CCTV news",
            "sourceUrl": "http://m.weibo.cn/2656274875/4482669293738425",
        },
        {
            id: 5,
            "title": "广东省新冠肺炎疫情情况",
            "titleE": "Epidemic situation of COVID - 19 in guangdong province",
            "summary": "截至3月14日24时，全省累计报告新冠肺炎确诊病例1357例，累计出院1303例，累计死亡8例。14日当天全省新增确诊病例1例，为深圳报告境外输入病例。新增出院4例。有1例疑似病例。有430名密切接触者正在接受医学观察。",
            "infoSource": "广东卫健委",
            "infoSourceE": "Guangdong health commission",
            "sourceUrl": "http://wsjkw.gd.gov.cn/xxgzbdfk/yqtb/content/post_2931109.html",
        }
    ]
    const list: JSX.Element[] = newsData.map((item: any) =>
<<<<<<< HEAD
        <List>
            <ListItem>
                <Button href={item.sourceUrl} >
                    <ListItemAvatar  >
                        <Avatar  src={item.sourceUrl}/>
=======
        <List component="nav" aria-label="main mailbox folders" key={item.sourceUrl}>
            <ListItem  >
                <Button href={item.sourceUrl}>
                    <ListItemAvatar>
                        <Avatar src={item.sourceUrl} />
>>>>>>> a07b059e4a81a63b3c3891d78864bc09d252f39f
                    </ListItemAvatar>

                    <ListItemText  primary={language?item.title:item.titleE} secondary={language?item.infoSource:item.infoSourceE} />
                 </Button>
            </ListItem>
        </List>)



    return (
        <div className={classes.root} >
            <h1 className={classes.h1} >{language?'新闻概览':'Overview of News'}</h1>
            <div className={classes.root1} >{list}</div>

        </div>
    )
}

export default Journalism

<<<<<<< HEAD

/*const Journalism = () => {src={item.sourceUrl}
    const classes = useStyles();
    <ListItemIcon>      component="nav" aria-label="main mailbox folders"  language={language}
        <InboxIcon href={item.sourceUrl}/>
    </ListItemIcon>

    //const bull = <span className={classes.bullet}>•</span>;

    <ListItemAvatar>
        <Avatar src={item.sourceUrl} />
    </ListItemAvatar>
    /*
    const newsData: object[] = [
        {
            id: 1,
            "title": "塞尔维亚足协主席确诊感染",
            "summary": "塞尔维亚足协官方网站宣布，塞尔维亚足协主席斯拉维萨·科茨（Slavisa Kokez）被确诊新冠病毒阳性。目前他状况良好，正在隔离。塞尔维亚足协表示，足协将继续正常运转。塞尔维亚足协同时呼吁相关的俱乐部和机构能够采取负责任的措施，以最大程度地减少疫情带来的影响。",
            "infoSource": "人民日报",
            "sourceUrl": "http://m.weibo.cn/2803301701/4482685466110217",
        },
        {
            id: 2,
            "title": "25省区市新增确诊病例为0",
            "summary": "3月14日0时至24时，天津、河北、山西、辽宁、吉林、黑龙江、江苏、安徽、福建、江西、山东、河南、湖南、广西、海南、重庆、四川、贵州、云南、西藏、青海、宁夏、新疆（含兵团）无新增确诊病例；3月14日8时至15日8时，陕西无新增新冠肺炎确诊病例；3月14日7时至15日7时，内蒙古自治区报告无新增新冠肺炎确诊病例。\n",
            "infoSource": "人民日报",
            "sourceUrl": "http://m.weibo.cn/2803301701/4482680399655238",
        },
        {
            id: 3,
            "title": "西班牙正式在全国限制人员流动",
            "summary": "当地时间14日，西班牙首相桑切斯宣布，为对抗新冠疫情，全西班牙即日起限制人员流动，全国人民的出行将受到最大程度限制，除购买食品、就医和工作等活动外，必须待在家中。非必要公共场所全部对公众关闭。截至14日晚间，西班牙确诊病例升至6393例，死亡195例。",
            "infoSource": "人民日报海外版",
            "sourceUrl": "http://m.weibo.cn/3057540037/4482679771188172",
        },
        {
            id: 4,
            "title": "韩国累计确诊8162例新冠肺炎",
            "summary": "据韩国卫生部门消息，截至当地时间15日0时，过去24小时韩国共报告确诊新增新型冠状病毒感染者76例。韩国目前累计确诊8162例，死亡75例，治愈并解除隔离834例。这是新冠疫情在韩国快速发展3周多以来，首次日新增确诊人数降至两位数。",
            "infoSource": "央视新闻",
            "sourceUrl": "http://m.weibo.cn/2656274875/4482669293738425",
        },
    ]

    const card: JSX.Element[] = newsData.map((item: any) =>
        <Card className={classes.root} key={item.name}>

            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {item.title}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p">
                        {item.infoSource}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <Button size="large" variant="contained" color="primary">
                    <a href={item.sourceUrl}>跳转</a>
                </Button>
            </CardActions>

        </Card>)

    // @ts-ignore

    const List:JSX.Element[] = newsData.map((item: any) =>
        <List component="nav" aria-label="main mailbox folders">
            <ListItem>
                <ListItemAvatar>
                    <Avatar src={item.sourceUrl} />
                </ListItemAvatar>
                <ListItemText primary={item.title} secondary={item.infoSource} />
            </ListItem>
        </List>)

    return (
        <div className={classes.root}>
            <h1 >新闻概览</h1>
            <div className={classes.cityCards}>{List}</div>
        </div>
    )
}

export default Journalism*/
=======
>>>>>>> a07b059e4a81a63b3c3891d78864bc09d252f39f
