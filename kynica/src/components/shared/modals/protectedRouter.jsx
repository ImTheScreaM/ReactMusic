import { Navigate } from "react-router-dom"
import { useAuth } from "./authContext"

const ProtectedRouter = ({children}) => {
    const {isAuth} = useAuth()

    if(!isAuth) {
        return <Navigate to='/' replace/>
    }

    return children
}

export default ProtectedRouter;
