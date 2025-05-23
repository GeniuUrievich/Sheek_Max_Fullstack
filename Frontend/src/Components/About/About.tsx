import image from "./../../../public/pexels-budgeron-bach-5158825 2.jpg"
import image1 from "./../../../public/figure.svg"

function About(){
    return (
        <section className="sec_4">
            <img className="sec_4_img"  src={image1}/>
            <div className="container">
                <div className="rasp">
                    <div className="sec_4_text">
                        <h1 className="sec_4_text_h1">Пара слов о нас</h1>
                        <p>Спорт держит нас в форме. Учит дисциплине. Объединяет нас. Через спорт мы можем менять жизни. В том числе с помощью воодушевляющих историй спортсменов. Чтобы помочь тебе подняться и двигаться вперед.</p>
                        <div className="sheck">
                            <span className="lines"></span>
                            <h2>SneakMax</h2>
                        </div>
                    </div>
                    <img className="photo_sec_4" src={image}/>
                </div>
            
            </div>
        </section>
    )
}

export default About