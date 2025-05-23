import { useState } from "react"
import type { ICard } from "../../Interface/ICard"

interface IZ{
    data: ICard,
    click: (id_z:number)=>void
}

const Bascet_card = ({data, click} : IZ) => {

    const [hover, setHover] = useState(false)

    const mouse_Enter = () => {
        setHover(true)
    }

    const mouse_leave = () => {
        setHover(false)
    }
    return (
        <div className={hover ? "card_bascet hover_2" : "card_bascet"} onMouseEnter={mouse_Enter} onMouseLeave={mouse_leave}>
            <img className="card_bascet_photo" src={`http://localhost:5206/${data.photo_Url}`}/>
            <div className="card_bascet_text">
                <h1 className="card_bascet_name">{data.name}</h1>
                <h2 className="card_bascet_price">{data.price}</h2>
            </div>
            <button className="card_delete" onClick={() => click(data.id)}></button>
        </div>
    )
}

export default Bascet_card
