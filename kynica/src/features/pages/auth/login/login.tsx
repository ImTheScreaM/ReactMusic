import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useRootContext } from "../../../../shared/di/rootStoreContext.tsx";

import "../../../../assets/css/auth.login.css";

const Login = () => {
  const { authStore } = useRootContext();
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await authStore.login(formData);
      navigate("/");
    } catch (error) {
      toast.error("error");
      console.log(error);
    }
  };

  return (
    <form className="login_container" action="" onSubmit={handleSubmit}>
      <div className="login_form">
        <h1 className="login_title">LOGIN</h1>
        <div className="login_form_email">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="login_form_password">
          <label>Password:</label>
          <input
            type="password"
            value={formData.password}
            onChange={handleChange}
            name="password"
          />
        </div>
        <div className="buttons_reg_log">
          <div className="flex gap-10">
            <div className="register_form_submit">
              <button type="submit" className="login_form_submit">
                Submit
              </button>
            </div>
            <NavLink className={"nav_to_register"} to={"/auth/register"}>
              <button>Register</button>
            </NavLink>
          </div>
          <div className="flex justify-center">
            <NavLink className={"nav_to_home"} to={"/"}>
              <button>Home</button>
            </NavLink>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
