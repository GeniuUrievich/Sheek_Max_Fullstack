
import insta from "./../../../public/1024px-Instagram_logo 1.png"
import image1 from "./../../../public/Rectangle 37.jpg"
import image2 from "./../../../public/Rectangle 39.jpg"
import image3 from "./../../../public/Rectangle 38.jpg"
import image4 from "./../../../public/Rectangle 40.jpg"
import image5 from "./../../../public/Rectangle 41.jpg"
import Button_link from "../Button_link/Button_link"
import { useState, type ChangeEvent } from "react"


const Instagram = () => {

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [activeName, setActiveName] = useState(true)
    const [activePhone, setActivePhone] = useState(true)
    const [fl, setFl] = useState(false)



    const hangleName = (event : ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const hanglePhone = (event : ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value)
    }
 
    const margin = {
        width: "340px"
    }

    const name_val = () => {
        const isNameValid = name !== "";
        const isPhoneValid = phone !== ""
        setActiveName(isNameValid);
        setActivePhone(isPhoneValid)
        const il = !isNameValid && !isPhoneValid
        setFl(il)
    }

    return (
        <section className="sec_8">
            <div className="container">
                <div className="all_sec">
                    <div className={fl ? "form open" : "form"}>
                        <h2 className="form_h2">Есть вопросы?</h2>
                        <p className="form_p">Заполните форму и наш менеджер свяжется с вами</p>
                        <div className="form_inputs">
                            <input className="form_input" type="text" placeholder="Ваше имя" value={name} onChange={hangleName}></input>
                            {!activeName ? <div className="form_error">Поле не введено</div> : null}
                            <input className="form_input" type="text" placeholder="Номер телефона" value={phone} onChange={hanglePhone}></input>
                            {!activePhone ? <div className="form_error">Поле не введено</div> : null}
                        </div>
                        <Button_link click={name_val} style={margin}>Отправить</Button_link>
                    </div>
                    <div className="insta">
                        <img className="insta_title" src={insta}/>
                        <div className="insta_photos">
                            <div className="insta_photo_list">
                                <img className="insta_photo" src={image1}></img>
                                <img className="insta_photo" src={image2}></img>
                            </div>
                            <img className="insta_photo" src={image3}></img>
                            <div className="insta_photo_list">
                                <img className="insta_photo" src={image4}></img>
                                <img className="insta_photo" src={image5}></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Instagram
