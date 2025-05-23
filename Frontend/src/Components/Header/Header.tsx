import { useState } from "react"
import Bascet from "../Bascet/Bascet"
import Button_link from "../Button_link/Button_link"
import image from "./../../../public/Vector (3).svg"
import Zakaz from "../Zakaz/Zakaz"
function Header(){

    const [fl, setFl] = useState<boolean>(false)
    const [isZakazOpen, setIsZakazOpen] = useState<boolean>(false);
    const openBascetAndCloseCard = () => {
    setIsZakazOpen(true);
    setFl(false); // Закрываем Card_open при открытии Bascet
  };
    return (
        <>
            <header>
                    <div className="container">
                        <div className="headers">
                            <h1>SneakMax</h1>
                            <ul className="list">
                                <li className="list_item"><a>Каталог</a></li>
                                <li className="list_item"><a>О нас</a></li>
                                <li className="list_item"><a>Подбор товара</a></li>
                                <li className="list_item"><a>Наша команда</a></li>
                                <li className="list_item"><a>Доставка и оплата</a></li>
                                <li className="list_item"><a>Контакты</a></li>
                                <li className="list_item" onClick={() => setFl(true)}><a>Корзина</a><img src={image}/></li>
                            </ul>
                        </div>
                        <div className="line"></div>
                    </div>
                    {fl === true && (<Bascet closeModal={() => setFl(false)} openBascet={openBascetAndCloseCard}/> )}
                    {isZakazOpen && <Zakaz closeModal={() => setIsZakazOpen(false)} />}    
                </header>
                <section className="first_section">
            <div className="container">
                <div className="text">
                    <h1>Кроссовки известных брендов 
                    с доставкой по России и СНГ</h1>
                    <p>Мы продаем кроссовки брендов Nike, Adidas, Puma, Reebok, Converse и многие другие по низким ценам</p>
                </div>
                <Button_link>Перейти к покупкам</Button_link>
                <h1 className="text_cat">SneakMax</h1>
            </div>
        </section>        
    </>
    )
}

export default Header