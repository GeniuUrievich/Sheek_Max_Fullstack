
import FAQ_item from "./FAQ_item.tsx"

function FAQ(){
    return (
        <section className="sec_7_1">
            <div className="container">
                <div className="FAQ">
                    <h1 className="FAQ_h1">Часто задаваемые вопросы</h1>
                    <ul className="FAQ_sec">
                        <FAQ_item>1</FAQ_item>
                        <FAQ_item>2</FAQ_item>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default FAQ
