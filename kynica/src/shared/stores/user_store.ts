import { makeAutoObservable } from "mobx";
import ApiRequest from "../api/apiRequest";

class User {
  constructor() {
    makeAutoObservable(this);
  }

  *update_username(data:string) {
    try {
      const response = yield ApiRequest(
        "http://localhost:3003/change_username",
        "POST",
        data,
      );
    } catch (error) {
      console.log(error);
    }
  }

  *update_bio(data:string) {
    try {
      const response = yield ApiRequest(
        "http://localhost:3003/change_bio",
        "POST",
        data,
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default User;