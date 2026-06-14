import {observer} from "mobx-react-lite";
import {use_auth_store} from "../../hook/hooks";
import {NavLink} from "react-router-dom";

const ProtectedRouter = observer(({children}) => {
    const {isAuth,isLoading} = use_auth_store()

    if(isLoading) {
        return <div>Загрузка...</div>
    }

    if(!isAuth) {
        return (
            <div className="protected_router grid items-center gap-4">
                <span className="text-4xl">You don't can join to this page. Please register</span>
                <NavLink className="text-2xl" to={"/auth/register"}>
                    <span>Register</span>
                </NavLink>
            </div>
        )
    }
    return children
})

export default ProtectedRouter;
