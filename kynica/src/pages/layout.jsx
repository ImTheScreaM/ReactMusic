import { Outlet } from "react-router-dom"
import Header from "../components/limbs/header/Header"

const Layout = () => {
    return (
        <div className="app">
            <Header/>
            <main className="main_container">
                <Outlet/>
            </main>
        </div>
    )
}

export default Layout