import React , { useCallback } from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
function LanguageChoose(props:any) {
    const { language,setLanguage,showHint } = props;

    const setLocal = useCallback((data) => {
        setLanguage(data)
        const language = data ? "1" : "2"
        localStorage.setItem('language', language);
    }, [])

    return (            
    <div style={{ opacity: showHint ? 1 : 0 }}>
        <ButtonGroup color="primary">
            <Button variant={language?'contained':'outlined'} onClick={()=>setLocal(true)}>中文</Button>
            <Button variant={!language?'contained':'outlined'} onClick={()=>setLocal(false)}>English</Button>
        </ButtonGroup>
        </div>
    )
}

export default LanguageChoose
