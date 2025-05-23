
import Card from "./../Card/Card";
import Button_link from "../Button_link/Button_link";
import type { ICard_List } from "../../Interface/ICard_List";
import { useState } from "react";



const Card_List: React.FC<ICard_List> =  ({items}) => {
    const margin =  {
        marginLeft: "320px",
        width: "200px",
        marginTop: "40px",
        marginBottom: "60px"
    }

    const i = Boolean(items && items.length > 9)
    const [fl, setFlag] = useState<boolean>(i)
    
    console.log(items)

    return(
        <div className="cards_list">
            {items && items?.length > 0 ? 
            <>
                <div className="Card_list">
                    {fl ? items?.slice(0, 9).map((card) => (
                            <Card
                                key={card.id}
                                name={card.name}
                                photo_Url={card.photo_Url}
                                price={card.price}
                                id={card.id}
                                size={card.size}
                                color={card.color}
                                remains={card.remains}
                            />
                            ))
                        : items?.map((card) => (
                            <Card
                                key={card.id}
                                name={card.name}
                                photo_Url={card.photo_Url}
                                price={card.price}
                                id={card.id}
                                size={card.size}
                                color={card.color}
                                remains={card.remains}
                            />
                            ))
                        }
                </div>
                {items && items.length < 9 ? <></> : <Button_link style={margin} click={() => setFlag(!fl)}>{fl ? "Показать еще" : "Скрыть"}</Button_link>}
            </> : <h1 className="tovarov_net">Товаров нет</h1>}
        </div>
        
    )
}

export default Card_List