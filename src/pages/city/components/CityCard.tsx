import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: 300
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
    const classes = useStyles();
    return (
        <Card className={classes.root} elevation={5}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                cityName|cityEnglishName:{props.value.cityName}
                </Typography>
                <Typography variant="body2" component="p">
                    今日确诊|currentConfirmedCount:{props.value.currentConfirmedCount}
                </Typography>
                <Typography variant="body2" component="p">
                    累计确诊|confirmedCount:{props.value.confirmedCount}
                </Typography>
                <Typography variant="body2" component="p">
                    疑似人数|suspectedCount:{props.value.suspectedCount}
                </Typography>
                <Typography variant="body2" component="p">
                    治愈人数|curedCount:{props.value.curedCount}
                </Typography>
                <Typography variant="body2" component="p">
                    死亡人数|deadCount:{props.value.deadCount}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default CityCard
