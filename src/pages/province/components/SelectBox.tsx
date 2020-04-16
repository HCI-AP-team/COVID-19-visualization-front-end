import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        border: '1px solid black',
        borderRadius: '3px',
        padding: '8px'
    },
}));

function SelectBox(props: any) {
    const { displayLabel, setDisplayLabel, language } = props;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleChange = (event: any) => {
        setDisplayLabel(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">{language?'显示':'display'}</InputLabel>
            <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={displayLabel}
                onChange={handleChange}
            >
                <MenuItem value={'currentConfirmedCount'}>{language?'今日确诊数':'current confirmed count'}</MenuItem>
                <MenuItem value={'confirmedCount'}>{language?'累计确诊数':'confirm count'}</MenuItem>
                <MenuItem value={'suspectedCount'}>{language?'疑似病例数':'suspected count'}</MenuItem>
                <MenuItem value={'curedCount'}>{language?'治愈数':'cured count'}</MenuItem>
                <MenuItem value={'deadCount'}>{language?'死亡数':'dead count'}</MenuItem>
            </Select>
        </FormControl>
    )
}

export default SelectBox
