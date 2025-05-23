import axios from "axios"
import { authStore } from "../Store/authStore"
import { observer } from "mobx-react-lite"

const Footer =observer(() => {

    const loguot = () => {
        axios.post('https://localhost:7128/api/Autharizate/Logout', null, {headers:{Authorization: `Bearer ${localStorage.getItem("acces_token")}`}})
        .then(responce => authStore.logout())
    }

    return (
        <footer>
            <div className="container">
                <div className="footer">
                <h1>SneakMax</h1>
                <nav className="foot_nav">
                    <ul className="foot_nav_list">
                        <li className="foot_nav_item">Каталог</li>
                        <li className="foot_nav_item">О нас</li>
                        <li className="foot_nav_item">Подбоор товара</li>
                        <li className="foot_nav_item">Наша команда</li>
                        <li className="foot_nav_item">Доставка и оплата</li>
                        <li className="foot_nav_item">Контакты</li>
                        {authStore.isAuth ? <li className="foot_nav_item" onClick={()=>loguot()}>Выйти</li>: null}
                    </ul>
                </nav>
                </div>
            </div>
        </footer>
    )
}
)
export default Footer
