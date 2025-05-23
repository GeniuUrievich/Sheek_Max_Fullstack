
import image from "./../../../public/фигура.png"
import image1 from "./../../../public/фигура (1).png"
import Team_List from "./Team_list.ts"
import Card_people from "./Card_people.tsx"

function Team(){
    return (
        <section className="sec_6">
            <img className="figure_first" src={image}/>
            <img className="figure_first" src={image1}/>
            <div className="container">
               <div className="team">
                    <h1 className="team_h1">Наша команда</h1>
                    <div className="team_list">
                        {Team_List.map((card) => <Card_people img={card.img} name={card.name} role={card.role}></Card_people>)}  
                    </div>
               </div>
            </div>
        </section>
    )
}

export default Team
