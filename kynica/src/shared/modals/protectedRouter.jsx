import auth_store from "../stores/auth_store.ts"

import { Navigate } from "react-router-dom"
import {observer} from "mobx-react-lite";

const ProtectedRouter = observer(({children}) => {
    const isAuth = auth_store.isAuth
    const isLoading = auth_store.isLoading;

    if(isLoading) {
        return <div>Загрузка...</div>
    }

    if(!isAuth) {
        return <Navigate to='/' replace/>
    }
    return children
})

export default ProtectedRouter;
