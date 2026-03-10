import { Outlet } from "react-router-dom"
import Header from "../components/limbs/header/Header"
import "../assets/css/layout.css"


const Layout = () => {
    return (
        <div className="app">
            <Header/>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default Layout