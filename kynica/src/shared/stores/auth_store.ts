import {makeAutoObservable, runInAction} from "mobx";

import {ApiRequest} from "../api/apiRequest";
import {IFormLogin, IFormRegister} from "../interface/intarface";


class AuthController {
  isAuth = false;
  isLoading = true;
  user = null;

  constructor() {
    makeAutoObservable(this);
    this.checkAuth();
  }

  *register(formData:IFormRegister) {
    console.log("register",formData)
    try {
      const res = yield ApiRequest(
          "http://localhost:3003/register",
          "POST",
          formData,
      );
    } catch (error) {
      console.log("Error auth")
    }
  }

  *login(data:IFormLogin) {
    console.log("login",data);
    try {
      const res = yield ApiRequest("http://localhost:3003/login", "POST", data);
      runInAction(() => {
        if (res.user) {
          this.user = res.user;
          this.isAuth = !!res.user
        }
      })
    } catch (error) {
      console.log("Error auth")
    }
  }

  *logout() {
    try {
      yield ApiRequest("http://localhost:3003/logout", "POST");
      runInAction(() => {
        this.user = null;
        this.isAuth = false;
      })
    } catch (error) {
      console.log(error);
    }
  }

  *checkAuth() {
    try {
      const res = yield ApiRequest("http://localhost:3003/session", "GET");
      console.log(res)
      if (res.auth) {
        runInAction(() => {
          this.isAuth = !!res.user
          this.user = res.user
        })
      } else {
        runInAction(() => {
          this.isAuth = !!res.user
          this.user = null;
        })
      }
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      })
    }
  }


}

export default new AuthController();
