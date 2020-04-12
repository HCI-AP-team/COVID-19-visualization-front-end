import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 300,
        maxWidth: 350
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
function CityCard(props:any) {
    const { language } = props;
    const classes = useStyles();
    return (
        <Card className={classes.root} elevation={5}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                {(language?'城市名称: '+(props.value.cityName?props.value.cityName:props.value.provinceShortName):'city name: '+(props.value.cityEnglishName))}
                {/* 没有城市名称属性就是特殊地区 */}
                </Typography>
                <Typography variant="body2" component="p">
                    {(language?'今日确诊: ':'current confirmed count: ')+props.value.currentConfirmedCount}
                </Typography>
                <Typography variant="body2" component="p">
                   {(language?' 累计确诊: ':'confirmed count: ')+props.value.confirmedCount}
                </Typography>
                <Typography variant="body2" component="p">
                    {(language?'疑似人数: ':'suspencted count: ')+props.value.suspectedCount}
                </Typography>
                <Typography variant="body2" component="p">
                    {(language?'治愈人数: ':'cured count: ')+props.value.curedCount}
                </Typography>
                <Typography variant="body2" component="p">
                    {(language?'死亡人数: ':'dead count: ')+props.value.deadCount}
                </Typography>
                <Typography variant="body2" component="p">
                    {(language?'所属省份: '+props.value.provinceName:'Subordinate to the province: '+props.value.provinceEnglishName)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" variant="contained">{language?'进一步了解这个城市':'learn more about this city'}</Button>
            </CardActions>
        </Card>
    )
}

export default CityCard
