import { Navigate } from "react-router-dom"
import { useAuth } from "./authContext"
import auth_store from "../stores/auth_store.ts"
import {useEffect} from "react"
const ProtectedRouter = ({children}) => {
    const isAuth = auth_store.isAuth
    
    console.log(isAuth);
    

    if(!isAuth) {
        return <Navigate to='/' replace/>
    }

    return children
}

export default ProtectedRouter;
