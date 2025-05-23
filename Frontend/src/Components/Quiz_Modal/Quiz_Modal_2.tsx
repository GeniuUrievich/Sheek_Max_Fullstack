import image from "./../../../public/Rectangle 45.png"

function Quiz_Modal_2(){
    const width = {width: "180px"}
    return (
        <>
        <h2 className="modal_text">Какой тип кроссовок рассматриваете?</h2>
        <div className="line_checbox">
            <label className="check_box" style={width}><input type="checkbox"/><span className="check"></span>менее 36</label>
            <label className="check_box" style={width}><input type="checkbox"/><span className="check"></span>36-38</label>
            <label className="check_box" style={width}><input type="checkbox"/><span className="check"></span>39-41</label>
            <label className="check_box" style={width}><input type="checkbox"/><span className="check"></span>42-44</label>
            <label className="check_box" style={width}><input type="checkbox"/><span className="check"></span>45 и больше</label>
        </div>
        <img className="quiz_photo" src={image}></img>
        </>
    )
}

export default Quiz_Modal_2