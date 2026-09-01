import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../assets/css/auth_guard.css";

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

  if (!showModal) return null;

  return (
    <div className={`auth_guard_container`}>
      <div className="auth_guard_context">
        <div className="auth_guard_title">Вы не зарегестрированы.</div>
        <div className="auth_guard_btn">
          <button
            className="auth_guard_login"
            onClick={() => navigate("/auth/register")}
          >
            Войти
          </button>
          <button
            className="auth_guard_close"
            onClick={() => setShowModal(false)}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
