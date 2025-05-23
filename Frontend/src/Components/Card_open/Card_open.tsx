
import Button_link from "./../Button_link/Button_link"
import star from "./../../../public/Star 1.svg"
import galka from "./../../../public/Vector (2).svg"
import axios from "axios"
import { useEffect, useState } from "react"

interface IDa {
    id: Number
    closemodal: ()=>void
}

interface ICard_open {
    id : number,
    name : string,
    photo_Url : string,
    price : number,
    size : number
    color : string,
    remains : number,
    sex: string
}

const Card_open = ({id, closemodal} : IDa) => {

    const size_button = {
        width: "450px"        
    }

    const [data, setData] = useState<ICard_open>()

    useEffect(() => {
        axios.get(`https://localhost:7128/api/Product/Get_Product?id=${id}`).then(responce => setData(responce.data))
    }, [])

    const add_cart = (id_z:number) => {
        const zapros = {
        ProductID: id_z
    }
        axios.post('https://localhost:7128/api/Cart/Add_Product_cart', zapros, {headers:{Authorization: `Bearer ${localStorage.getItem("acces_token")}`}})
        .then()
        .catch(err => console.log(err))
        console.log(id_z)
    }

    return (
        <div className="card_open" onClick={closemodal}>
            <div className="card_open_content" onClick={(e) => e.stopPropagation()}>
                <div className="card_open_source">
                    <div className="card_open_priev">
                        <img src={`http://localhost:5206/${data?.photo_Url}`} className="card_open_img"/>
                        <ul className="card_open_photos">
                            <li><img src={`http://localhost:5206/${data?.photo_Url}`} className="card_open_img_li"/></li>
                            <li><img src={`http://localhost:5206/${data?.photo_Url}`} className="card_open_img_li"/></li>
                            <li><img src={`http://localhost:5206/${data?.photo_Url}`} className="card_open_img_li"/></li>
                            <li><img src={`http://localhost:5206/${data?.photo_Url}`} className="card_open_img_li"/></li>
                            <li><img src={`http://localhost:5206/${data?.photo_Url}`} className="card_open_img_li"/></li>
                            <li><img src={`http://localhost:5206/${data?.photo_Url}`} className="card_open_img_li"/></li>
                        </ul>
                    </div>
                    <div className="card_open_info">
                        <div className="info_base">
                            <h4 className="info_base_h4">В наличии: <span>{data?.remains + " шт"}</span> </h4>
                            <button className="btn_close" onClick={closemodal}><span></span></button>
                        </div>
                        <h1 className="card_open_name">{data?.name}</h1>
                        <div className="rating">
                            <img src={star}/>
                            <img src={star}/>
                            <img src={star}/>
                            <img src={star}/>
                            <img src={star}/>
                        </div>
                        <div className="text_size">Размер</div>
                        <ul className="change_size">
                            <li><div className="size_item">{data?.size}</div></li>
                        </ul>
                        <div className="card_open_price">{data?.price}</div>
                        <Button_link style={size_button} click={() => add_cart(data.id)}>Добавить в корзину</Button_link>
                        <ul className="condition">
                            <li className="condition_item">
                                <img className="condition_img" src={galka}/>
                                <h6 className="condition_h6">Бесплатная доставка до двери</h6>
                            </li>
                            <li className="condition_item">
                                <img className="condition_img" src={galka}/>
                                <h6 className="condition_h6">Оплата заказа при получении</h6>
                            </li>
                            <li className="condition_item">
                                <img className="condition_img" src={galka}/>
                                <h6 className="condition_h6">Обмен в течении двух недель</h6>
                            </li>
                        </ul>
                        <ul className="specifications">
                            <div className="specifications_h3">Характеристики</div>
                            <li className="specifications_item">{"Пол: " + data?.sex}</li>
                            <li className="specifications_item">{"Цвета: " + data?.color}</li>
                        </ul>
                    </div>
                </div>
                <div className="hz"></div>
            </div>
        </div>
    );
}

export default Card_open
