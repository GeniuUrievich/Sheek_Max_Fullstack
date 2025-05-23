import type { ICard } from "../../Interface/ICard"

interface IZAKC {
    data: ICard
    click: () => void
}

const Zakaz_card = ({data, click} : IZAKC) => {

   

    return (
        <div className="card_zakaz">
            <img className="card_zakaz_photo" src={`http://localhost:5206/${data.photo_Url}`}/>
            <div className="card_zakaz_text">
                <h1 className="card_zakaz_name">{data.name}</h1>
                <h2 className="card_zakaz_price">{data.price}</h2>
            </div>
            <div className="card_btn" onClick={click}>Удалить</div>
        </div>
    )
}

export default Zakaz_card
