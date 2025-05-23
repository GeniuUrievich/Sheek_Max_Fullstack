import { useState, useEffect, type ChangeEvent } from "react"
import Zakaz_card from "./Zakaz_card.tsx"
import Button_link from "./../Button_link/Button_link"
import axios from "axios"
import type { ICard } from "../../Interface/ICard.ts"

interface IZak{
    closeModal: ()=>void
}

const Zakaz = ({closeModal} : IZak) => {
    const [final_price, setFinal_price] = useState(0)
    const [active, setActive] = useState(false)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [check_name, setCheck_name] = useState(true)
    const [check_phone, setCheck_phone] = useState(true)
    const [check_email, setCheck_email] = useState(true)
    const [bascet, setBascet] = useState<ICard[]>()


    const handleName = (event :ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const handlePhone = (event :ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value)
    }

    const handleEmail = (event :ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    let numb = "0000 00"
    

    useEffect(()=>{
        axios.get('https://localhost:7128/api/Cart/Get_Cart', {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("acces_token")}`
            }
        }).then(responce => {console.log(responce.data); setBascet(responce.data)})
    }, [])

    const handleCLick = () => {
        setActive(!active)
        console.log("1")
    }


    const style = {
        width: "211px",
        marginTop: "29px",
        position: "relative",        
    }

    const handleDel = (id_z: number) => {
        const zapros = {
        ProductID:id_z
    }
        axios.post( 'https://localhost:7128/api/Cart/Delete_Product_Cart', zapros,  {headers:{Authorization: `Bearer ${localStorage.getItem("acces_token")}`}})
        .then(responce => setBascet(responce.data))
        .catch(err => console.log(err))
    }

    const check_validation = () => {
        const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const regex = /^[0-9]+$/;
        if (name !== "") {
            setCheck_name(true)
        } else {setCheck_name(false)}

        if (phone !== "" && regex.test(phone)){setCheck_phone(true)}
        else {setCheck_phone(false)} 

        if (email !== "" && emailRegex.test(email)){
            setCheck_email(true)
        }else(setCheck_email(false))
        
    }

    useEffect(() => {
            let total=0;
            bascet?.forEach((card) => total +=card.price)
            setFinal_price(total)
        }, [bascet])

    return (
        <div className="zakaz" onClick={closeModal}>
            <div className="zakaz_modal" onClick={(e) => e.stopPropagation()}>
                <div className="zakaz_modal_title">
                    <h1 className="zakaz_modal_name">Оформление заказа</h1>
                    <h2 className="zakaz_modal_number">{"Заказ " + numb}</h2>
                </div>
                <div className="zakaz_modal_bascet">
                    <div className="count_products_price">Товаров в заказе:<span>{bascet?.length + " шт"}</span></div>
                    <div className="count_products_price">Общая сумма заказа:<span>{final_price +  " ₽"}</span></div>
                    <div className="spisok_open">Состав заказа<button onClick={handleCLick} className={active ? "spisok_open_btn" : "spisok_open_btn active"}/></div>
                    {active ? 
                    <ul>
                        <li>{bascet?.map((card) => <Zakaz_card data={card} click={() => handleDel(card.id)}></Zakaz_card>)}</li>
                    </ul> : null}
                </div>
                <div className="zakaz_modal_form">
                    <input placeholder="Ваше имя" className="zakaz_modal_input" value={name} onChange={handleName}></input>
                    {!check_name ? <h1 className="error_card">Имя не заполнено</h1>: null}
                    <input placeholder="Номер телефона" className="zakaz_modal_input" value={phone} onChange={handlePhone}></input>
                    {!check_phone ? <h1 className="error_card">Телефон не заполнен или заполен не верно</h1>: null}
                    <input placeholder="E-mail" className="zakaz_modal_input" value={email} onChange={handleEmail}></input>
                    {!check_email ? <h1 className="error_card">Почта не заполнена или заполена не верно</h1>: null}
                </div>
                <Button_link style={style} click={check_validation}>Оформить заказ</Button_link>
            </div>
        </div>
    )
}

export default Zakaz
