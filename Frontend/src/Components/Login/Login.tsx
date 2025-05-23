import { useState, type ChangeEvent } from "react"
import Button_link from "../Button_link/Button_link"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { authStore } from "../Store/authStore"
function Login(){
    const margin =  {
        width: "220px",
        marginTop: "10px",
        marginBottom: "60px"
    }

    const navigate = useNavigate()
    const [password, setpassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const [fl_password, setFl_password] = useState(true)
    const [fl_email, setFl_Email] = useState(true)
    const [fl, setFl] = useState(false)
    const passwordChange = (event : ChangeEvent<HTMLInputElement>) => {
        setpassword(event.target.value)
    }

    const emailChange = (event : ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const click = () => {
        const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const ispasswordValid = password !== "";
        const isEmailValid = email !== "" && emailRegex.test(email);
        setFl_password(ispasswordValid);
        setFl_Email(isEmailValid);
        const il = !ispasswordValid && !isEmailValid;
        setFl(il)
        if (!il){
            axios.post('https://localhost:7128/api/Autharizate/Login',zapros)
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
        Email:email,
        Password:password
    }



    return (
    <>
    <div className={fl ? "form_login opens" : "form_login"}>
        <h1>Вход</h1>
        <div className="form_inputs_login">
                            <input className="form_input" type="text" placeholder="Email" value={email} onChange={emailChange}></input>
                            {!fl_email ? <div className="form_error">Поле не введено</div> : null}
                            <input className="form_input" type="text" placeholder="Password" value={password} onChange={passwordChange}></input>
                            {!fl_password ? <div className="form_error">Поле не введено</div> : null}
        </div> 
        <>
        <Button_link click={click} style={margin}>Войти</Button_link>
        <Link  to="/Registration">Зарегистрироваться</Link>
        </>
    </div>  
    </>
    )
}

export default Login