import Quiz_Modal_list from "./Quiz_Modal_List"

function Quiz_Modal_1(){
    const gen = [1,2,3,4,5,6]
    return (
        <div className="modal">
            <h2 className="modal_text">Какой тип кроссовок рассматриваете?</h2>
            <div className="modal_list">
                {gen.map((item) => (<Quiz_Modal_list key={item}></Quiz_Modal_list>) )}
            </div>
        </div>
    )
}

export default Quiz_Modal_1