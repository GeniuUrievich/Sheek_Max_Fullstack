import { useState, type ChangeEvent } from "react"
import Button_link from "../Button_link/Button_link"
import { Link, Route, useNavigate } from "react-router-dom"
import axios from "axios"
import { authStore } from "../Store/authStore"
function Registration(){
    const margin =  {
        width: "220px",
        marginTop: "10px",
        marginBottom: "60px"
    }

    const navigate = useNavigate()

    const [password, setpassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [surname, setSurname] = useState<string>("")
    const [phone, setPhone] = useState<string>("")


    const [fl_password, setFl_password] = useState(true)
    const [fl_email, setFl_Email] = useState(true)
    const [fl_surname, setFl_surname] = useState(true)
    const [fl_name, setFl_name] = useState(true)
    const [fl_phone, setFl_phone] = useState(true)
    const [fl, setFl] = useState(false)

    const passwordChange = (event : ChangeEvent<HTMLInputElement>) => {
        setpassword(event.target.value)
    }

    const emailChange = (event : ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const surnameChange = (event : ChangeEvent<HTMLInputElement>) => {
        setSurname(event.target.value)
    }

    const nameChange = (event : ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const phoneChange = (event : ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value)
    }

    const click = () => {
        const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const ispasswordValid = password !== "";
        const isEmailValid = email !== "" && emailRegex.test(email);
        const isSurnameValid = surname !== "";
        const isNameValid = name !== "";
        const isPhoneValid = phone !== "";
        setFl_password(ispasswordValid);
        setFl_Email(isEmailValid);
        setFl_surname(isSurnameValid);
        setFl_name(isNameValid)
        setFl_phone(isPhoneValid)
        const il = !ispasswordValid && !isEmailValid && !isSurnameValid && !isNameValid && !isPhoneValid;
        setFl(il)
        if (!il){
            axios.post("https://localhost:7128/api/Autharizate/Registration",zapros)
            .then(responce => {authStore.login(responce.data.ac); navigate("/");})
            .catch(err => {
                if (err.response?.status === 401) {
                alert("Неверный логин или пароль");
                } else {
                alert("Произошла ошибка при входе");
                }})
            }
        
    }

    const zapros = {
        Email: email,
        Password : password,
        Surname: surname,
        Name: name,
        Phone: phone,
        Role: "role"
    }

    return (
    <>
    <div className={fl ? "form_reg opens_r" : "form_reg"}>
        <h1>Регистрация</h1>
        <div className="form_inputs_login">
            <input className="form_input" type="text" placeholder="Email" value={email} onChange={emailChange}></input>
            {!fl_email ? <div className="form_error">Поле не введено</div> : null}
            <input className="form_input" type="text" placeholder="Password" value={password} onChange={passwordChange}></input>
            {!fl_password ? <div className="form_error">Поле не введено</div> : null}
            <input className="form_input" type="text" placeholder="Фамилия" value={surname} onChange={surnameChange}></input>
            {!fl_surname ? <div className="form_error">Поле не введено</div> : null}
            <input className="form_input" type="text" placeholder="Имя" value={name} onChange={nameChange}></input>
            {!fl_name ? <div className="form_error">Поле не введено</div> : null}
            <input className="form_input" type="text" placeholder="Телефон" value={phone} onChange={phoneChange}></input>
            {!fl_phone ? <div className="form_error">Поле не введено</div> : null}
        </div> 
        <>
        <Button_link click={click} style={margin}>Зарегистрироваться</Button_link>
        <Link  to="/login">Есть аккаунт,войти</Link>
        </>
    </div>  
    </>
    )
}

export default Registration