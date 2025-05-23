
import image from "./../../../public/Смотреть товар.png"
import image1 from "./../../../public/Добавить в корзину.png"
import { useState } from "react"
import type { ICard } from "../../Interface/ICard"
import Card_open from "../Card_open/Card_open"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { authStore } from "../Store/authStore"

function Card(data : ICard){

    const [active, setActive] = useState(false)
     const [openedCardId, setOpenedCardId] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const mouse_Enter = () => {
        setActive(true)
    }


    const mouse_leave = () => {
        setActive(false)
    }

    const handleOpenModal = (id: number) => {
       setOpenedCardId(id);
       setIsOpen(true)
      };


    const add_card = (id_z: number) => {
        if (!authStore.isAuth) {
            if (confirm("Для добавления товара нужно авторизоваться. Перейти на страницу входа?")) {
                navigate("/login");
            }
            return;
        }
        const zapros = {
        ProductID: id_z
    }
        axios.post('https://localhost:7128/api/Cart/Add_Product_cart', zapros, {headers:{Authorization: `Bearer ${localStorage.getItem("acces_token")}`}})
        .then()
        .catch(err => console.log(err))
    }


    return (
         <>
        <div className="card">
            <img className={active ? "image_card hover" :"image_card"} src={`http://localhost:5206/${data.photo_Url}`} onMouseEnter={mouse_Enter} onMouseLeave={mouse_leave}/>
            {active ?
            <div className="card_images_hover" onMouseEnter={mouse_Enter} onMouseLeave={mouse_leave} >
                <img className="card_image_hover" src={image}  onClick={() => handleOpenModal(data.id)}></img>
                <img className="card_image_hover" src={image1} onClick={() => add_card(data.id)}></img>
            </div> : null}
            <h1 className="name_card">{data.name}</h1>
            <h2 className="price_card">{data.price} ₽</h2>
        </div>
        {openedCardId !== null && 
        isOpen && (<Card_open id={openedCardId} closemodal={() => setIsOpen(false)}/>
      )}
        </>
    )
}

export default Card
