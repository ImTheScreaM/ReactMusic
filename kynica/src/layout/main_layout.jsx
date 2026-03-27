import { Outlet } from "react-router-dom"
import Header from "../features/pages/header/header"

import "../assets/css/main_layout.css"


const Main_layout = () => {
    return (
        <div className="main_layout">
            <div className="main_layout-header">
                <Header/>
            </div>
            <main className="main_layout-content">
                <Outlet/>
            </main>
        </div>
    )
}

export default Main_layout