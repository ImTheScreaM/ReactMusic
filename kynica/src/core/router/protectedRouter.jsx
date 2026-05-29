import {Navigate} from "react-router-dom"
import {observer} from "mobx-react-lite";
import {use_auth_store} from "../../hook/hooks";

const ProtectedRouter = observer(({children}) => {
    const {isAuth,isLoading} = use_auth_store()

    if(isLoading) {
        return <div>Загрузка...</div>
    }

    if(!isAuth) {
        return <Navigate to='/' replace/>
    }
    return children
})

export default ProtectedRouter;
