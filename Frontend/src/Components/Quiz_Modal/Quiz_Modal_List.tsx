import image from "./../../../public/фото кроссовка.png"


function Quiz_Modal_list(){
    return (
        <div className="modal_list_quiz">
            <img className="photos" src={image} alt="кеды"/>
            <label className="check_box"><input type="checkbox"/><span className="check"></span>кеды</label>
        </div>
    )
}

export default Quiz_Modal_list