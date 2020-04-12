import React from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
function LanguageChoose(props:any) {
    const { language,setLanguage,showHint } = props;
    return (            
    <div style={{ opacity: showHint ? 1 : 0 }}>
        <ButtonGroup color="primary">
            <Button variant={language?'contained':'outlined'} onClick={()=>setLanguage(true)}>中文</Button>
            <Button variant={!language?'contained':'outlined'} onClick={()=>setLanguage(false)}>English</Button>
        </ButtonGroup>
        </div>
    )
}

export default LanguageChoose
