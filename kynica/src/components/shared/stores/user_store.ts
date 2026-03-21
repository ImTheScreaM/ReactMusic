import { makeAutoObservable } from "mobx";
import ApiRequest from "../modals/apiRequest";

class User {
  constructor() {
    makeAutoObservable(this);
  }

  *updateUsername(data) {
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

  *updateBio(data) {
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
