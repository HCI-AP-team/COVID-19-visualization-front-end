import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GetVoiceHelper from '../api/requestSpeechModel';
import Switch from '@material-ui/core/Switch';
import { DialogActions, DialogContent, DialogTitle, Button, DialogContentText, Dialog, LinearProgress } from '@material-ui/core';
const useStyle = makeStyles({
    root: {
        position: 'absolute',
        left: '10px',
        bottom: '10px',
        backgroundColor: 'white'
    },
})
function VoiceHelper(props: any) {
    const classes = useStyle();
    const { language } = props
    const [on, setOn] = useState(false)//语音助手开关
    const [open, setOpen] = useState(false)//警告框显示
    const [transferRec, setTransferRec] = useState();//模型迁移器
    // 下面这些是用于进度条的
    const [completed, setCompleted] = useState(0);
    const [buffer, setBuffer] = useState(10);
    const [load, setLoad] = useState(false)
    const progress = React.useRef(() => { });

    const handleChange = async () => {
        setOn(!on);//异步更改开关状态

        if (!on)//打开对话框(因为on是异步修改的,这里还是以前的值,需要做一个反转)
            setOpen(true)

        // 和上面是反过来的,关闭用户监听
        if (on)
            transferRec.stopListening();

    }
    //点击关闭的操作
    const handleClose = () => {
        setOpen(false);
        setOn(false);
        setLoad(false);
    }

    //如果用户选择使用
    const handleLoading = () => {
        setLoad(true)
        //吧加载操作放置在宏任务队列末尾去阻塞任务队列, 避免进度条秒出秒关
        setTimeout(async () => {
            await GetVoiceHelper(setTransferRec, language);
            setLoad(false);
            setOpen(false);
        }, 0)
    }
    //开始监听用户语音
    const startListen = async () => {
        await transferRec.listen((result: any) => {
            const { scores } = result;//结果分数
            const label = transferRec.wordLabels();//获得可识别列表
            const index = scores.indexOf(Math.max(...scores))//获得最大值索引
            const res = label[index] //这里存着结果,上翻页或者下翻页
            //console.log(res)
            if (window.scrollY < window.innerHeight) {
                if (res === "down") {
                    window.scrollTo({ top: window.innerHeight * 1, behavior: 'smooth' })
                }
                if (res === "up") {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                }
            }
            if (window.scrollY >= window.innerHeight && window.scrollY < window.innerHeight * 2) {
                if (res === "down") {
                    window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' })
                }
                if (res === "up") {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                }
            }
            if (window.scrollY >= window.innerHeight * 2 && window.scrollY < window.innerHeight * 3) {
                if (res === "down") {
                    window.scrollTo({ top: window.innerHeight * 3, behavior: 'smooth' })
                }
                if (res === "up") {
                    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
                }
            }
            if (window.scrollY >= window.innerHeight * 3 && window.scrollY < window.innerHeight * 4) {
                if (res === "down") {
                    window.scrollTo({ top: window.innerHeight * 4, behavior: 'smooth' })
                }
                if (res === "up") {
                    window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' })
                }
            }
            if (window.scrollY >= window.innerHeight * 4 && window.scrollY < window.innerHeight * 5) {
                if (res === "down") {
                    window.scrollTo({ top: window.innerHeight * 5, behavior: 'smooth' })
                }
                if (res === "up") {
                    window.scrollTo({ top: window.innerHeight * 3, behavior: 'smooth' })
                }
            }
            if (window.scrollY === window.innerHeight * 5) {
                if (res === "down") {
                    window.scrollTo({ top: window.innerHeight * 5, behavior: 'smooth' })
                }
                if (res === "up") {
                    window.scrollTo({ top: window.innerHeight * 4, behavior: 'smooth' })
                }
            }

        }, {
            overlapFactor: 0.01,
            probabilityTHreshold: 0.75
        })
    }
    //切换语言自动关闭语音助手
    useEffect(() => {
        if (transferRec) {
            handleChange();
            handleClose();
        }
    }, [language])
    useEffect(() => {
        //如果训练了模型就开始监听
        if (transferRec) {
            startListen()
        }
    }, [transferRec]);

    useEffect(() => {
        progress.current = () => {
            if (completed > 100) {
                setCompleted(0);
                setBuffer(10);
            } else {
                const diff = Math.random() * 10;
                const diff2 = Math.random() * 10;
                setCompleted(completed + diff);
                setBuffer(completed + diff + diff2);
            }
        };
    });

    useEffect(() => {
        function tick() {
            progress.current();
        }
        if (load) {
            const timer = setInterval(tick, 500);

            return () => {
                clearInterval(timer);
            };
        }
    }, [load]);
    return (
        <>
            <FormControlLabel
                className={classes.root}

                control={<Switch checked={on} onChange={handleChange} name="voiceHelper" />}
                label={language ? "语音翻页" : "voice helper"}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{
                    load ?
                        language ? "模型训练中" : 'Model training'
                        :
                        language ? "注意" : "Attention"
                }
                </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ display: `${!load ? 'block' : 'none'}` }} id="alert-dialog-description">
                        {language ? "可能需要较长的时间加载" : "it will cost a long time to load"}
                    </DialogContentText>
                    <DialogContentText style={{ display: `${load ? 'block' : 'none'}` }} id="alert-dialog-description">
                        {language ? `操作提示:` : "Hint:"}
                    </DialogContentText>
                    <DialogContentText style={{ display: `${load ? 'block' : 'none'}` }} id="alert-dialog-description">
                        {language ? `说“上”跳转到上一个页面` : "say 'up' to go to upper page"}
                    </DialogContentText>
                    <DialogContentText style={{ display: `${load ? 'block' : 'none'}` }} id="alert-dialog-description">
                        {language ? `说“下”跳转到下一个页面` : "say 'down' to go to lower page"}
                    </DialogContentText>
                    <DialogContentText style={{ display: `${load ? 'block' : 'none'}`, fontSize: "12px" }} id="alert-dialog-description">
                        {language ? `首次加载可能用时 2 到 3 分钟` : "The first load may take two to three minutes."}
                    </DialogContentText>
                    <DialogContentText style={{ display: `${load ? 'block' : 'none'}`, fontSize: "12px" }} id="alert-dialog-description">
                        {language ? `加载完会自动关闭这个窗口` : "This window will automatically close after loading."}
                    </DialogContentText>
                    <DialogContentText style={{ display: `${load ? 'block' : 'none'}`, fontSize: "10px" }} id="alert-dialog-description">
                        {language ? `由于开发时间有限,准确度可能不是太高` : "Accuracy may not be too high due to limited developed time."}
                    </DialogContentText>
                    <DialogContentText style={{ display: `${load ? 'block' : 'none'}`, fontSize: "10px" }} id="alert-dialog-description">
                        {language ? `请在噪音较小的地方使用这个功能` : "Please use this function without noise"}
                    </DialogContentText>
                    <LinearProgress style={{ display: `${load ? 'block' : 'none'}` }} variant="buffer" value={completed} valueBuffer={buffer} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={load} color="secondary">
                        {language ? "算了" : 'Disagree'}
                    </Button>
                    <Button onClick={handleLoading} disabled={load} color="primary" autoFocus>
                        {language ? "等待加载" : 'Waiting for loading'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default VoiceHelper;
