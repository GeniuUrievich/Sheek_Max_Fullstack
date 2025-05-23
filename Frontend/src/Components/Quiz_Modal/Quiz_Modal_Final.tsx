import Button_link from "../Button_link/Button_link"
import image from "./../../../public/iPhone 11 Pro.png"
import image1 from "./../../../public/отпр.png"
import { useState, type ChangeEvent } from "react"

interface IresQuiz{
    resetQuiz : () => void
}


function Quiz_Modal_Final({resetQuiz} : IresQuiz){
    const margin =  {
        width: "220px",
        marginTop: "10px",
        marginBottom: "60px"
    }

    const margin1 =  {
        width: "220px",
        marginTop: "10px",
        marginBottom: "60px",
        marginLeft: "250px"
    }

    const [flag, setFlag] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const [fl_name, setFl_Name] = useState(true)
    const [fl_email, setFl_Email] = useState(true)

    const nameChange = (event : ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const emailChange = (event : ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const click = () => {
        const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isNameValid = name !== "";
        const isEmailValid = email !== "" && emailRegex.test(email);
        setFl_Name(isNameValid);
        setFl_Email(isEmailValid);
        if (isNameValid && isEmailValid) {
            setFlag(true);
        }
    }

    const click_close = () => {
    
            setFlag(false)
            resetQuiz()
        
    }

    return (
    <>
        <h2 className="modal_text">Ваша подборка готова!</h2>
        <p className="podbor_text">Оставьте свои контактные данные, чтобы бы мы могли отправить  подготовленный для вас каталог</p>
        <span className="quiz_line_2"></span>
        <div className="contacts_form">
            <h1 className="contacts_form_h1">Получить предложение</h1>
            <p className="contacts_form_p">Получите подборку подходящих для вас моделей на почту</p>
            <div className="contacts_form_labels">
                <input className="contacts_form_pole" placeholder="Ваше имя" value={name} onChange={nameChange}></input>
                {fl_name ? null : <h3 className="eror">Имя должно быть заполнено</h3>}
                <input className="contacts_form_pole" placeholder="E-mail" value={email} onChange={emailChange}></input>
                {fl_email ? null : <h3 className="eror">Поле должно быть заполнено коректно</h3>}
            </div>
            <Button_link style={margin} click={click}>Получить</Button_link>
            <Button_link style={margin1} click={click_close}>Закрыть</Button_link>
        </div>
        {flag ? <><img className="phone" src={image}></img> <img className="phone_plus" src={image1}></img></> : <img className="phone" src={image}></img>}
    </>
    )
}

export default Quiz_Modal_Final