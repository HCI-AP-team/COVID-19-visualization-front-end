import * as speechcommand from '@tensorflow-models/speech-commands'
const MODEL_PATH = 'http://127.0.0.1:9999/speech'
const c = async () => {
    const rec = speechcommand.create(
        'BROWSER_FFT',//浏览器自带的傅立叶变换
        undefined,
        MODEL_PATH + '/model.json',
        MODEL_PATH + '/metadata.json'
    )//创建识别器

    await rec.ensureModelLoaded();//确保模型加载完成

    let labels = rec.wordLabels()//获得可识别的字符
    labels = labels.slice(2)



    rec.listen(result => {
        const scores = result.scores as unknown as number[];

        let index = scores.indexOf(Math.max(...scores))
        console.log(labels[index])
        return new Promise(() => { });
    },
        {
            overlapFactor: 0.2,//覆盖率
            probabilityThreshold: 0.75//相似度
        })
}
export default c;