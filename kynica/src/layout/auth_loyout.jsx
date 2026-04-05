import { Outlet } from "react-router-dom"



const AuthLayout = () => {
    return (
        <div className="">
            <main className="main_container">
                <Outlet/>
            </main>
        </div>
    )
}

export default AuthLayout