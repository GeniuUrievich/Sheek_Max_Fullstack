import { useEffect, useState, type ChangeEvent } from "react"
import Button_filter from "../Button_filter/Button_filter";
import Card_List from "../Card_List/Card_List";
import axios from 'axios';


function Catalog_form(){

    const [updata, setUpdata] = useState()

    useEffect(()=>{
        const fetch_handle = async () =>{
            try{
                const responce = await axios.get('https://localhost:7128/api/Product/Get_All_Product')
                setUpdata(responce.data)
                console.log(updata)
            }
            catch(er){
                console.log(er)
            }
        }
        fetch_handle()
    }, [])
     
    
    const [minValue, setMinValue] = useState(500)
    const [maxValue, setMaxValue] = useState(100000)
    const [checkd, setCheckd] = useState({
        Мужской : false,
        Женский : false
    })
    const rows: number[][] = [
        [35, 36, 37],
        [38, 39, 40],
        [41, 42, 43],
      ];
      const [activeCell, setactiveCell] = useState<boolean[][]>([[false, false,false],
        [false, false,false],
        [false, false,false]])
    const changemin = (event : ChangeEvent<HTMLInputElement>) =>{
        const value = parseInt(event.target.value,10)
        if (value < maxValue){setMinValue(value)}    }
    const changemax = (event: ChangeEvent<HTMLInputElement>) =>{
        const value = parseInt(event.target.value,10)
        if (value > minValue){setMaxValue(value)}}
     const handleChangeSex = (event: ChangeEvent<HTMLInputElement>) =>{
        const {name, checked} = event.target;
        setCheckd((prev) => ({
            ...prev,
            [name] : checked
        }))
    }
    const handleV = (rowIn:number, cellIn:number) => {
        setactiveCell((prev: boolean[][]) => {
        const updated: boolean[][] = prev.map((row, rowIndex:number) =>
            row.map((cell, cellIndex:number) =>
                rowIndex === rowIn && cellIndex === cellIn ? !cell : cell
            )
        );
        return updated;
    })};

        

    const filter_click = async () => {
        const gender = []
        const sizes : number[] = []
        if (checkd.Женский){gender.push("Женский")}
        if(checkd.Мужской){gender.push("Мужской")}
        activeCell.forEach((row, rowIndex) =>{
            row.forEach((cell, cellIndex) =>{
                if (cell){
                    sizes.push(rows[rowIndex][cellIndex])
                }
            })
        })
        const new_filters = {
            price: {min: minValue, max: maxValue},
            sex: gender,
            sizes: sizes
        }
        //'https://localhost:7128/api/Product/Get_All_Product'
        try{
            const responce = await axios.post('https://localhost:7128/api/Product/Get_Filter_Product', new_filters)
            setUpdata(responce.data)
        }
        catch (er){
            console.error(er)
        }
    }

    const filter_del = async () => {
        setMinValue(500),
        setMaxValue(100000),
        setactiveCell((prev) => {
            const updated = prev.map((row) =>
                row.map((cell) =>
                    cell = false
                )
            );
            return updated;
        })
        setCheckd((prev) => ({
            ...prev,
            мужской : false,
            женский : false
        }))
        try{
            const responce = await axios.get('https://localhost:7128/api/Product/Get_All_Product')
            setUpdata(responce.data)
        }
        catch (er){
            console.error(er)
        }
    }

    return(
        <>
        <div className="catalog_form">
            <div className="form_text">Подбор по параметрам</div>
            <div className="catalog_price">
                <h3>Цена, руб</h3>
                <div className="cat_pr_in">
                    <input type="text" className="cat_pr_in_pole" value = {minValue} onChange={changemin} ></input>
                    <input type="text" className="cat_pr_in_pole" value = {maxValue} onChange={changemax}></input>  
                </div>
                <div className="range-slider">
                    <div className="slider-track"></div>
                    <input type="range" id="sliderMin" min={500} max={49999} step="1" value={minValue} onInput={changemin}/>
                    <input type="range" id="sliderMax" min={50000} max={99999} step="1" value={maxValue} onInput={changemax}/>
                </div>
            </div>
            <div className="list_sex">
                <h3>Пол</h3>
                <div className="checkbox">
                    <label className="check_box"><input type="checkbox" name={"Мужской"} checked={checkd.Мужской} onChange={handleChangeSex}/><span className="check"></span>мужской</label>
                    <label className="check_box"><input type="checkbox" name={"Женский"} checked={checkd.Женский} onChange={handleChangeSex}/><span className="check"></span>женский</label>
                </div>
            <div className="table_size">
                <h3>Размер</h3>
                <table className="table_list">
                    <tbody>
                        {rows.map((row, rowIndex)=>{
                            return (<tr className="table_row" key={rowIndex}>
                                {row.map((cell, cellIndex) => {
                                    return (
                                        <td key={cellIndex} className={activeCell[rowIndex][cellIndex] ? "table_item active" : "table_item"} onClick={()=>(handleV(rowIndex, cellIndex))}>{cell}</td>
                                    )
                                } )}
                            </tr>
                        )})}
                    </tbody>
                </table>
            </div>
            <Button_filter onClick={filter_click}>Применить</Button_filter>
            <button className="ref" onClick={filter_del}>сбросить</button>
            </div>  
         </div>
         <Card_List items = {updata}></Card_List>
         </>
    )
}

export default Catalog_form
