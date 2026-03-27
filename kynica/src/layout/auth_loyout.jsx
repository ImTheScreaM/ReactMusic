import { Outlet } from "react-router-dom"



const Auth_layout = () => {
    return (
        <div className="">
            <main className="main_container">
                <Outlet/>
            </main>
        </div>
    )
}

export default Auth_layout