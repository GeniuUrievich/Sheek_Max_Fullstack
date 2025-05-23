import { useEffect, useState } from "react";
import Bascet_card from "./Bascet_card.tsx";
import Button_link from "../Button_link/Button_link";
import axios from "axios";
import type { ICard } from "../../Interface/ICard";
import { authStore } from "../Store/authStore.ts";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
interface BascetProps {
  closeModal: () => void;
  openBascet: () => void
}

const Bascet =observer(({ closeModal, openBascet }: BascetProps) => {
    const [final_price, setFinal_price] = useState(0)

    
    const navigate = useNavigate()

    const [bascet, setBascet] = useState<ICard[]>()

    const style = {
        marginLeft: "200px",
        marginTop: "20px"
    }
    const style1 = {
        marginLeft: "120px",
        marginTop: "150px"
    }

    useEffect(()=>{
        axios.get('https://localhost:7128/api/Cart/Get_Cart', {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("acces_token")}`
            }
        }).then(responce => {setBascet(responce.data)})
    }, [])

    const datacount = bascet?.length > 0
    
    const handleDel = (id_z: number) => {
        const zapros = {
        ProductID:id_z
    }
        axios.post( 'https://localhost:7128/api/Cart/Delete_Product_Cart', zapros,  {headers:{Authorization: `Bearer ${localStorage.getItem("acces_token")}`}})
        .then(responce => setBascet(responce.data))
        .catch(err => console.log(err))
    }
    useEffect(() => {
        let total=0;
        bascet?.forEach((card) => total += card.price)
        setFinal_price(total)
    }, [bascet])

    return(
        <div className="bascet" onClick={closeModal}>
            <div className="bascet_content" onClick={(e) => e.stopPropagation()}>
                {authStore.isAuth ? (
                            <>
                                <div className="bascet_block">
                                {datacount ? (
                                    bascet?.map((card) => (
                                    <Bascet_card key={card.id} data={card} click={handleDel} />
                                    ))
                                ) : (
                                    <h1 className="bascet_null">Корзина пуста</h1>
                                )}
                                </div>

                                {datacount ? (
                                <div className="bascet_block_2">
                                    <div className="bascet_price">
                                    <h1 className="bascet_price_title">Итого:</h1>
                                    <h2 className="bascet_price_body">{final_price}</h2>
                                    </div>
                                    <Button_link style={style} click={openBascet}>
                                    Перейти к заказу
                                    </Button_link>
                                </div>
                                ) : null}
                            </>
                            ) : (
                            <Button_link style={style1} click={() => navigate("/Login")}>Авторизуйтесь</Button_link>
                            )}
            </div>
        </div>
    )
})

export default Bascet
