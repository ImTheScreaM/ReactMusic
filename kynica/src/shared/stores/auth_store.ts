import { flow, makeAutoObservable, runInAction } from "mobx";

import { authApi } from "../api/auth.api.ts";
import { IFormLogin, IFormRegister, IUser } from "../interface/intarface";
import { RootStore } from "./rootStore.ts";

export class AuthController {
  rootStore: RootStore;
  isAuth = false;
  isLoading = true;
  user:IUser|null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.checkAuth();
    this.setupListener();
  }

  setupListener() {
    window.addEventListener("auth:unauthorized", this.handleUnauthorized);
  }

  handleUnauthorized = () => {
    runInAction(() => {
      this.isAuth = false;
      this.user = null;
    });
  };

  dispose() {
    window.removeEventListener("auth:unauthorized", this.handleUnauthorized);
  }

  register = flow(function* (formData: IFormRegister) {
    try {
      const res = yield authApi.register(formData);
      return res;
    } catch (error) {
      console.log("Error auth", error);
    }
  });

  login = flow(function* (this: AuthController, data: IFormLogin) {
    try {
      const res = yield authApi.login(data);

      if (res.user) {
        this.user = res.user;
        this.isAuth = !!res.user;
      }
    } catch (error) {
      console.log("Error auth");
    }
  });

  logout = flow(function* (this: AuthController) {
    try {
      yield authApi.logout();

      this.user = null;
      this.isAuth = false;
    } catch (error) {
      console.log(error);
    }
  });

  checkAuth = flow(function* (this: AuthController) {
    try {
      const user = yield authApi.checkAuth()
      if (user.auth) {
        this.isAuth = !!user.user;
        this.user = user.user;
      } else {
        this.isAuth = !!user.user;
        this.user = null;
      }
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  });
}
