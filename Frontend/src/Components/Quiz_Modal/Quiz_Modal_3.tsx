import { useState, type ChangeEvent } from "react"

function Quiz_Modal_3(){
    const [text, setText] = useState<string>()

    const handleText = (event  : ChangeEvent<HTMLInputElement>)=>{
        setText(event.target.value)
    }

    return (
    <>
        <h2 className="modal_text">Уточните какие-либо моменты</h2>
        <textarea className="modal_input_text" value={text} onChange={() => handleText} placeholder="Введите сообщение"></textarea>
    </>
    )
}

export default Quiz_Modal_3