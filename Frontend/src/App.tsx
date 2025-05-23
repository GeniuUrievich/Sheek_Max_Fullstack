
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "./Components/Body"
import Footer from "./Components/Footer/Footer"
import Header from "./Components/Header/Header"
import "./style.css"
import Login from "./Components/Login/Login"
import Registration from "./Components/Registration/Registration"
import { observer } from "mobx-react-lite"

const App = observer(() =>{
return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Main />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/Registration" element={<Registration/>}></Route>
        <Route path="*" element={<h2>404: Страница не найдена</h2>} />
      </Routes>
    </BrowserRouter>
  )
})

export default App
