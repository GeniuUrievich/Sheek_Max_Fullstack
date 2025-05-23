
import image from "./../../../public/Property 1=default.svg"
import im_vk from "./../../../public/VK.svg"
import im_in from "./../../../public/Instagram.svg"
import YMap from "./YMap.tsx"
import {useState } from "react"

function Contacts() {

    const [active, setActive] = useState(false)

    const handlerMouse = () => {
        setActive(true)
    }

    const handlerMouse_or = () => {
        setActive(false)
    }

    return (
        <section className="sec_7">
            <div className="container">
                <div className="contacts">
                    <div className="contact_text">
                        <h1 className="contacts_h1">Контакты</h1>
                        <div className="foto">
                            <h4 className="contacts_h4">Главный офис</h4>
                            <img className="con_foto" src={image} onMouseEnter={handlerMouse} onMouseLeave={handlerMouse_or}/>
                            {active ? <div className="Prep">Адрес и телефон для корреспонденции, инвесторов. Вопросы о доставке, качестве обслуживания и товара просьба задавать в отдел продаж</div> : null}
                        </div>
                        <div className="phone_contact">+7 800 789 89 89</div>
                        <div className="adress">г. Санкт-Петербург, Комсомольская, 43 к1</div>
                        <h4 className="contacts_h4">Отдел продаж</h4>
                        <div className="phone_contact">+7 800 789 89 89</div>
                        <div className="adress">г. Санкт-Петербург, Комсомольская, 43 к1</div>
                        <div className="social">
                            <img className="social_photo" src={im_vk}></img>
                            <img className="social_photo" src={im_in}></img>
                        </div>
                    </div>
                    <YMap></YMap>
                </div>
            </div>
        </section>
    )
}

export default Contacts
