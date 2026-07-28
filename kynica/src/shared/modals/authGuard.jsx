import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthGuard = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnauthorized = () => {
      setShowModal(true);
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, []);

  const handleLogin = () => {
    navigate("/auth/login");
  };

  if (!showModal) return null;

  return (
    <div>
      <div>Вы не зарегестрированы.</div>
      <div>
        <button onClick={handleLogin}>Войти</button>
        <button onClick={() => setShowModal(false)}>Закрыть</button>
      </div>
    </div>
  );
};
