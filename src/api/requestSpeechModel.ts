import * as speechCommands from '@tensorflow-models/speech-commands';

const PATH = 'http://127.0.0.1:8080';
const c = async (setTransferRec: any,language:string) => {
    const rec = speechCommands.create('BROWSER_FFT')
    await rec.ensureModelLoaded()
    let transferRec: speechCommands.TransferSpeechCommandRecognizer = rec.createTransfer('VoiceHelper')
    let res;
    if(language)
        res = await fetch(PATH+"/Chinese.bin")//下载数据
    else
        res = await fetch(PATH+"/English.bin")

    const arrayBuffer = await res.arrayBuffer()//将数据转化成arrayBuffer

    transferRec.loadExamples(arrayBuffer)//给迁移学习期加载数据

    //console.log(transferRec.countExamples())//查看数据

    await transferRec.train({
        epochs: 30
    })//训练数据
    //console.log('training finish')
    setTransferRec(transferRec)
}
export default c;
