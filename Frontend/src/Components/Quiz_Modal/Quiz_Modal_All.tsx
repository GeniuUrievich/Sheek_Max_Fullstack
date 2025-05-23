import type { JSX } from "react"

interface IQuiz{
    step : number,
    mod : JSX.Element,
    clickd : () => void,
    str : string
}

function Quiz_Modal_All({step,mod, clickd, str} : IQuiz){
    return (
        <>
        <h1 className="quiz_text_h1">Мы подберем идеальную пару для вас</h1>
        <h3 className="quiz_text_h3">Ответьте на три вопроса и мы вышлем каталог с самыми подходящими для вас моделями </h3>
        <span className="quiz_line"></span>
        {mod}
        <span className="quiz_line"></span>
        <div className="footer_quiz">
            <h3 className="quiz_text_h4">{step+str}</h3>
            <button className="button_modal" onClick={clickd}>Следующий шаг</button>
        </div>
        </>
    )
}

export default Quiz_Modal_All