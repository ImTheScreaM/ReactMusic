import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../hook/hooks";

const ProtectedRouter = observer(({ children }) => {
  const { isAuth, isLoading } = useAuthStore();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!isAuth) {
    return (
      <div className="protected_router grid items-center gap-4">
        <span className="text-4xl">
          You don't can join to this page. Please register
        </span>
        <NavLink className="text-2xl" to={"/auth/register"}>
          <span>Register</span>
        </NavLink>
      </div>
    );
  }
  return children;
});

export default ProtectedRouter;
