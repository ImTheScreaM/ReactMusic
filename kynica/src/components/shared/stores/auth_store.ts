import {makeAutoObservable,toJS} from "mobx"
import ApiRequest from "../modals/apiRequest";

class AuthController {
  isAuth = false;
  isLoading = true;
  user = {
    name:null,
    email:null,
    loveMusic:null,
    profile: {
      bio:null
    }
  };

  constructor() {
    makeAutoObservable(this)
  }

  *register(formData) {
    const res = yield ApiRequest('http://localhost:3003/register', 'POST', formData);
    console.log(res)
  }

  *login(data) {
    try {
      const res = yield ApiRequest('http://localhost:3003/login', 'POST', data);
      this.user = res.user;

    } catch (error) {
      console.log(error)
    }
  }

  *logout() {
    try {
      const response = yield ApiRequest('http://localhost:3003/logout', 'POST');
    } catch (error) {
        console.log(error);
    }
  }

  *checkAuth() {
    try {
      const response = yield ApiRequest('http://localhost:3003/session', 'GET');
      if(response.auth) {
        this.isAuth = true;  
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.isLoading = false
    }
  }

}

export default new AuthController()